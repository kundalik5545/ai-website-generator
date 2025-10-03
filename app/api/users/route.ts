import db from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await currentUser();

  // if user is already exists?
  const userResult = await db
    .select()
    .from(usersTable)
    //@ts-ignore
    .where(eq(usersTable.email, user?.primaryEmailAddress?.emailAddress));

  // if not, create a new user in the database
  if (userResult?.length === 0) {
    const result = await db.insert(usersTable).values({
      name: user?.fullName ?? "",
      email: user?.primaryEmailAddress?.emailAddress ?? "",
    });
  }

  return NextResponse.json({ user });
}
