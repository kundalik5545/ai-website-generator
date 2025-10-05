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
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export function AppSidebar() {
  const [projectList, setProjectList] = useState([]);
  const { userDetails, setUserDetails } = useContext(UserDetailContext);

  const GetProjectList = async () => {
    const result = await axios.get("/api/get-all-projects");
    console.log(result.data);
    setProjectList(result.data);
  };

  useEffect(() => {
    GetProjectList();
  }, []);
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
          <div className="">
            {projectList.map((project: any) => (
              <Link
                href={`/playground/${project.projectId}?frameId=${project.frameId}`}
                key={project.projectId}
                className="block my-2 p-2 rounded-lg transition-colors duration-200 hover:bg-gray-200"
              >
                <h2 className="line-clamp-1 text-sm px-2 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                  {project?.chats?.[0]?.chatMessage?.[0]?.content}
                </h2>
              </Link>
            ))}
          </div>
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
