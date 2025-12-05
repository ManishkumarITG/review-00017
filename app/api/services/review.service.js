import User from "../models/user.model";
import Review from "../models/review.model";
import mongoConnect from "../../db.server";
export const createReview = async (shop, payload) => {
  await mongoConnect()
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
  const { limit = 10, page = 1, shop } = data;

  if (!shop) throw new Error("shop is required");

  const skip = (page - 1) * limit;

  const allReviews = Review.find({ shop })
    .sort({ pinned: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  return allReviews;
};

export const getReviewsByType = async (data) => {
  try {
   await mongoConnect()
    const { limit, page, shop, idType } = data;

    console.log(idType);

    if (!shop) throw new Error("shop is required");

    const skip = (page - 1) * limit;

    const filter = {
      shop: shop,
    };

    if (idType == "spam" || idType == "froud") {
      filter[idType] = true;
    }

    if (idType !== "spam" && idType !== "froud") {
      filter.idType = idType;
    }

    console.log("--------------------------------- filter obj", filter);
    const items = await Review.find(filter)
      .sort({ pinned: -1 })
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
  const deletedreview = await Review.findOneAndDelete(targetId);
  return deletedreview;
};

export const updatereviewbyId = async (shop, payload) => {
  const { id, data } = payload;

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

  for (let r = 5; r >= 1; r--) {
    summary.push({
      rating: r,
      pepole: reviews.filter((x) => x.rating === r).length,
    });
  }

  return {
    reviews: summary,
    totalReview: reviews.length,
  };
};
