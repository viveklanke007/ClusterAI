import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongoose";
import History from "../../../../models/history";
import { verifyToken } from "../../../../lib/auth";

export async function POST(req) {
  try {
    await connectDB();
    const { token } = await req.json();

    const user = verifyToken(token);
    if (!user)
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    await History.deleteMany({ userId: user.id });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to clear history", detail: error.message },
      { status: 500 }
    );
  }
}
