import ArtistContent from "@/components/artist/artist-component";
import ArtistDetail from "@/components/artist/artist-detail";
import { getSpotifyClient } from "@/lib/action";
import { TypeDetailArtist } from "@/types/artist";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

interface IPageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: IPageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();
  const client = await getSpotifyClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["artist", id],
      queryFn: async () =>
        client.fetch("/artists/{id}", { id }) as Promise<TypeDetailArtist>,
    }),
    queryClient.prefetchQuery({
      queryKey: ["artistAlbums", id],
      queryFn: async () => client.fetch("/artists/{id}/albums", { id }),
    }),
    queryClient.prefetchQuery({
      queryKey: ["artistTopTracks", id],
      queryFn: async () => client.fetch("/artists/{id}/top-tracks", { id }),
    }),
  ]);
  // const [artistData, artistAlbums, artistTopTracks] =
  //   await Promise.all([
  //     client.fetch("/artists/{id}", {
  //       id: id,
  //     }) as Promise<TypeDetailArtist>,
  //     client.fetch("/artists/{id}/albums", {
  //       id: id,
  //     }),
  //     client.fetch("/artists/{id}/top-tracks", {
  //       id: id,
  //     }),
  //   ]);

  return (
    <div className="text-white">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ArtistContent id={id} />
      </HydrationBoundary>
    </div>
  );
}
