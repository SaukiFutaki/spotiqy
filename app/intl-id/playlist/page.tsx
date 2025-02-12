import { getSpotifyClient } from "@/lib/action";
import { PlaylistCard } from "@/components/playlist/playlist-card";
import { typePlaylist } from "@/types/spotify";
export default async function Page() {
  const spotify = await getSpotifyClient();
  const profile = await spotify.fetch("/me");
  const playlists :  { items: typePlaylist[] } = await spotify.fetch("/users/{user_id}/playlists", {
    user_id: profile.id,
  });
  console.log(playlists);
  return (
    <div className="px-10">
      <div>
        {playlists.items.map((playlist) => (
          <PlaylistCard key={playlist.id} data={playlist} />
        ))}
      </div>
    </div>
  );
}
