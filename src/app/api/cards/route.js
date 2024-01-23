import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import Cards from "@/app/components/Cards";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = session.user._id;

  try {
    await connectMongoDB();

    //get cards from user including the card Details
    const user = await User.findById(userId).populate("cards.cardRef");

    if (!user) {
      return NextResponse.json(
        { message: "Unable to fetch Cards" },
        { status: 500 }
      );
    }
    return NextResponse.json({ cards: user.cards }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to fetch Cards" },
      { status: 500 }
    );
  }
}
