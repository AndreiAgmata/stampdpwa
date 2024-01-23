import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const user = await req.json();
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    await connectMongoDB();

    const userExists = await User.findOne({ email: user.email });

    if (userExists) {
      return NextResponse.json(
        { message: "Email is already in use." },
        { status: 400 }
      );
    }

    await User.create(user);
    return NextResponse.json({ message: "User Registered" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error occurred during registration" },
      { status: 500 }
    );
  }
}
