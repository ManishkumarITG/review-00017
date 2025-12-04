import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    shop: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
