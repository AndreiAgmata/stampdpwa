import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import Transaction from "../../../../models/transaction";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  const cardDetails = await req.json();

  try {
    await connectMongoDB();

    const updatedUser = await User.findOneAndUpdate(
      { _id: session.user._id, "cards._id": cardDetails._id },
      { $set: { "cards.$.currentNumStamps": 0 } },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { message: "An error occurred while claiming the reward for the user" },
        { status: 400 }
      );
    }

    //create a new transaction
    const newTransaction = {
      businessId: cardDetails.cardRef.businessId,
      clientId: session.user._id,
      transactionType: "Reward",
    };

    const transaction = await Transaction.create(newTransaction);

    if (!transaction) {
      return NextResponse.json(
        { message: "An error occurred while creating a transaction" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Reward successfully claimed" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while claiming the reward" },
      { status: 500 }
    );
  }
}
