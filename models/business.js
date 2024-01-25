import mongoose, { Schema } from "mongoose";

const businessSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    businessName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phoneNum: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    stampCode: {
      type: String,
      required: true,
    },
    clients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    activeCardRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card",
    },
    cards: [
      {
        card_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Card",
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

const Business =
  mongoose.models?.Business || mongoose.model("Business", businessSchema);

export default Business;
