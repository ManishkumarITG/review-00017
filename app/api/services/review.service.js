import ProductReview from "../models/review.model.js";
import getReviewModel from "../models/review.model.js";
import { createShop, getShopById } from "./shop.service.js";

export const createReview = async (shop, payload) => {
  try {
    const {
      targetId,
      idType,
      rating,
      description,
      images,
      customerId,
      author,
      email,
    } = payload;

    const userShop = await getShopById(shop);

    if (!userShop) {
      const newShop = await createShop(shop);
      if (!newShop) {
        throw new Error("coude not create your shop");
      }
    }

    const Review = getReviewModel(shop);

    const newReview = await Review.create({
      shop,
      idType,
      targetId,
      rating,
      email,
      description: description,
      images: images,
      customerId: customerId,
      like: false,
      pinned: false,
      userName: author,
    });
    return newReview.toObject();
  } catch (error) {
    console.log("error in review creation:", error);
    return {
      success: false,
      message: "Review creation failed",
      error: error.message,
    };
  }
};

export const getAllReviewsByShop = async (data) => {
  const { limit, page, shop } = data;
  const Review = getReviewModel(shop);
  if (!Review) {
    throw new Error("shop in not found");
  }
  const skip = (page - 1) * limit;
  const shopReviews = await Review.find({})
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();
  return shopReviews;
};

export const getReviewsByType = async (data) => {
  try {
    const { limit, page, shop, idType } = data;

    const filter = {};

    if (idType == "spam" || idType == "froud") {
      filter[idType] = true;
    }

    if (idType !== "spam" && idType !== "froud") {
      filter.idType = idType;
    }

    console.log(idType);
    const Review = getReviewModel(shop);
    if (!Review) {
      throw new Error("shop in not found");
    }
    const skip = (page - 1) * limit;
    console.log(filter);
    const items = await Review.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    const total = await Review.countDocuments();

    console.log("--------------------------- data , item", items, total);
    return { items, total, page, limit };
  } catch (error) {
    console.log(error);
  }
};

export const deleteReviewById = async (payload) => {
  const { targetId } = payload;
  const deletedreview = await ProductReview.findOneAndDelete(targetId);
  if (deletedreview) {
    return {
      success: true,
      message: "review delete successfully",
      data: deletedreview,
    };
  }
  return {
    success: true,
    message: "review not found",
  };
};

export const updatereviewbyId = async (shop, payload) => {
  const { id, data } = payload;

  if (!id) {
    throw new Error("id is not found");
  }

  const Review = getReviewModel(shop);
  if (!Review) {
    throw new Error("shop in not found");
  }

  const updated = await Review.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });

  if (!updated) {
    throw new Error("data not updated");
  }

  return updated.toObject();
};
