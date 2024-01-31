import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";

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

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while fetching account details" },
      { status: 500 }
    );
  }
}
