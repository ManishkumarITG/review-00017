import {
  createReview,
  deleteReviewById,
  getReviewsByType,
  updatereviewbyId,
  getAllReviewsByShop,
  getRatingSummaryService,
  searchReviews,
} from "../services/review.service";
import STATUS_CODE from "../contents/statusCode.js";
import MESSAGE from "../contents/message.js";
import { responseHandler } from "../utils/responseHandler";

export const createProductReview = async (shop, payload) => {
  try {
    console.log(
      "------------------------------------- palyload12",
      shop,
      payload,
    );
    const data = await createReview(shop, payload);

    return responseHandler(STATUS_CODE.CREATED, MESSAGE.CREATED, data);
  } catch (error) {
    console.log("error in create review controller", error);
    return responseHandler(
      STATUS_CODE.INTERNAL_SERVER_ERROR,
      error.message,
      null,
    );
  }
};

export const getAllReviews = async (payload) => {
  try {
    const data = await getAllReviewsByShop(payload);
    return responseHandler(STATUS_CODE.OK, MESSAGE.SUCCESS, data);
  } catch (error) {
    responseHandler(
      STATUS_CODE.INTERNAL_SERVER_ERROR,
      MESSAGE.SERVER_ERROR,
      null,
    );
  }
};

export const getReviews = async (filters) => {
  try {
    const data = await getReviewsByType(filters);
    console.log("--------------------------- by type data ", data);
    return responseHandler(STATUS_CODE.OK, MESSAGE.SUCCESS, data);
  } catch (error) {
    console.log(error);
  }
};

export const deletereview = async (payload) => {
  try {
    const data = await deleteReviewById(payload);
    return responseHandler(STATUS_CODE.OK, MESSAGE.DELETED, data);
  } catch (error) {
    console.log(error);
    return responseHandler(STATUS_CODE.NO_CONTENT, error.message, null);
  }
};

export const updatereview = async (shop, payload) => {
  try {
    const data = await updatereviewbyId(shop, payload);
    return responseHandler(STATUS_CODE.OK, MESSAGE.UPDATED, data);
  } catch (error) {
    console.log(error);
    return responseHandler(STATUS_CODE.NO_CONTENT, error.message, null);
  }
};

export const getRatingSummary = async (shop, targetId) => {
  try {
    const data = await getRatingSummaryService(shop, targetId);
    return responseHandler(STATUS_CODE.OK, MESSAGE.SUCCESS, data);
  } catch (error) {
    console.log("rating summary error:", error);
    return responseHandler(
      STATUS_CODE.INTERNAL_SERVER_ERROR,
      error.message,
      null,
    );
  }
};

export const getSearchResult = async (shop, query) => {
  try {
    const data = await searchReviews(shop, query);
    return responseHandler(STATUS_CODE.OK, MESSAGE.SUCCESS, data);
  } catch (error) {
    console.log("search result:", error);
    return responseHandler(
      STATUS_CODE.INTERNAL_SERVER_ERROR,
      error.message,
      null,
    );
  }
};
