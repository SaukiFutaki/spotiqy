import { auth } from "@/auth";
import LoginComponents from "@/components/login-components";
import Spotify from "@/components/svg/spotify";

import { Source_Code_Pro } from "next/font/google";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
const scp = Source_Code_Pro({
  subsets: ["latin"],
  weight: "400",
});
export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/intl-id");
  }
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen gap-2 bg-black text-white ${scp.className}`}
    >
      <Spotify className="w-20 h-20 mb-6 items-center  " />
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Login with Spotify</h1>
        <LoginComponents />
      </div>
    </div>
  );
}
