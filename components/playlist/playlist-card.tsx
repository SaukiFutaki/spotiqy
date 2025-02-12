"use client";

import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { typePlaylist } from "@/types/spotify";


interface PlaylistCardProps {
  data: typePlaylist;
}

export function PlaylistCard({ data }: PlaylistCardProps) {
  return (
    <Link
      href={`/playlist/${data.id}`}
      className={cn(
        "group relative flex flex-col gap-4 rounded-md bg-neutral-800/40 p-4 transition-colors hover:bg-neutral-800/80",
        data.className
      )}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-md">
        <Image
          src={data.images[0].url || "/placeholder.svg"}
          alt={data.name}
          className="object-cover transition-all group-hover:scale-105"
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
        />
        <div className="absolute bottom-2 right-2 translate-y-4 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.preventDefault();
              // Add your play functionality here
              console.log(`Play playlist ${data.id}`);
            }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-black shadow-xl hover:bg-green-400 hover:scale-105 transition-all"
          >
            <Play className="h-6 w-6 fill-current pl-1" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="line-clamp-1 text-base font-bold">{data.name}</h3>
        {data.description ? (
          <p className="line-clamp-2 text-sm text-neutral-400">
            {data.description}
          </p>
        ) : (
          <p className="text-sm text-neutral-400">{} songs</p>
        )}
      </div>
    </Link>
  );
}
