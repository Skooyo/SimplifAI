import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: any }) {
  console.log("req:", req);

  const { chatQuery } = await req.json();
  console.log("chatQuery:", chatQuery);

  if (!chatQuery) {
    return NextResponse.json(
      { error: "chatQuery is required" },
      { status: 400 }
    );
  }

  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_OPENAI_URI +
      "&chatQuery=" +
      encodeURIComponent(chatQuery as string)
    }`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}

export async function GET(req: NextRequest, { params }: { params: any }) {
  console.log("req:", req);

  const { chatQuery } = await req.json();
  console.log("chatQuery:", chatQuery);

  if (!chatQuery) {
    return NextResponse.json(
      { error: "chatQuery is required" },
      { status: 400 }
    );
  }

  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_OPENAI_URI +
      "&chatQuery=" +
      encodeURIComponent(chatQuery as string)
    }`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
