// src/app/api/posts/route.ts
import { NextRequest, NextResponse } from "next/server";

const allPosts = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Blog Post #${i + 1}`,
  content: `This is the content for blog post number ${i + 1}.`,
}));

export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (token !== "mock-token-123") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
  const pageSize = 10;
  const start = (page - 1) * pageSize;
  const paginatedPosts = allPosts.slice(start, start + pageSize);

  return NextResponse.json({
    posts: paginatedPosts,
    total: allPosts.length,
    page,
    totalPages: Math.ceil(allPosts.length / pageSize),
  });
}
