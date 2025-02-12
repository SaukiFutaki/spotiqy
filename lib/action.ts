"use server";
import { eq } from "drizzle-orm";
import { db } from "./db/db";
import { account } from "./db/schema";
import { auth } from "@/auth";
import { headers } from "next/headers";

export async function getAccessToken(userId: string) {
  const userAccount = await db
    .select({
      accessToken: account.accessToken,
    })
    .from(account)
    .where(eq(account.userId, userId))
    .limit(1);

  return userAccount[0];
}

export async function getSpotifyClient() {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
  
    const authToken = await getAccessToken(session?.session.userId ?? "");
  
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
            Authorization: `Bearer ${authToken?.accessToken}`,
          },
          cache: "no-store",
        });
        return res.json();
      },
    };
  }


  export async function getId () {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
  
    return session?.session.userId;
  }