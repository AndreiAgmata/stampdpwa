import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../../lib/mongodb";
import User from "../../../../../../models/user";
import Business from "../../../../../../models/business";
import Transaction from "../../../../../../models/transaction";

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);
  const { id } = params;
  const { code, businessId } = await req.json();

  let stampCode = "";

  //fetch the card owner's stampCode
  try {
    await connectMongoDB();
    const business = await Business.findOne({ _id: businessId }).select(
      "stampCode"
    );

    if (!business) {
      return NextResponse.json(
        { message: "Unable to fetch the card's stamp code" },
        { status: 500 }
      );
    }

    stampCode = business.stampCode;
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to fetch the card's stamp code" },
      { status: 500 }
    );
  }

  //stamp the card
  try {
    if (code === stampCode) {
      const updatedUser = await User.findOneAndUpdate(
        { _id: session.user._id, "cards._id": id },
        { $inc: { "cards.$.currentNumStamps": 1 } },
        { new: true }
      );

      if (!updatedUser) {
        return NextResponse.json(
          { message: "An error occurred while stamping the card" },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json({ message: "Invalid QR Code" }, { status: 422 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while stamping the card" },
      { status: 500 }
    );
  }

  //create a new transaction
  try {
    const newTransaction = {
      businessId: businessId,
      clientId: id,
      transactionType: "Stamp",
    };
    const transaction = await Transaction.create(newTransaction);

    if (!transaction) {
      return NextResponse.json(
        { message: "An error occurred while creating a transaction" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Card successfully stamped." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while creating a transaction" },
      { status: 500 }
    );
  }
}
