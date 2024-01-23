import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  const userId = session.user._id;
  const { cardId } = await req.json();
  const cardToAdd = { cardRef: cardId };
  try {
    await connectMongoDB();

    const isCardIdUnique = await User.exists({
      _id: userId,
      "cards.cardRef": cardId,
    });

    if (isCardIdUnique) {
      return NextResponse.json(
        { message: "Card already exists for the user" },
        { status: 400 }
      );
    }

    const addedCard = await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: { cards: cardToAdd },
      },
      { new: true }
    );

    if (!addedCard) {
      return NextResponse.json(
        {
          message: "An error occurred. Unable to add card",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ status: 201 });
  } catch (error) {
    throw new Error("Unable to add card");
  }
}
