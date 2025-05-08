// src/app/api/register/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  // Simulate storing user (normally you'd store in DB)
  console.log("Registering user:", { name, email });

  return NextResponse.json(
    { message: "User registered successfully" },
    { status: 201 }
  );
}
