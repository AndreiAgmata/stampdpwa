import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Business from "../../../../models/business";
import Card from "../../../../models/card";

export async function GET() {
  try {
    await connectMongoDB();

    const businesses = await Card.find({ isActive: true });

    if (!businesses) {
      return NextResponse.json(
        { message: "Unable to fetch businesses" },
        { status: 400 }
      );
    }

    return NextResponse.json({ businesses }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to fetch businesses" },
      { status: 500 }
    );
  }
}
