import {
    createUserController,
    deleteUserController,
    updateUserController,
    getUserController,
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
          const userId = url.searchParams.get("userId") || null;

      switch (path) {
        case "getUser":
                  return await getUserController(userId);

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
          const { path } = await authenticateUser(request);

      switch (path) {
        case "createUser":
                  return await createUserController(data);

        case "deleteUser":
                  return await deleteUserController(data?.customerId);

        case "updateUser":
                  return await updateUserController(data?.customerId, data);

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
