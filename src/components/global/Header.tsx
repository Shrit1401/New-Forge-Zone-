"use client";
import React, { useEffect, useState } from "react";
import pfp from "../../../public/pfp.png";
import logo from "../../../public/logo.png";
import Image from "next/image";
import { MoveRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
type HeaderProps = {
  dark?: boolean;
  active?: string;
  glass?: boolean;
};

const Header: React.FC<HeaderProps> = ({ dark, glass }) => {
  const [user, loading] = useAuthState(auth);
  const [isLogged, setIsLogged] = useState(false);
  const links = {
    projects: "/projects",
    discover: "/discover",
    work: "/work",
  };

  useEffect(() => {
    if (user) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [user]);

  return (
    <header
      className={`flex justify-between items-center px-4 md:px-8 lg:px-16 xl:px-24 py-6
    ${dark ? "text-white" : "text-black"}
    ${
      glass
        ? "bg-white bg-opacity-40 backdrop-filter backdrop-blur-lg"
        : "bg-transparent"
    }
    `}
    >
      <div className="flex items-center">
        <a href="/" aria-label="Home">
          <Image
            src={logo}
            alt="Company Logo"
            className={`cursor-pointer ${!dark ? "filter invert" : ""}`}
            width={150}
            height={150}
          />
        </a>
        <nav
          className="hidden md:flex space-x-4 ml-8"
          aria-label="Main Navigation"
        >
          {Object.keys(links).map((key) => (
            <a
              key={key}
              href={links[key as keyof typeof links]}
              className="hover:underline text-[1rem]"
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </a>
          ))}
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        {loading ? (
          <span className="text-base manrope">Loading...</span>
        ) : isLogged ? (
          <a
            href="/profile"
            className="flex cursor-pointer items-center hover:opacity-75 space-x-2 ease-in-out duration-500"
            aria-label="Profile"
          >
            <Image
              src={user?.photoURL || pfp}
              alt="Profile Picture"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="capitalize manrope font-bold text-xl">
              {user?.displayName?.split(" ")[0] || "Profile"}
            </span>
          </a>
        ) : (
          <Link href="/signup">
            <Button
              variant="linkHover2"
              size="lg"
              className="dark font-bold text-base manrope"
              aria-label="Get Started"
            >
              Get Started
              <MoveRight size={24} className="ml-2" />
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
