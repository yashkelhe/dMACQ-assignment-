// src/app/api/login/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Simulated validation
  if (email === "test@example.com" && password === "password123") {
    // Generate mock token (normally you'd use JWT)
    const token = "mock-token-123";

    return NextResponse.json({ token }, { status: 200 });
  }

  return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
}
