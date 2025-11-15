import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import User from "@/models/user";
import { verifyToken } from "@/lib/auth";

export async function POST(req) {
  try {
    await connectDB();

    const { token } = await req.json();
    if (!token) {
      return NextResponse.json({ error: "Token missing" }, { status: 400 });
    }

    const decoded = verifyToken(token);
    if (!decoded?.id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const user = await User.findById(decoded.id).select("-password").lean();

    if (!user) {
      return NextResponse.json(
        { error: "User no longer exists" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json(
      { error: "Could not fetch user" },
      { status: 500 }
    );
  }
}
