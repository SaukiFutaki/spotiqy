import { auth } from "@/auth";
import Navbar from "@/components/navbar";
import { getAccessToken } from "@/lib/action";
import { Session } from "better-auth";
import { headers } from "next/headers";
import React from "react";

export default async function IntlLaout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const authorizationToken = await getAccessToken(
    session?.session.userId ?? ""
  );
  console.log(authorizationToken);
  return (
    <div className="bg-[#111111] w-full h-full mt-4">
      <div>
        <div className="">
          <Navbar data={{
              profile: session?.user?.image as string,
              name: session?.user?.name as string,
          }} />
        </div>
        <section>{children}</section>
      </div>
    </div>
  );
}
