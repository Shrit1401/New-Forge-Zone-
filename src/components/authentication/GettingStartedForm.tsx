"use client";
import React, { useState } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { signUpWithEmailAndPassword, signinwithOath } from "@/db/auth";

const GettingStartedForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    signUpWithEmailAndPassword(email, password);
    setLoading(false);
  };

  return (
    <div className="w-1/2 flex flex-col justify-start px-12 mt-16">
      <h1 className="text-5xl manrope font-bold mt-8">Get Started</h1>
      <form onSubmit={handleSubmit} className="flex flex-col mt-5 space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="luffy@gmail.com"
            className="text-xl border-black"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="********"
            className="text-xl border-black"
          />
        </div>
        <Button
          type="submit"
          className="px-4 py-2 bg-black text-white font-bold manrope rounded-lg hover:opacity-70 transition-all duration-200 ease-in-out"
        >
          {loading ? "Loading..." : "Let's Go 🎉"}
        </Button>
        <a href="/login" className="text-center text-gray-500">
          Already have an account?
        </a>
      </form>

      {/* a line with or in between */}
      <div className="flex items-center mt-4">
        <hr className="w-1/2 border-gray-300" />
        <p className="mx-4 text-gray-400">or</p>
        <hr className="w-1/2 border-gray-300" />
      </div>

      <div className="flex flex-col mt-4 space-y-4">
        <button
          onClick={() => signinwithOath("google")}
          className="px-4 w-full py-3 flex items-center justify-center gap-2 border-2 border-black text-black font-bold manrope rounded-lg hover:bg-black hover:text-white transition-all duration-200 ease-in-out"
        >
          <FaGoogle size={23} className="inline" /> Sign up with Google
        </button>
        <button
          onClick={() => signinwithOath("github")}
          className="px-4 w-full py-3 flex items-center justify-center gap-2 border-2 border-black text-black font-bold manrope rounded-lg hover:bg-black hover:text-white transition-all duration-200 ease-in-out"
        >
          <FaGithub size={23} className="inline" /> Sign up with Github
        </button>
      </div>
    </div>
  );
};

export default GettingStartedForm;
