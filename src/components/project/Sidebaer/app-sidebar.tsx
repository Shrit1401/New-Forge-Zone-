import { Check, X } from "lucide-react";
import logo from "../../../../public/logo.png";
import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { StepSection } from "@/lib/types/project.types";

interface SideBarProps {
  steps: StepSection[];
  projectSlug: string;
}

export const AppSidebar: React.FC<SideBarProps> = ({ steps, projectSlug }) => {
  return (
    <Sidebar className="z-[10] ">
      <SidebarContent className="">
        <SidebarGroup className="flex items-center justify-center mt-3">
          <a
            href={`
          /p/${projectSlug}
            `}
            aria-label="Home"
          >
            <Image
              src={logo}
              alt="Company Logo"
              className={`cursor-pointer filter invert`}
              width={150}
              height={150}
            />
          </a>
        </SidebarGroup>
        {/* Step navigation */}
        {steps.map((stepSection, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupLabel className="text-[1rem]">
              {stepSection.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {stepSection.items.map((item) => (
                  <SidebarMenuItem key={item.slug}>
                    <SidebarMenuButton asChild>
                      <a
                        href={`/p/${projectSlug}/${item.slug}?subheading=${index}`}
                      >
                        {item.completed ? (
                          <span className="text-gray-500">
                            <Check size={24} radius="10" />
                          </span>
                        ) : (
                          <span className="text-red-400">
                            <X size={24} radius="10" />
                          </span>
                        )}
                        <span>{item.text}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Sidebar footer */}
      <SidebarFooter>
        <div className="p-4 bg-blue-100 rounded-lg flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-4 border-blue-500 flex items-center justify-center">
            🏆
          </div>
          <div>
            <p className="font-bold manrope text-gray-800">
              100% Completed. You made it!
            </p>
            <p className="text-sm text-gray-600">
              You're one of our top builders.
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
