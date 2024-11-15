import Header from "@/components/global/Header";
import React from "react";
import Image from "next/image";
import loginImage from "@/../public/loginBgimage.png";
import GettingStartedForm from "@/components/authentication/GettingStartedForm";

const LoginPage = () => {
  return (
    <main className="relative min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>

      <div className="flex">
        <div className="w-full min-h-screen overflow-y-auto">
          <GettingStartedForm />
        </div>

        <div className="w-1/2 fixed right-0 h-screen">
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
