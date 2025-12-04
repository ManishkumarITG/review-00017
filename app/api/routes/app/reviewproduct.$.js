import {
  createProductReview,
  deletereview,
  getReviews,
  updatereview,
  getAllReviews,
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
    const idType = url.searchParams.get("idTYpe");
    const page = Number(url.searchParams.get("page")) || 1;
    const limit = Number(url.searchParams.get("limit")) || 10;
    const type = url.searchParams.get("type") || null;
    const skip = url.searchParams.get("skip");
    const skipValue = skip !== null ? Number(skip) : undefined;

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
        });

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
