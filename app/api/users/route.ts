import db from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const user = await currentUser();
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    // if user is already exists?
    const userResult = await db
      .select()
      .from(usersTable)
      // @ts-expect-error - Clerk types may not perfectly match drizzle types
      .where(eq(usersTable.email, user?.primaryEmailAddress?.emailAddress));

    // if not, create a new user in the database
    if (userResult?.length == 0) {
      const data = {
        name: user?.fullName ?? "NA",
        email: user?.primaryEmailAddress?.emailAddress ?? "NA",
      };

      await db.insert(usersTable).values({
        ...data,
      });

      return NextResponse.json({ user: data });
    }

    return NextResponse.json({ user: userResult[0] });
  } catch (error) {
    console.error("Error in creating user", error);
    return NextResponse.json({ error: "Error in creating user" });
  }
}
