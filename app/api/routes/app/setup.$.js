import { authenticate } from "../../../shopify.server";
import { getStatus } from "../../controller/setup.controller.js";
import { responseHandler } from "../../utils/responseHandler.js";
import STATUS_CODE from "../../contents/statusCode.js";
import MESSAGE from "../../contents/message.js";

export const loader = async ({ request }) => {
  try {
    // This route needs the admin GraphQL client (theme check), so it
    // authenticates directly instead of via authenticateUser.
    const { admin, session } = await authenticate.admin(request);
    const path = new URL(request.url).pathname.split("/").pop();

    switch (path) {
      case "status":
        return await getStatus(admin, session.shop);
      default:
        return responseHandler(
          STATUS_CODE.BAD_REQUEST,
          MESSAGE.BAD_REQUEST,
          null,
        );
    }
  } catch (error) {
    console.log("catch error in setup loader:", error);
    return responseHandler(STATUS_CODE.BAD_REQUEST, MESSAGE.BAD_REQUEST, null);
  }
};
