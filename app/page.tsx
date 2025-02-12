"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Source_Code_Pro } from "next/font/google";
const scp = Source_Code_Pro({
  subsets: ["latin"],


})
export default function Home() {

  const handleClik = async() => {
    const data = await authClient.signIn.social({
      provider: "spotify"
    })

    console.log(data)
  }

  return (
    <div>
      <Button
        onClick={handleClik}
        variant="default"
        className={`${scp.className} text-lg`}
      >
        Sign in with Spotify
      </Button>
    </div>
  );
}
