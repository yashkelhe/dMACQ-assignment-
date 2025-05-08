// src/app/api/posts/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (token !== "mock-token-123") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const id = parseInt(params.id);
  const post = {
    id,
    title: `Blog Post #${id}`,
    content: `This is the full content of blog post #${id}.`,
  };

  return NextResponse.json(post);
}
