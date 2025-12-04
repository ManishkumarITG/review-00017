import mongoose, { Schema } from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    shop: {
      type: String,
      required: true,
    },
    customerId: {
      type: String,
      required: true,
    },
    targetId: {
      type: String,
      required: true,
      unique: true,
    },
    idType: {
      type: String,
      enum: ["store", "product"],
      required: true,
      default: "product",
    },

    spam: {
      type: Boolean,
      default: false,
    },

    froud: {
      type: Boolean,
      default: false,
    },

    title: {
      type: String,
    },
    like: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    description: {
      type: String,
      default: "",
    },
    images: {
      type: [String],
      default: [],
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

function getReviewModel(shop) {
  if (!shop) throw new Error("shopId is required to create review model");

  const safeShop = String(shop).replace(/[^a-zA-Z0-9_-]/g, "_");
  const collectionName = `reviews_${safeShop}`;

  if (mongoose.models[collectionName]) return mongoose.model(collectionName);

  return mongoose.model(collectionName, reviewSchema, collectionName);
}

export default getReviewModel;
