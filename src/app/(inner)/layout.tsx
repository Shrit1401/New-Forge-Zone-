import Footer from "@/components/global/Footer";
import Header from "@/components/global/Header";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className="flex flex-col min-h-screen">
      <Header active="projects" />
      <main className="flex-grow">{children}</main>
      <Footer />
    </main>
  );
};

export default Layout;
