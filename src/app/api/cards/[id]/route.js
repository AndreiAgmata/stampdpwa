import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  const { id } = params;
  try {
    await connectMongoDB();

    const updatedUser = await User.findOneAndUpdate(
      { _id: session.user._id },
      { $pull: { cards: { _id: id } } },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { message: "An error occurred while deleting the card" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Card deleted" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while deleting the card" },
      { status: 500 }
    );
  }
}
