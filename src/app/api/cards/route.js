import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = session.user._id;

  try {
    await connectMongoDB();

    //get cards array
    const user = await User.findById(userId)
      .populate({
        path: "cards.businessRef",
        model: "Business",
        select: "activeCardRef",
        populate: {
          path: "activeCardRef",
          model: "Card",
        },
      })
      .select("cards");

    if (!user) {
      return NextResponse.json(
        { message: "Unable to fetch Cards" },
        { status: 500 }
      );
    }

    const cards = [];

    user.cards.forEach((ref) => {
      const card = {
        cardRef: ref.businessRef.activeCardRef,
        currentNumStamps: ref.currentNumStamps,
        _id: ref._id,
      };
      cards.push(card);
    });

    return NextResponse.json({ cards }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to fetch Cards" },
      { status: 500 }
    );
  }
}
