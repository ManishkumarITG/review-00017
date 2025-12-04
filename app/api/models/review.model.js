import mongoose, { Schema } from "mongoose";

const productReviewSchema = new Schema(
  {
    shop: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["product", "store"], // restricts values
      required: true,
      default: "product",
    },
    productId: {
      type: String,
      required: true,
      unique: true,
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
      type: String,
      default: "",
    },
    pinned: {
      type: Boolean,
      default: false,
    },

    orderId: {
      type: String,
      default: "",
    },

    customerId: {
      type: String,
      default: null,
    },
    author: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    spam: {
      type: Boolean,
      default: false,
    },

    fraud: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const settingSchema = new Schema({
  shop: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },

  review: {
    type: [productReviewSchema],
    required: true,
  },
});

const ProductReview =
  mongoose.models.ProductReview ||
  mongoose.model("ProductReview", settingSchema);

export default ProductReview;
