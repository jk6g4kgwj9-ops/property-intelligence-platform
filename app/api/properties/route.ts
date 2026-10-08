import { NextResponse } from "next/server";
import { createProperty } from "@/lib/properties";

export async function GET() {
  return NextResponse.json({ message: "Property API is live." });
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const property = createProperty(payload);

    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid property payload.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
