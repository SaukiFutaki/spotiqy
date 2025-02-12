"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { scp } from "@/constants/font";
import { client } from "@/lib/auth-client";
import { typeNavbar } from "@/types";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Spotify from "./svg/spotify";

interface INavbar {
  profile: string;
  name: string;
}

interface NavbarProps {
  data: INavbar;
}

const links: typeNavbar[] = [
  {
    name: "Search",
    href: "/intl-id/search",
  },
  {
    name: "Library",
    href: "/intl-id/library",
  },
  {
    name: "Playlist",
    href: "/intl-id/playlist",
  },
  {
    name: "Top Tracks",
    href: "/intl-id/top-tracks",
  },
  {
    name: "Top Artists",
    href: "/intl-id/top-artists",
  },
  {
    name: "Recently Played",
    href: "/intl-id/recently-played",
  },
];

export default function Navbar({ data }: NavbarProps) {
  const router = useRouter();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const headerHeight = useTransform(scrollY, [0, 100], ["96px", "72px"]);
  const scale = useTransform(scrollY, [0, 100], [1, 0.9]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async (): Promise<void> => {
    await client.signOut();
    router.refresh();
  };

  return (
    <motion.header
      style={{ height: headerHeight }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/70 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <motion.div
        style={{ scale }}
        className={`text-white w-full h-full py-4 px-36 flex items-center justify-between container ${scp.className}`}
      >
        <div className="flex items-center justify-between gap-4">
          <Link href={"/intl-id"}>
            <Spotify className="w-8 h-8" />
          </Link>
          <nav className="hidden md:flex space-x-4 md:items-center">
            {links.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:text-gray-300 transition pr-4 relative hover:underline"
              >
                {link.name}
                {index !== links.length - 1 && (
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-[70%] bg-gray-700"></span>
                )}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
              <Avatar>
                <AvatarImage src={data.profile} />
                <AvatarFallback>{data.name[0]}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem onClick={handleLogout}>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>
    </motion.header>
  );
}
