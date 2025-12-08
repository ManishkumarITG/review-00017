import {
  createProductReview,
  deletereview,
  getReviews,
  updatereview,
  getAllReviews,
  getRatingSummary,
} from "../../controller/review.controller";

import { authenticateUser } from "../../middlewares/auth";
import { responseHandler } from "../../utils/responseHandler";
import STATUS_CODE from "../../contents/statusCode";
import MESSAGE from "../../contents/message";
import { handleUrlData } from "../../middlewares/handleUrl";
import mongoConnect from "../../../db.server";

export const loader = async ({ request }) => {
  await mongoConnect();
  try {
    const { status, shop, session, path, message, httpCode } =
      await authenticateUser(request);
    if (!status) {
      throw new Error(message);
    }

    const { idType, page, limit, type, skip, skipValue, targetId, filterType } =
      handleUrlData(request);

    console.log("--------------------------------- url , idType", idType);

    switch (path) {
      case "getAllReviews":
        return await getAllReviews({
          limit,
          type,
          skip,
          page,
          skipValue,
          shop,
          targetId,
          filterType,
        });
      case "reviews":
        return await getReviews({
          limit,
          type,
          skip,
          page,
          skipValue,
          shop,
          idType,
          targetId,
          filterType,
        });
      case "ratingSummary":
        return await getRatingSummary(shop, targetId);

      default:
        return responseHandler(
          STATUS_CODE.BAD_REQUEST,
          MESSAGE.BAD_REQUEST,
          null,
        );
    }
  } catch (error) {
    console.log(" loader error:", error);
    return responseHandler(400, "not found", null);
  }
};

export const action = async ({ request }) => {
  await mongoConnect();
  try {
    console.log("---------------- action apis 2");
    const data = await request.json();

    const { path, shop } = await authenticateUser(request);

    console.log(
      "----------------------------------- path , data , shop",
      path,
      data,
      shop,
    );

    switch (path) {
      case "createproduct":
        return await createProductReview(shop, data);
      case "deletereview":
        return await deletereview(data);
      case "updatereview":
        return await updatereview(shop, data);
      default:
        break;
    }
  } catch (error) {
    console.log("catch error in test loader :", error);
    return responseHandler(400, "no found", null);
  }
};
