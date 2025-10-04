import db from "@/config/db";
import { usersTable } from "@/config/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Database health check using Drizzle ORM
    // Try a simple query to check if tables are accessible
    const result = await db.select().from(usersTable).limit(1);

    // If we can query the table, the database is healthy
    console.log("Database health check passed");

    return NextResponse.json(
      {
        status: "healthy",
        timestamp: new Date().toISOString(),
        database: "connected",
        server: "running",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        database: "disconnected",
        server: "running",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 503 }
    );
  }
}
