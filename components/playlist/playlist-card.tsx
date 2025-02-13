"use client";

import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { TypePlaylist } from "@/types/spotify";

interface PlaylistCardProps {
  data: TypePlaylist;
}

export function PlaylistCard({ data }: PlaylistCardProps) {
  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    console.log("putar", data.id);
  };

  const imageLoader = ({ src, width, quality }) => {
    return `https://example.com/${src}?w=${width}&q=${quality || 75}`
  }
  return (
    <Link
      href={`/intl-id/playlist/${data.id}`}
      className={cn(
        "group relative block w-full overflow-hidden rounded-none bg-black/20",
        "hover:bg-black/40 transition-all duration-300",
        "border border-zinc-800 hover:border-zinc-700",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-zinc-800/20 before:to-transparent before:opacity-0 before:transition-opacity",
        "hover:before:opacity-100"
      )}
    >
      <div className="absolute top-0 left-0 h-4 w-4 border-l-2 border-t-2 border-white"></div>
      <div className="absolute top-0 right-0 h-4 w-4 border-r-2 border-t-2 border-white"></div>
      <div className="absolute bottom-0 left-0 h-4 w-4 border-l-2 border-b-2 border-white"></div>
      <div className="absolute bottom-0 right-0 h-4 w-4 border-r-2 border-b-2 border-white"></div>
      <div className="relative aspect-auto w-full">
        {/* Angled Border Decorations */}

        {/* Content Container */}
        <div className="h-full w-full p-4">
          {/* Image and Play Button Container */}
          <div className="relative h-full w-full aspect-square">
            {data.images?.[0] && (
              <div className="relative h-full w-full overflow-hidden rounded-none">
                <Image
                  src={data.images[0].url}
                  alt={data.name}
                    loading="lazy"
                    // loader={imageLoader}
                  width={640}
                  height={640}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
                  <button
                    onClick={handlePlayClick}
                    className="translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 focus:outline-none"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black shadow-lg transition-transform duration-200 hover:scale-110 hover:bg-black/60">
                      <Play className="h-6 w-6 fill-white text-white" />
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Text Content */}
          <div className="mt-4 space-y-2">
            <h3 className="text-lg font-semibold text-white truncate">
              {data.name}
            </h3>
            {data.description === "" ? (
                <p className="text-sm text-destructive">No description available</p>
            ) : (
              <p className="text-sm text-zinc-400 line-clamp-1">
                {data.description}
              </p>
            )}
            {data.owner && (
              <p className="text-xs text-zinc-500">
                By {data.owner.display_name}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
{
  /* <Link
href={`/intl-id/playlist/${data.id}`}
className={cn(
  "group relative flex flex-col gap-4 bg-secondary p-4 transition-all hover:bg-neutral-900",
  data.className
)}
>
<div className="relative aspect-square w-full overflow-hidden">
  <Image
    src={data.images[0].url || "/placeholder.svg"}
    alt={data.name}
    className="object-cover transition-transform duration-300 group-hover:scale-105"
    fill
    sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
  />
  <div className="absolute bottom-2 right-2 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
    <button
      onClick={(e) => {
        e.preventDefault();
        console.log(`Play playlist ${data.id}`);
      }}
      className="flex h-12 w-12 items-center justify-center bg-green-500 text-black shadow-lg hover:bg-green-400 hover:scale-110 transition-all"
    >
      <Play className="h-6 w-6 fill-current pl-1" />
    </button>
  </div>
</div>
<div className="flex flex-col gap-1">
  <h3 className="line-clamp-1 text-base font-bold text-white">
    {data.name}
  </h3>
  {data.description ? (
    <p className="line-clamp-2 text-sm text-neutral-400">
      {data.description}
    </p>
  ) : (
    <p className="text-sm text-neutral-500">No description available</p>
  )}
</div>
</Link> */
}
