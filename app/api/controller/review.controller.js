import {
  createReview,
  deleteReviewById,
  getAllReviews,
  updatereviewbyId,
} from "../services/review.service";
import STATUS_CODE from "../contents/statusCode.js";
import MESSAGE from "../contents/message.js";
import { responseHandler } from "../utils/responseHandler";
import mongoConnect from "/app/db.server";

export const createProductReview = async (payload) => {
  try {
    await mongoConnect();
    const data = await createReview(payload);
    
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

// export const getReviews = async () => {
//   try {
//     await mongoConnect();
//     const data = await getAllReviews();
//     return responseHandler(STATUS_CODE.OK, MESSAGE, data);
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getReviews = async (filters) => {
  try {
    await mongoConnect();
    const data = await getAllReviews(filters);
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

export const updatereview = async (payload) => {
  try {
    const data = await updatereviewbyId(payload);
    return responseHandler(STATUS_CODE.OK, MESSAGE.UPDATED, data);
  } catch (error) {
    console.log(error);
    return responseHandler(STATUS_CODE.NO_CONTENT, error.message, null);
  }
};
