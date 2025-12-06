import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    const response = await fetch("https://capycap.ai/api/captcha/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        sitekey: process.env.NEXT_PUBLIC_CAPYCAP_SITEKEY,
      }),
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Captcha verification error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
