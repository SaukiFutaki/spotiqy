"use server"
import { eq } from "drizzle-orm";
import { db } from "./db/db";
import { account } from "./db/schema";

export async function getAccessToken(userId: string) {
    const userAccount = await db.select({
        accessToken: account.accessToken,
    })
    .from(account)
    .where(eq(account.userId, userId))
    .limit(1);

    return userAccount[0];
}

export async function getSpotifyProfile(accessToken: string) {
  const res = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.json();
}


export async function fetchSpotifyData(userId: string, endpoint: string) {
    const accessToken = await getAccessToken(userId);
    
    if (!accessToken) {
      throw new Error("Spotify access token is missing");
    }
  
    const response = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      cache: "no-store", 
    });
  

    console.log(response.json())
   
  }
  