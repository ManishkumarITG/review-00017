import {
  createProductReview,
  deletereview,
  getReviews,
  updatereview,
} from "../controller/review.controller";

import { authenticateUser } from "../middlewares/auth";
import { responseHandler } from "../utils/responseHandler";

// export const loader = async ({ request }) => {
//   try {
//     console.log(
//       "----------------------------hit api-------------------------------",
//     );

//     const url = request.url;
//     const path = url.split("/").pop();

//     switch (path) {
//       case "reviews":
//         return await getReviews();
//     }
//   } catch (error) {
//     console.log("catch error in test loader :", error);
//     return responseHandler(400, "no found", null);
//   }
// };

export const loader = async ({ request }) => {
  try {
    console.log("🚀 Incoming GET payload... optimized for scale");

    const url = new URL(request.url);
    const path = url.pathname.split("/").pop();

    const page = Number(url.searchParams.get("page")) || 1;
    const limit = Number(url.searchParams.get("limit")) || 10;
    const type = url.searchParams.get("type") || null;
    const skip = url.searchParams.get("skip");
    const skipValue = skip !== null ? Number(skip) : undefined;

    switch (path) {
      case "reviews":
        return await getReviews({ page, limit, type, skip });
    }
  } catch (error) {
    console.log("🔥 loader error:", error);
    return responseHandler(400, "not found", null);
  }
};

export const action = async ({ request }) => {
  try {
    console.log("---------------- action apis 2");
    const data = await request.json();

    const { path } = await authenticateUser(request);

    console.log("----------------------------------- path", path);

    switch (path) {
      case "createproduct":
        return await createProductReview(data);
      case "deletereview":
        return await deletereview(data);
      case "updatereview":
        return await updatereview(data);
      default:
        break;
    }
  } catch (error) {
    console.log("catch error in test loader :", error);
    return responseHandler(400, "no found", null);
  }
};
