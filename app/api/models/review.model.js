import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    shop: {
      type: String,
      required: true,
    },

    idType: {
      type: String,
      enum: ["store", "product"],
      required: true,
    },

    targetId: {
      type: String,
      required: true,
    },

    customerId: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    images: {
      type: [String],
      default: [],
    },

    like: {
      type: Boolean,
      default: false,
    },

    spam: {
      type: Boolean,
      default: false,
    },

    froud: {
      type: Boolean,
      default: false,
    },

    pinned: {
      type: Boolean,
      default: false,
    },

    name: {
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

reviewSchema.index(
  { shop: 1, idType: 1, targetId: 1, customerId: 1 },
  { unique: true },
);

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);
export default Review;
