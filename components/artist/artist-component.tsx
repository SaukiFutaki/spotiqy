// artist-content.tsx
'use client';

import { useQueries } from "@tanstack/react-query";
import { getSpotifyClient } from "@/lib/action";
import { TypeDetailArtist } from "@/types/artist";
import ArtistDetail from "@/components/artist/artist-detail";

interface ArtistContentProps {
  id: string;
}

export default function ArtistContent({ id }: ArtistContentProps) {
  const queries = useQueries({
    queries: [
      {
        queryKey: ['artist', id],
        queryFn: async () => {
          const client = await getSpotifyClient();
          return client.fetch("/artists/{id}", { id }) as Promise<TypeDetailArtist>;
        }
      },
      {
        queryKey: ['artistAlbums', id],
        queryFn: async () => {
          const client = await getSpotifyClient();
          return client.fetch("/artists/{id}/albums", { id });
        }
      },
      {
        queryKey: ['artistTopTracks', id],
        queryFn: async () => {
          const client = await getSpotifyClient();
          return client.fetch("/artists/{id}/top-tracks", { id });
        }
      },
    ],
  });

  const [artistQuery, albumsQuery, topTracksQuery] = queries;

  if (queries.some(query => query.isLoading)) {
    return <div className="text-white">Loading...</div>;
  }

  if (queries.some(query => query.isError)) {
    return <div className="text-white">Error loading data</div>;
  }

  return (
    <div className="text-white">
      <div>
        {artistQuery.data && <ArtistDetail data={artistQuery.data} />}
      </div>
      <div>{JSON.stringify(albumsQuery.data)}</div>
      <div>{JSON.stringify(topTracksQuery.data)}</div>
    </div>
  );
}