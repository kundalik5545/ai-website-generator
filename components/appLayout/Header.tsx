"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

function Header() {
  const { user } = useUser();
  const MenuOptions = [
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contact-us" },
  ];

  return (
    <div className="flex items-center justify-between border-b h-16 p-4 shadow">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image src="/logo.svg" alt="Logo" width={35} height={35} />
        <p className="font-bold text-xl">Ai Website Genrator</p>
      </div>

      {/* Main Menu */}
      <div className="flex gap-2">
        {MenuOptions.map((menu, index) => (
          <Button variant={"ghost"} key={index}>
            {menu.name}
          </Button>
        ))}
      </div>

      {/* Get Started */}
      <div className="">
        {!user ? (
          <SignInButton mode="modal" forceRedirectUrl={"/workplace"}>
            <Button variant="ghost">Get Started</Button>
          </SignInButton>
        ) : (
          <Link href={"/workspace"}>
            <Button variant="ghost">Get Started</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
