// app/api/history/add/route.js
import { connectDB } from "../../../../lib/mongoose";
import History from "../../../../models/history";
import { verifyToken } from "../../../../lib/auth";

export async function POST(req) {
  try {
    await connectDB();
    const { token, type, prompt, output, meta } = await req.json();

    const decoded = verifyToken(token);
    if (!decoded)
      return new Response(JSON.stringify({ message: "Invalid token" }), {
        status: 401,
      });

    const entry = await History.create({
      userId: decoded.id,
      type,
      prompt,
      output,
      meta: meta || {},
    });

    return new Response(JSON.stringify({ message: "Saved", id: entry._id }), {
      status: 201,
    });
  } catch (err) {
    console.error("HISTORY ADD ERR", err);
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
}
