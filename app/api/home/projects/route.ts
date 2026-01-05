import { NextResponse } from "next/server";
import { getContent } from "@/lib/cms";

export async function GET() {
    const data = await getContent("home-projects.md");
    if (!data) return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
    return NextResponse.json(data);
}
