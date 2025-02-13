import PlaylistDetail from "@/components/playlist/playlist-detial-card";
import { scp } from "@/constants/font";
import { getSpotifyClient } from "@/lib/action";
import { TypePlaylistDetail } from "@/types/spotify";
import React from "react";

interface IPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: IPageProps) {
  const { id } = await params;
  const c = await getSpotifyClient();
  const data: TypePlaylistDetail = await c.fetch("/playlists/{id}", {
    id,
  });
  const profileUserData = await c.fetch("/users/{user_id}", {
    user_id: data.owner.id,
  });
  console.log(profileUserData);
 console.log(data);
  return (
    <div className={`px-8 py-6 ${scp.className}`}>
      <div className="flex items-center space-x-2">
        <div className="border-l-2 border-green-500 h-6"></div>
        <h1 className="text-xl font-semibold text-white">{data.name}</h1>
      </div>
      <div className=" mt-4">
        <PlaylistDetail data={data}  profileUserData={profileUserData.images[1].url}/>
      </div>
    </div>
  );
}
