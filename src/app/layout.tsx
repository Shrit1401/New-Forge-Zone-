import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Forge Zone",
  description: "forge zone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster
          toastOptions={{
            style: {
              backdropFilter: "blur(10px)",
              fontFamily: "Manrope",
              background: "rgba(0,0,0,.75)",
              color: "#fff",
              borderRadius: "100px",
            },
          }}
        />
      </body>
    </html>
  );
}
