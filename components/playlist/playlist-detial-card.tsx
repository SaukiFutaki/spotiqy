"use client";
import { scp } from "@/constants/font";
import { TypePlaylistDetail } from "@/types/spotify";
import { calculateTotalDuration, formatDate, formatDuration } from "@/utils";
import { Clock, Edit2, MoreHorizontal, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface PlaylistDetailProps {
  data: TypePlaylistDetail;
  profileUserData: string;
}

export default function PlaylistDetail({
  data,
  profileUserData,
}: PlaylistDetailProps) {
  const router = useRouter();

  return (
    <div className={`${scp.className}`}>
      <div
        className="min-h-screen bg-gradient-to-b from-zinc-900 to-black border-green-500 border-dashed border-2"
        key={data.id}
      >
        {/* Header Section */}

        <div className="flex flex-col md:flex-row items-start gap-8 p-8 ">
          {/* Playlist Cover */}
          <div className="relative group w-48 h-48 flex-shrink-0">
            {data.images.length > 0 && (
              <Image
                src={data.images[0].url}
                alt={data.name}
                width={640}
                height={640}
                className="w-full h-full object-cover shadow-2xl"
              />
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <Edit2 className="w-7 h-7 text-white fill-white ml-1" />
              </button>
            </div>
          </div>

          {/* Playlist Info */}
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-5xl font-bold text-white">{data.name}</h1>
            </div>
            {data.description && (
              <p className="text-zinc-300">{data.description}</p>
            )}
            <div className="flex items-center gap-2 text-sm text-zinc-300">
              <Avatar>
                <AvatarImage
                  src={profileUserData}
                  alt={data.owner.display_name}
                />
                <AvatarFallback>
                  {data.owner.display_name[0] || data.owner.display_name[1]}
                </AvatarFallback>
              </Avatar>
              <Link
                href={`/intl-id/user/${data.owner.id}`}
                className="font-semibold text-white hover:underline transition-colors"
              >
                {data.owner.display_name}
              </Link>
              <span>•</span>
              <span>{data.followers.total} kali disimpan</span>
              <span>•</span>
              <span>
                {data.tracks.total} lagu,{" "}
                {calculateTotalDuration(data.tracks.items)}
              </span>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="px-8 py-4 flex items-center gap-6">
          <button className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center hover:scale-105 transition-transform">
            <Play className="w-7 h-7 text-white fill-white ml-1" />
          </button>
          <button className="text-zinc-400 hover:text-white transition-colors">
            <MoreHorizontal className="w-8 h-8" />
          </button>
        </div>

        {/* Tracks Section */}
        <div className="px-8 pb-8">
          {/* Header Track List */}
          <div className="grid grid-cols-[16px,4fr,3fr,2fr,minmax(120px,1fr)] gap-4 px-4 py-2 text-sm text-zinc-400 border-b border-[#1A7AB1]">
            <div>#</div>
            <div>Title</div>
            <div>Album</div>
            <div>Date added</div>
            <div className="flex justify-end">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Clock className="w-5 h-5" />
                  </TooltipTrigger>
                  <TooltipContent className="font-bold hover:text-white">
                    Duration
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* List Lagu */}

          <ScrollArea className="h-[500px] w-full ">
            <div className="mt-2 text-zinc-400  flex flex-col gap-y-2 ">
              {data.tracks.items.map((track, index) => (
                <div
                  key={track.track.id}
                  className="group relative grid grid-cols-[16px,4fr,3fr,2fr,minmax(120px,1fr)] gap-x-4 px-4 py-2 text-sm text-zinc-400 border items-center border-zinc-800 "
                >
                  {/* Sudut Putih untuk setiap track */}
                  <div className="absolute top-0 left-0 h-4 w-4 border-l-2 border-t-2 border-white"></div>
                  <div className="absolute top-0 right-0 h-4 w-4 border-r-2 border-t-2 border-white"></div>
                  <div className="absolute bottom-0 left-0 h-4 w-4 border-l-2 border-b-2 border-white"></div>
                  <div className="absolute bottom-0 right-0 h-4 w-4 border-r-2 border-b-2 border-white"></div>

                  {/* Isi Track */}
                  <div className="flex justify-center items-center relative">
                    <span className="group-hover:opacity-0 transition-opacity duration-300">
                      {index + 1}
                    </span>
                    <button
                      className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-green-500 hover:text-green-400"
                      onClick={() =>
                        console.log("Playing track:", track.track.name)
                      }
                    >
                      <Play className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex flex-row items-center gap-2">
                    <Image
                      src={track.track.album.images[2].url}
                      alt={track.track.album.name}
                      width={64}
                      height={64}
                      className="w-10 h-10 object-cover rounded-sm"
                    />
                    <div className="flex flex-col items-start">
                      <Link
                        href={`/intl-id/track/${track.track.id}`}
                        className=" transition-colors hover:underline ml-2 text-white line-clamp-1"
                      >
                        <span className="">{track.track.name}</span>
                      </Link>
                      <div className="flex flex-row gap-1 ml-2">
                        {track.track.artists.map((artist, index) => (
                          <Link
                            href={`/intl-id/artist/${artist.id}`}
                            key={artist.id}
                            className=" hover:text-white transition-colors hover:underline line-clamp-1"
                          >
                            {artist.name}
                            {index !== track.track.artists.length - 1
                              ? ", "
                              : ""}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <Link
                      href={`/intl-id/album/${track.track.album.id}`}
                      className="line-clamp-1 hover:underline hover:text-white transition-colors"
                    >
                      {track.track.album.name}
                    </Link>
                  </div>
                  <div>{formatDate(track.added_at)}</div>
                  <div className="flex justify-end text-center">
                    <p className="font-bold">
                      {formatDuration(track.track.duration_ms)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
