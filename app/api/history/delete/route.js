import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongoose";
import History from "../../../../models/history";
import { verifyToken } from "../../../../lib/auth";

export async function POST(req) {
  try {
    await connectDB();
    const { token, id } = await req.json();

    const user = verifyToken(token);
    if (!user)
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    await History.deleteOne({ _id: id, userId: user.id });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete item", detail: error.message },
      { status: 500 }
    );
  }
}
