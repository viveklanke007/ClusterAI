import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { text } = await req.json();

    if (!text?.trim()) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    // Keep API key secure
    const apiKey = process.env.VOICE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "VoiceRSS API key missing in environment" },
        { status: 500 }
      );
    }

    // Construct VoiceRSS direct MP3 URL (super fast)
    const audioUrl = `https://api.voicerss.org/?key=${apiKey}&hl=en-us&c=MP3&f=44khz_16bit_stereo&src=${encodeURIComponent(
      text
    )}`;

    return NextResponse.json({ success: true, audioUrl });
  } catch (error) {
    console.error("Audio API Error:", error);
    return NextResponse.json(
      { success: false, error: "Audio generation failed" },
      { status: 500 }
    );
  }
}
