import Header from "@/components/global/Header";
import React from "react";
import Image from "next/image";
import loginImage from "@/../public/loginBgimage.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  return (
    <main className="relative min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>

      <div className="flex h-screen">
        <div className="w-1/2 flex flex-col justify-start px-12 mt-16">
          <h1 className="text-5xl manrope font-bold mt-8">You're In 🎉</h1>
          <p>
            Wooho you're now part of <b>Forge Zone Club</b> click below to start
            your journey
          </p>
          <Link href="/projects">
            <Button
              size="lg"
              variant="shine"
              className="mt-8 font-bold manrope text-xl py-6"
            >
              Start Exploring
            </Button>
          </Link>
        </div>

        <div className="w-1/2 relative">
          <Image
            src={loginImage}
            alt="Login Background"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
