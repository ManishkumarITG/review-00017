import User from "../models/user.model";
import Review from "../models/review.model";
import mongoConnect from "../../db.server";
import { getFilterType } from "../middlewares/handelFilter";

export const createReview = async (shop, payload) => {
  await mongoConnect();
  const {
    targetId,
    idType,
    rating,
    description,
    images,
    customerId,
    name,
    email,
  } = payload;

  let user = await User.findOne({ customerId });

  if (!user) {
    user = await User.create({
      customerId,
      name: name,
      email,
      shop,
    });
  }

  const review = await Review.create({
    shop,
    idType,
    targetId,
    rating,
    email,
    description,
    images,
    customerId,
    like: false,
    pinned: false,
    name: name,
  });

  if (!review) {
    throw new Error("review not create");
  }

  return review.toObject();
};

export const getAllReviewsByShop = async (data) => {
  const { limit, page, shop, filterType } = data;
  console.log(
    "------------------------------------------------ service data",
    data,
  );

  if (!shop) throw new Error("shop is required");

  const sortQuery = getFilterType(filterType);
  console.log("------------------------------- sort query ", sortQuery);
  const skip = (page - 1) * limit;

  const items = await Review.find({ shop })
    .sort(sortQuery)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await Review.countDocuments({ shop });

  console.log("----------------------------------- 1212121212", items);

  return { items, total, limit, page };
};

export const getReviewsByType = async (data) => {
  try {
    const { limit, page, shop, idType, targetId, filterType } = data;

    console.log(idType);

    if (!shop) throw new Error("shop is required");
    const sortQuery = getFilterType(filterType);
    const skip = (page - 1) * limit;

    const filter = {
      shop: shop,
    };

    if (targetId) {
      filter.targetId = targetId;
    }

    if (idType == "spam" || idType == "froud") {
      filter[idType] = true;
    }

    if (idType !== "spam" && idType !== "froud") {
      filter.idType = idType;
    }

    console.log("--------------------------------- filter obj", filter);
    const items = await Review.find(filter)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Review.countDocuments(filter);

    console.log("--------------------------- data , item", items, total);
    return { items, total, page, limit };
  } catch (error) {
    console.log(error);
  }
};

export const deleteReviewById = async (payload) => {
  const { targetId } = payload;
  const deletedreview = await Review.findOneAndDelete(targetId);
  return deletedreview;
};

export const updatereviewbyId = async (shop, payload) => {
  const { id, ...data } = payload;

  if (!id) {
    throw new Error("id is not found");
  }

  const updated = await Review.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });

  if (!updated) {
    throw new Error("data not updated");
  }

  return updated.toObject();
};

export const getRatingSummaryService = async (shop) => {
  const reviews = await Review.find({ shop });

  const summary = [];
  let totalRatingSum = 0;

  for (let r = 5; r >= 1; r--) {
    const reviewsForRating = reviews.filter((x) => x.rating === r);
    const count = reviewsForRating.length;

    totalRatingSum += r * count;

    summary.push({
      rating: r,
      pepole: count,
    });
  }

  const totalReview = reviews.length;
  let avgRating = 0;

  if (totalReview > 0) {
    avgRating = Number((totalRatingSum / totalReview).toFixed(1));
  }

  return {
    reviews: summary,
    totalReview: totalReview,
    avgRating: avgRating,
  };
};

export const searchReviews = async (shop, query) => {
  console.log("-------------------------------------- query value", query);
  const regexQuery = new RegExp(query, "i");
  const data = await Review.find({
    shop,
    $or: [{ name: { $regex: regexQuery } }, { email: { $regex: regexQuery } }],
  });

  return data;
};
