import db from "@/config/db";
import { chatTable, frameTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log("🚀 Running get request");

  const { searchParams } = new URL(req.url);
  const frameId = searchParams.get("frameId");
  const projectId = searchParams.get("projectId");

  console.log("Project ID", projectId);

  const frameResult = await db
    .select()
    .from(frameTable)
    // @ts-expect-error - Drizzle ORM type inference issue
    .where(eq(frameTable.frameId, frameId));

  const chatResult = await db
    .select()
    .from(chatTable)
    // @ts-expect-error - Drizzle ORM type inference issue
    .where(eq(chatTable.frameId, frameId));

  console.log("Frame Table", frameResult);
  console.log("Chat Table", chatResult);

  const finalResults = {
    ...frameResult[0],
    chatMessages: chatResult[0].chatMessage,
  };

  console.log("Final Result is", finalResults);
  return NextResponse.json(finalResults);
}
