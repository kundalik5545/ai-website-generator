"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  ArrowUp,
  Home,
  ImagePlus,
  Key,
  LayoutDashboard,
  User,
} from "lucide-react";
import { SignInButton } from "@clerk/nextjs";

function Hero() {
  const [userInput, setUserInput] = useState<string>();

  const Suggestions = [
    {
      label: "Dashboard",
      prompt:
        "Create an analytics dashboard to track customers and sales with charts and metrics",
      icon: LayoutDashboard,
    },
    {
      label: "SignUp Form",
      prompt: "Design a clean signup form with email, password, and validation",
      icon: Key,
    },
    {
      label: "Hero",
      prompt:
        "Build a modern hero section with compelling headline and call-to-action",
      icon: Home,
    },
    {
      label: "User Profile Card",
      prompt: "Create a user profile card with avatar, name, and social links",
      icon: User,
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      {/* Header & descriptions */}

      <h2 className="text-6xl font-bold">What should we design?</h2>
      <p className="text-xl mt-2 text-gray-500">
        Generate, edit and explore designs with AI, Export to code.
      </p>

      {/* Input box with prompts */}
      <div className="w-full max-w-xl p-5 mt-5 border rounded-2xl ">
        <textarea
          className="w-full h-24 focus:outline-none focus:ring-0 resize-none"
          placeholder="Describe your design idea..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />

        <div className="flex items-center justify-between">
          <Button variant="ghost">
            <ImagePlus />
          </Button>

          <SignInButton mode="modal" forceRedirectUrl={"/workplace"}>
            <Button disabled={!userInput}>
              <ArrowUp />
            </Button>
          </SignInButton>
        </div>
      </div>

      {/* Suggestions */}
      <div className="flex justify-between items-center gap-3 mt-2">
        {Suggestions.map((suggestion, index) => (
          <Button
            key={index}
            onClick={() => setUserInput(suggestion.prompt)}
            variant="outline"
          >
            <suggestion.icon />
            {suggestion.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default Hero;
