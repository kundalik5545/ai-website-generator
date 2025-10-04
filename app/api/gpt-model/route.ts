import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI();

export async function POST(request: Request) {
  try {
    const stream = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "Say 'double bubble bath' ten times fast.",
        },
      ],
      stream: true,
    });

    for await (const chunk of stream) {
      console.log(chunk);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: `Something went wrong - with OpenAI API: ${error.message}` },
      { status: error.status || 500 }
    );
  }
}
