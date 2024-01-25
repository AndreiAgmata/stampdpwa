import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";
import Business from "../../../../../models/business";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  const userId = session.user._id;
  const { businessId } = await req.json();
  const cardToAdd = { businessRef: businessId };
  try {
    await connectMongoDB();

    //check if card is valid
    const business = await Business.find({ _id: businessId });

    if (business.length === 0) {
      return NextResponse.json({ message: "No Card found" }, { status: 400 });
    }

    //check if card has already been added
    const isCardIdUnique = await User.exists({
      _id: userId,
      "cards.businessRef": businessId,
    });

    if (isCardIdUnique) {
      return NextResponse.json(
        { message: "Card already exists for the user" },
        { status: 409 }
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
