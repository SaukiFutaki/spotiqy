"use server";
import { eq } from "drizzle-orm";
import { db } from "./db/db";
import { account } from "./db/schema";
import { auth } from "@/auth";
import { headers } from "next/headers";

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

// Get both access token and refresh token
export async function getTokens(userId: string) {
  const userAccount = await db
    .select({
      accessToken: account.accessToken,
      refreshToken: account.refreshToken,
      expiresAt: account.accessTokenExpiresAt,
    })
    .from(account)
    .where(eq(account.userId, userId))
    .limit(1);

  return userAccount[0];
}

// Update tokens in the database
async function updateTokens(userId: string, accessToken: string, expiresAt: Date) {
  await db
    .update(account)
    .set({
      accessToken,
      accessTokenExpiresAt: expiresAt,
    })
    .where(eq(account.userId, userId));
}

// Refresh the access token using refresh token
async function refreshAccessToken(refreshToken: string): Promise<SpotifyTokenResponse> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }

  return response.json();
}

export async function getSpotifyClient() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session.userId) {
    throw new Error("No session found");
  }

  const tokens = await getTokens(session.session.userId);
  if (!tokens) {
    throw new Error("No tokens found");
  }

  // Check if token is expired or will expire soon (within 5 minutes)
  const isExpired = tokens.expiresAt && new Date(tokens.expiresAt) <= new Date(Date.now() + 5 * 60 * 1000);

  // If token is expired, refresh it
  if (isExpired && tokens.refreshToken) {
    try {
      const newTokens = await refreshAccessToken(tokens.refreshToken);
      
      // Calculate new expiration time
      const expiresAt = new Date(Date.now() + newTokens.expires_in * 1000);
      
      // Update tokens in database
      await updateTokens(
        session.session.userId,
        newTokens.access_token,
        expiresAt
      );

      // Update current tokens
      tokens.accessToken = newTokens.access_token;
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw new Error("Failed to refresh access token");
    }
  }

  return {
    async fetch(endpoint: string, params?: Record<string, string>) {
      let url = `https://api.spotify.com/v1${endpoint}`;
      
      // Replace URL parameters
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          url = url.replace(`{${key}}`, value);
        });
      }

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
        cache: "no-store",
      });

      if (res.status === 401) {
        // Token might have expired during the request, try refreshing once
        if (tokens.refreshToken) {
          const newTokens = await refreshAccessToken(tokens.refreshToken);
          const expiresAt = new Date(Date.now() + newTokens.expires_in * 1000);
          await updateTokens(session.session.userId, newTokens.access_token, expiresAt);

          // Retry the request with new token
          const retryRes = await fetch(url, {
            headers: {
              Authorization: `Bearer ${newTokens.access_token}`,
            },
            cache: "no-store",
          });
          return retryRes.json();
        }
      }

      return res.json();
    },
  };
}