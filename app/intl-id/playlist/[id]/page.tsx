import { getSpotifyClient } from "@/lib/action";
import React from "react";

interface IPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: IPageProps) {
  const { id } = await params;
  const c = await getSpotifyClient();
  const data = await c.fetch("/playlists/{id}", {
    id,
  });
  console.log(data);
  return (
    <div>
      <div className="text-white">{JSON.stringify(data)}</div>
    </div>
  );
}
