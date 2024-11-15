import Header from "@/components/global/Header";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import React from "react";

const LandingPage = () => {
  return (
    <main
      style={{
        backgroundImage: "url('/landing.png')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        height: "100vh",
        width: "100%",
      }}
      className="bg-cover bg-center bg-fixed overflow-hidden bg-gray-900 text-white"
    >
      <Header dark />
      <section className="flex flex-col items-center justify-center h-[90vh] text-center px-4 md:px-8">
        <div className="text-4xl md:text-7xl font-bold mb-4 w-full md:w-[40%]">
          Home to the{" "}
          <span className="ebgaramond italic text-4xl md:text-7xl">
            world’s best
          </span>{" "}
          web builders.
        </div>
        <p className="text-lg md:text-xl w-full md:w-[50%] opacity-75">
          forge zone, accelerates your builder journey into website development!
          Whether you're a newbie in the coding world, a seasoned pro, or just
          dreaming of creating something awesome, you've found your cozy spot
          with us.
        </p>
        <div className="flex flex-col md:flex-row mt-8 gap-5">
          <Button
            variant="expandIcon"
            Icon={ArrowRightIcon}
            iconPlacement="right"
            size="lg"
            className="dark font-bold text-xl manrope py-6 shadow-none"
          >
            Get Started
          </Button>
          <Button
            variant="linkHover1"
            size="lg"
            className="dark font-bold text-xl manrope"
          >
            Join Discord
          </Button>
        </div>
        <p className="manrope font-bold  mt-4">
          Oh did we mention? It's all free!
        </p>
      </section>
    </main>
  );
};

export default LandingPage;
