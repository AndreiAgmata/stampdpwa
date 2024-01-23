import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNum: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cards: [
      {
        cardRef: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Card",
        },
        currentNumStamps: {
          type: Number,
          default: 0,
        },
      },
    ],
    transactions: [
      {
        transactionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Transaction",
        },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.models?.User || mongoose.model("User", userSchema);
export default User;
