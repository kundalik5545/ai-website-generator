import db from "@/config/db";
import { chatTable, frameTable } from "@/config/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const frameId = searchParams.get("frameId");

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

  const finalResults = {
    ...frameResult[0],
    chatMessages: chatResult[0].chatMessage,
  };

  return NextResponse.json(finalResults);
}

export async function PUT(req: NextRequest) {
  const { frameId, projectId, designCode } = await req.json();

  await db
    .update(frameTable)
    .set({
      designCode: designCode,
    })
    .where(
      and(eq(frameTable.frameId, frameId), eq(frameTable.projectId, projectId))
    );

  return NextResponse.json({ result: "updated" });
}
