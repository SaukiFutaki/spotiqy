import { getSpotifyClient } from "@/lib/action";
import { PlaylistCard } from "@/components/playlist/playlist-card";
import { TypePlaylist } from "@/types/playlist";
import { scp } from "@/constants/font";
export default async function Page() {
  const spotify = await getSpotifyClient();
  const playlist: { items: TypePlaylist[] } = await spotify.fetch(
    "/me/playlists"
  );

  //   const playlists: { items: typePlaylist[] } = await spotify.fetch(
  //     "/users/{user_id}/playlists",
  //     {
  //       user_id: profile.id,
  //     }
  //   );
  //   console.log(playlists.items[0].owner.display_name);
  return (
    <div className={`px-8 py-6 ${scp.className}`}>
      <div className="flex items-center space-x-2">
        <div className="border-l-2 border-green-500 h-6"></div>
        <h1 className="text-xl font-semibold text-white">Your Playlists</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {playlist.items.map((playlist) => (
          <PlaylistCard key={playlist.id} data={playlist} />
        ))}
      </div>
    </div>
  );
}
