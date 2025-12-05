import {
  createProductReview,
  deletereview,
  getReviews,
  updatereview,
  getAllReviews,
  getRatingSummary,
  getSearchResult,
} from "../../controller/review.controller";

import { authenticateUser } from "../../middlewares/auth";
import { responseHandler } from "../../utils/responseHandler";
import STATUS_CODE from "../../contents/statusCode";
import MESSAGE from "../../contents/message";

export const loader = async ({ request }) => {
  try {
    const { status, shop, session, path, message, httpCode } =
      await authenticateUser(request);
    if (!status) {
      throw new Error(message);
    }

    const url = new URL(request.url);
    const idType = url.searchParams.get("idType");
    const page = Number(url.searchParams.get("page")) || 1;
    const limit = Number(url.searchParams.get("limit")) || 10;
    const type = url.searchParams.get("type") || null;
    const skip = url.searchParams.get("skip");
    const skipValue = skip !== null ? Number(skip) : undefined;
    const searchQuery = url.searchParams.get("query");
    const targetId = url.searchParams.get("targetId");

    console.log("--------------------------------- url , idType", idType, url);

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
        });

      case "ratingSummary":
        return await getRatingSummary(shop);

      case "queryChange":
        return await getSearchResult(shop, searchQuery);

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
