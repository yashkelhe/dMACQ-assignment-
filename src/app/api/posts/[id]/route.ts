import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // Mark params as a Promise
) {
  const { id } = await context.params; // Await the params object
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (token !== "mock-token-123") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const post = {
    id: parseInt(id || "0", 10),
    title: `Blog Post #${id}`,
    content: `This is the full content of blog post #${id}. It contains detailed information.`,
  };

  return NextResponse.json(post, { status: 200 });
}
