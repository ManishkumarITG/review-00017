import Shop from "../models/shop.model";

export const createShop = async (shop) => {
  console.log("--------------------------- shop", shop);
  const newShop = Shop.create({ shop });
  return newShop;
};

export const getShopById = async (shop) => {
  return Shop.findOne({ shop }).lean();
};

export const listShops = async (filter = {}, options = {}) => {
  const { limit = 20, skip = 0 } = options;
  return Shop.find(filter).skip(skip).limit(limit).lean();
};
