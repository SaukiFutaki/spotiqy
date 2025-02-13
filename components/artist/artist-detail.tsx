"use client";
import { scp } from "@/constants/font";
import { Play, MoreHorizontal, Clock, Check } from "lucide-react";
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
import { TypeDetailArtist } from "@/types/artist";



interface ArtistDetailProps {
  data: TypeDetailArtist;
}

export default function ArtistDetail({ data }: ArtistDetailProps) {
  const router = useRouter();

  return (
    <div className={`${scp.className}`}>
    <div className="relative min-h-screen bg-gradient-to-b from-blue-900 to-black">
      {/* Hero Section with Background */}
      <div className="relative h-[400px] w-full">
        {data.images.length > 0 && (
          <>
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0">
              <Image
                src={data.images[0].url}
                alt={data.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
            </div>
          </>
        )}
        
        {/* Artist Info Overlay */}
        <div className="absolute bottom-0 left-0 p-8 w-full">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-blue-500 p-1 rounded">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-white text-sm">Artis Terverifikasi</span>
            </div>
            <h1 className="text-7xl font-bold text-white">
              {data.name}
            </h1>
            <p className="text-white text-lg">
              {data.followers.total.toLocaleString()} pendengar bulanan
            </p>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="px-8 py-6 flex items-center gap-4">
        <button className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center hover:scale-105 transition-transform">
          <Play className="w-7 h-7 text-white fill-white ml-1" />
        </button>
        <Button
          variant="outline"
          className="border-[0.5px] border-white/30 text-white hover:border-white"
        >
          Mengikuti
        </Button>
        <button className="text-zinc-400 hover:text-white transition-colors">
          <MoreHorizontal className="w-8 h-8" />
        </button>
      </div>

      {/* Popular Section */}
      <div className="px-8 pb-8">
        <h2 className="text-2xl font-bold text-white mb-6">Populer</h2>
        <div className="flex flex-col gap-3">
          {/* Example Popular Tracks - You'll need to update this with actual data */}
          {[
            { id: 1, name: "Super Shy", plays: "682.354.811", duration: "2:34" },
            { id: 2, name: "Ditto", plays: "727.637.009", duration: "3:05" },
            { id: 3, name: "OMG", plays: "783.036.331", duration: "3:32" },
          ].map((track, index) => (
            <div
              key={track.id}
              className="group grid grid-cols-[auto,1fr,auto,auto] gap-4 items-center px-4 py-2 rounded-md hover:bg-white/10 transition-colors"
            >
              <div className="w-6 text-center text-base text-zinc-400">
                {index + 1}
              </div>
              <div className="flex flex-col">
                <span className="text-white font-medium">{track.name}</span>
                <span className="text-sm text-zinc-400">{track.plays} plays</span>
              </div>
              <div className="text-zinc-400 text-sm">
                {track.duration}
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="w-5 h-5 text-zinc-400" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
}