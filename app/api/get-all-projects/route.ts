import db from "@/config/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import { desc, eq, inArray } from "drizzle-orm";
import { chatTable, frameTable, projectsTable } from "@/config/schema";

export async function GET(req: NextRequest) {
  const user = await currentUser();

  if (!user?.primaryEmailAddress?.emailAddress) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get the projects
  const projects = await db
    .select()
    .from(projectsTable)
    .where(eq(projectsTable.createdBy, user.primaryEmailAddress.emailAddress))
    .orderBy(desc(projectsTable.id));

  const results: {
    projectId: string;
    frameId: string;
    chats: {
      id: number;
      createdOn: Date;
      chatMessage: any;
      createdBy: string;
    }[];
  }[] = [];

  for (const project of projects) {
    const frames = await db
      .select({ frameId: frameTable.frameId })
      .from(frameTable)
      //@ts-expect-error
      .where(eq(frameTable.projectId, project.projectId));

    // Fetch chats for all frames in this project in one query
    const frameIds = frames.map((f: any) => f.frameId);
    let chats: any[] = [];

    if (frameIds.length > 0) {
      chats = await db
        .select()
        .from(chatTable)
        .where(inArray(chatTable.frameId, frameIds));
    }

    // Combine: attach chats to each frame
    for (const frame of frames) {
      results.push({
        projectId: project.projectId ?? "",
        frameId: frame.frameId ?? "",
        chats: chats.filter((c) => c.frameId === frame.frameId),
      });
    }
  }

  return NextResponse.json(results);
}
