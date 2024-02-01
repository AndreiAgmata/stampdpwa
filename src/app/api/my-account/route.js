import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import Transaction from "../../../../models/transaction";

export async function GET() {
  const session = await getServerSession(authOptions);
  try {
    await connectMongoDB();

    const user = await User.findOne({ _id: session.user._id });

    if (!user) {
      return NextResponse.json(
        { message: "Unable to find user details" },
        { status: 404 }
      );
    }

    const stampCount = await Transaction.countDocuments({
      clientId: session.user._id,
      transactionType: "Stamp",
    });

    if (stampCount === undefined || stampCount === null) {
      return NextResponse.json(
        { message: "Unable to find user stamp transactions" },
        { status: 404 }
      );
    }

    const rewardsCount = await Transaction.countDocuments({
      clientId: session.user._id,
      transactionType: "Reward",
    });

    if (rewardsCount === undefined || rewardsCount === null) {
      return NextResponse.json(
        { message: "Unable to find user rewards transactions" },
        { status: 404 }
      );
    }

    const payload = {
      user,
      stampCount,
      rewardsCount,
    };

    return NextResponse.json({ payload }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while fetching account details" },
      { status: 500 }
    );
  }
}
