import db from "@/config/db";
import { chatTable, frameTable, projectsTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { projectId, frameId, messages } = await req.json();

  //   Authenticate user
  const user = await currentUser();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  //   Create project
  const projectResult = await db.insert(projectsTable).values({
    projectId: projectId,
    createdBy: user?.primaryEmailAddress?.emailAddress || "unknown",
  });

  // Create Frame
  const frameResult = await db.insert(frameTable).values({
    frameId: frameId,
    projectId: projectId,
  });

  // Create Messages
  const chatResult = await db.insert(chatTable).values({
    chatMessage: messages,
    createdBy: user?.primaryEmailAddress?.emailAddress,
  });

  return NextResponse.json({
    projectId,
    frameId,
    messages,
  });
}
