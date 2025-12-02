import message from "../contents/message.js";
import ProductReview from "../models/review.model.js";

export const createReview = async (payload) => {
  try {
    const {
      shop,
      productId,
      rating,
      description,
      images,
      orderId,
      customerId,
      author,
      email,
    } = payload;

    console.log(
      "------------------------------- data",
      shop,
      productId,
      rating,
      description,
      images,
      orderId,
      customerId,
      email,
      author,
    );

    const newReview = await ProductReview.create({
      shop,
      type: "product",
      productId: productId,
      rating,
      email,
      description: description || "",
      images: images || "",
      orderId: orderId || null,
      customerId: customerId || null,
      like: false,
      pinned: false,
      author: author,
    });
    return {
      success: true,
      message: "Review created successfully",
      data: newReview.toObject(),
    };
  } catch (error) {
    console.log("error in review creation:", error);
    return {
      success: false,
      message: "Review creation failed",
      error: error.message,
    };
  }
};

export const getAllReviews = async (filter) => {
  try {
    const { limit, page, type, rating, skip } = filter || {};

    const query = {};

    // 🔹 Type filters
    if (type === "product") query.product = { $exists: true, $ne: null };
    if (type === "shop") query.shop = { $exists: true, $ne: null };

    // 🔹 Rating filter
    if (rating) query.rating = Number(rating);

    // Defaults
    const perPage = Number(limit) || 10;
    const currentPage = Number(page) || 1;

    const skipValue =
      skip !== undefined && skip !== null
        ? Number(skip)
        : (currentPage - 1) * perPage;

    const data = await ProductReview.find(query).skip(skipValue).limit(perPage);

    const totalReviews = await ProductReview.countDocuments(query);

    return {
      data,
      pagination: {
        total: totalReviews,
        page: currentPage,
        limit: perPage,
        totalPages: Math.ceil(totalReviews / perPage),
        skipValue,
      },
    };
  } catch (error) {
    console.log(error);
  }
};

export const deleteReviewById = async (payload) => {
  try {
    const { id } = payload;
    const deletedreview = await ProductReview.findByIdAndDelete(id);
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
  } catch (error) {
    console.log("error in delete services", error);
  }
};

export const updatereviewbyId = async (payload) => {
  try {
    const { reviewId, ...data } = payload;
    if (!reviewId) return { success: false, message: "reviewId is required" };

    const updated = await ProductReview.findByIdAndUpdate(reviewId, data, {
      new: true,
    });

    if (!updated) return { success: false, message: "Review not found" };

    return {
      success: true,
      message: "Review updated",
      data: updated.toObject(),
    };
  } catch (error) {
    console.log("Error updating review:", error);
    return { success: false, message: "Update failed", error: error.message };
  }
};
