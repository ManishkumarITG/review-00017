import mongoose from "mongoose";

const ShopSchema = new mongoose.Schema({
  shop: { type: String, required: true, unique: true },
});

const Shop = mongoose.model("Shop", ShopSchema);

export default Shop;
