"use client";
import { AppSidebar } from "@/components/project/Sidebaer/app-sidebar";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";
import React from "react";

import { useParams } from "next/navigation";
import { getProject } from "@/db/project";

const SingleProjectPage = () => {
  const { project } = useParams();
  const [currentStep, setCurrentStep] = React.useState<any>();

  React.useEffect(() => {
    const getSteps = async () => {
      const data = await getProject(project as string);
      if (!data) return;
      setCurrentStep(data.projectsteps);
    };
    getSteps();
  }, []);

  const twitterText = encodeURIComponent(
    "I've taken the oath to become a web dev legend w/ @Shrit1401 🚀\n\nThe plan is to:\n✍️ launch an NFT collection\n🦀 write a custom staking program in Rust\n💰 build a web app for user interaction\n🚀 deploy it on Solana\n\nTime to surf some glass 🏄"
  );
  const twitterUrl = `https://twitter.com/intent/tweet?text=${twitterText}`;
  return (
    <div className="flex">
      <div className="flex-none w-64">
        {currentStep && (
          <AppSidebar steps={currentStep} projectSlug={project as string} />
        )}
      </div>
      <div className="px-3 flex-col flex gap-5">
        <div className="w-full flex flex-col gap-3 max-w-2xl p-4 border rounded-2xl">
          <div className="flex gap-2 items-center ">
            <X size={24} radius="10" />
            <h3 className="manrope text-xl font-bold">Take The oath</h3>
          </div>
          <p className="text-[0.95rem] text-gray-500">
            Building in public is one of the most most effective ways to grow as
            a builder. Let the world know what you're shipping rn!
          </p>
          <Link href={twitterUrl} target="_blank">
            <Button
              className="w-full
              text-[1rem] font-semibold
            "
            >
              Share on Twitter 🚀
            </Button>
          </Link>
        </div>

        <div className="w-full flex justify-between gap-3 max-w-2xl p-4 border rounded-2xl">
          <div className="flex gap-2 items-center ">
            <X size={24} radius="10" />

            <p className="text-[0.95rem] text-gray-500">
              Discord connected - shrit1401
            </p>
          </div>
          <span className="underline text-[#7E7E7E] cursor-pointer">
            Relink
          </span>
        </div>
      </div>
    </div>
  );
};

export default SingleProjectPage;
