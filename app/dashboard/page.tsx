import { auth } from "@/auth";
import React from "react";
import { headers } from "next/headers";
import { getAccessToken, getSpotifyProfile } from "@/lib/action";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const q = await getAccessToken(session?.user.id ?? "");
  console.log(q);
  const d = await getSpotifyProfile(q.accessToken ?? "");
  console.log(d);



  return <div>Page</div>;
}
