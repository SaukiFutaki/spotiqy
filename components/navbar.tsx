"use client";
import React from "react";
import { client } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import Spotify from "./svg/spotify";
import { scp } from "@/constants/font";
import { typeNavbar } from "@/types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    name: "Playlists",
    href: "/intl-id/playlists",
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
  const handleLogout = async (): Promise<void> => {
    await client.signOut();
  };

  return (
    <header
      className={`text-white w-full py-4 px-36 flex items-center justify-between container ${scp.className}`}
    >
      <div className="flex items-center justify-between gap-4">
        <Link href={"/intl-id"}>
          <Spotify className="w-8 h-8" />
        </Link>
        <nav className="hidden md:flex space-x-4">
          {links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white hover:text-gray-300 transition pr-4 relative"
            >
              {link.name}
              {index !== links.length - 1 && (
                <span className="absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-[70%] bg-gray-700"></span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Authentication Buttons */}
      <div className="flex items-center ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <Avatar>
              <AvatarImage src={data.profile} />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Billing
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Keyboard shortcuts
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Email</DropdownMenuItem>
                    <DropdownMenuItem>Message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>
                New Team
                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>GitHub</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuItem disabled>API</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
