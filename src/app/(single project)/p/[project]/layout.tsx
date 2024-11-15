import Header from "@/components/global/Header";
import { AppSidebar } from "@/components/project/Sidebaer/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

export default function ProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <main>
        <Header active="projects" />
        {children}
      </main>
    </SidebarProvider>
  );
}
