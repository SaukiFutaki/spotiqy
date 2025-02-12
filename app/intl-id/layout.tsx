import { auth } from "@/auth";
import Navbar from "@/components/navbar";
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

  return (
    // <AuthProvider accessToken={authorizationToken?.accessToken ?? ""}>
      <div className={`bg-[#111111] w-full h-full mt-4 `}>
        <div>
          <div className="mb-20">
            <Navbar
              data={{
                profile: session?.user?.image as string,
                name: session?.user?.name as string,
              }}
            />
          </div>
          <section className="px-[150px]">{children}</section>
        </div>
      </div>
    // </AuthProvider>
  );
}
