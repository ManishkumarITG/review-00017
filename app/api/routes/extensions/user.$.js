import {
  createUser,
  deleteUser,
  updateUser,
  getUser,
  getAllUsers,
} from "../../controller/user.controller.js";

import { authenticateUser } from "../../middlewares/auth.js";
import { responseHandler } from "../../utils/responseHandler.js";
import STATUS_CODE from "../../contents/statusCode.js";
import MESSAGE from "../../contents/message.js";

// --------------------- LOADER ---------------------
export const loader = async ({ request }) => {
  try {
    const { status, shop, message, path } = await authenticateUser(request);

    if (!status) {
      throw new Error(message);
    }

    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 1;
    const limit = Number(url.searchParams.get("limit")) || 10;
    const skip = url.searchParams.get("skip");
    const skipValue = skip !== null ? Number(skip) : undefined;
    const userId = url.searchParams.get("userId") || null;

    switch (path) {
      case "getAllUsers":
        return await getAllUsers({
          limit,
          page,
          skipValue,
          shop,
        });

      case "getUser":
        return await getUser({
          userId,
          shop,
        });

      default:
        return responseHandler(
          STATUS_CODE.BAD_REQUEST,
          MESSAGE.BAD_REQUEST,
          null,
        );
    }
  } catch (error) {
    console.log("User loader error:", error);
    return responseHandler(400, "not found", null);
  }
};

// --------------------- ACTION ---------------------
export const action = async ({ request }) => {
  try {
    const data = await request.json();
    const { path, shop } = await authenticateUser(request);

    switch (path) {
      case "createUser":
        return await createUser(shop, data);

      case "deleteUser":
        return await deleteUser(data);

      case "updateUser":
        return await updateUser(shop, data);

      default:
        return responseHandler(
          STATUS_CODE.BAD_REQUEST,
          MESSAGE.BAD_REQUEST,
          null,
        );
    }
  } catch (error) {
    console.log("User action error:", error);
    return responseHandler(400, "not found", null);
  }
};
