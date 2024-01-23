import mongoose, { Schema, models } from "mongoose";

const transactionSchema = new Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    cardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card",
    },
    transactionType: {
      type: String,
    },
  },
  { timestamps: true }
);

const Transaction =
  mongoose.models?.Transaction ||
  mongoose.model("Transaction", transactionSchema);

export default Transaction;
