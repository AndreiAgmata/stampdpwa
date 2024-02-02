import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import Business from "../../../../models/business";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = session.user._id;

  if (!session || !session.user || !session.user._id) {
    return NextResponse.json({ message: "Not authorized" }, { status: 401 });
  }

  try {
    await connectMongoDB();
    console.log("connected to database");

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
        { status: 404 }
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
