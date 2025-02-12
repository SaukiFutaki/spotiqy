"use client";
import React from "react";
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";
import { client } from "@/lib/auth-client";

export default function LoginComponents() {
  const handleLogin = async (): Promise<void> => {
    const data = await client.signIn.social({
      provider: "spotify",
    });

    console.log(data);
  };
  return (
    <div>
      <InteractiveHoverButton onClick={handleLogin}>
        Login
      </InteractiveHoverButton>
    </div>
  );
}
