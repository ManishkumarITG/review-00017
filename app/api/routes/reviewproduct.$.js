import {
  createProductReview,
  deletereview,
  getReviews,
  searchreview,
  SpamReviews,
  updatereview,
} from "../controller/review.controller";
import shopify from "../../shopify.server";

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
      case "spam":
        return SpamReviews();
      default:
        return responseHandler(
          "Bad Requist",
          "Invalid path provided, bro 💀",
          null,
        );
    }
  } catch (error) {
    console.log("🔥 loader error:", error);
    return responseHandler(400, "not found", null);
  }
};

// export const action = async ({ request }) => {
//   try {
//     console.log("---------------- action apis 2");
//     const data = await request.json();

//     // const { path } = await authenticateUser(request);

//     const { session } = await shopify.authenticate.admin(request);

//     const shopDomain = session.shop;

//     console.log( session,"😂😂😂😂");
// // console.log();

//     // switch (path) {
//     //   case "createproduct":
//     //     return await createProductReview(data);
//     //   case "deletereview":
//     //     return await deletereview(data);
//     //   case "updatereview":
//     //     return await updatereview(data);
//     //   case "search":
//     //     return await searchreview(data);
//     //   default:
//     //     break;
//     // }

//      const url = request.url;
//     const path = url.split("/").pop();

//     switch (path) {
//       case "createproduct":
//         console.log("----------------------------------- path", path);
//         return await createProductReview(shopDomain, data);

//       case "deletereview":
//         return await deletereview(data);

//       case "updatereview":
//         return await updatereview(data);

//       default:
//         return responseHandler(
//           "Bad Requist",
//           "Invalid path provided, bro 💀",
//           null,
//         );
//     }
//   } catch (error) {
//     console.log("catch error in test loader :", error);
//     return responseHandler(400, "no found", null);
//   }
// };

export const action = async ({ request }) => {
  try {
    const data = await request.json();
    console.log("---------------- action api triggered");
    // const { session } = await shopify.authenticate.admin(request);
    // console.log("Shop session ❌❌❌❌ 👍👍👍👍:", session)
    // const shopDomain = session.shop;

    // console.log("Shop session 👍👍👍👍:", session);

    // const url = request.url;
    // const path = url.split("/").pop();

    const { path, session } = await authenticateUser(request);

    switch (path) {
      case "createproduct":
        console.log("Path: ➖➖➖➖➖", path);
        return await createProductReview(session.shop, data);

      case "deletereview":
        // Assuming deletereview expects shopDomain for nested schema
        return await deletereview(shopDomain);

      case "updatereview":
        // Assuming updatereview expects shopDomain + payload
        return await updatereview(shopDomain, data);

      default:
        return responseHandler(400, "Invalid path provided 💀", null);
    }
  } catch (error) {
    console.log("Catch error in action:", error);
    return responseHandler(500, "Something went wrong 😵", null);
  }
};
