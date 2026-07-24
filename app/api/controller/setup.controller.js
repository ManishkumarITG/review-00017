import { getSetupStatus } from "../services/setup.service.js";
import { responseHandler } from "../utils/responseHandler.js";
import STATUS_CODE from "../contents/statusCode.js";
import MESSAGE from "../contents/message.js";

export const getStatus = async (admin, shop) => {
  try {
    const data = await getSetupStatus(admin, shop);
    return responseHandler(STATUS_CODE.OK, MESSAGE.FETCHED, data);
  } catch (error) {
    console.log("setup status error:", error);
    return responseHandler(
      STATUS_CODE.INTERNAL_SERVER_ERROR,
      error.message,
      null,
    );
  }
};
