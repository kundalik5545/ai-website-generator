"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { UserDetailContext } from "@/context/UserDetailContext";
import { UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";

export function AppSidebar() {
  const [projectList, setProjectList] = useState([]);
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  return (
    <Sidebar>
      <SidebarHeader className="p-2 mt-2">
        <div className="flex items-center gap-2">
          <Image src={"/logo.svg"} width={35} height={35} alt="logo" />
          <h2 className="text-lg font-bold">Ai Website Generator</h2>
        </div>
        <Link href={"/workspace"} className="mt-5 w-full">
          <Button className="w-full">+ New Project</Button>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          {projectList.length == 0 && (
            <h2 className="text-sm px-2 text-gray-500">No Projects Found.</h2>
          )}
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className="p-2">
        <div className="flex flex-col space-y-4 shadow-sm bg-gray-100 rounded-xl p-3 mb-2">
          {/* Credits Section */}
          <div className="flex items-center justify-between">
            <h3>Remaining Credits</h3>
            <h3 className="font-bold">{userDetails?.credits || 0}/5</h3>
          </div>

          {/* Progress Bar  */}
          <Progress value={33} />

          {/* Upgrade Button */}
          <Button className="w-full">Upgrade for Unlimited</Button>
        </div>

        <div className="flex items-center gap-2 py-3 border-t">
          <UserButton /> <h3>Profile</h3>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
