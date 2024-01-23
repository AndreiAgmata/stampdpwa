import mongoose, { Schema, models } from "mongoose";

const cardSchema = new Schema(
  {
    businessName: {
      type: String,
    },
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
    },
    cardLogoUrl: {
      type: String,
    },
    cardBackgroundUrl: {
      type: String,
    },
    cardTheme: {
      type: String,
    },
    cardStampUrl: {
      type: String,
    },
    cardDesc: {
      type: String,
    },
    numberOfStamps: {
      type: Number,
      default: 6,
    },
    rewardDesc: {
      type: String,
    },
    websiteUrl: {
      type: String,
    },
    instagramUrl: {
      type: String,
    },
    email: {
      type: String,
    },
    phoneNum: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Card = mongoose.models?.Card || mongoose.model("Card", cardSchema);

export default Card;
