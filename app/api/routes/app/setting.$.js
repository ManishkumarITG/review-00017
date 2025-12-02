import {
  create,
  getAll,
  update,
  getByTitle,
} from "../../controller/setting.controller.js";
import { responseHandler } from "../../utils/responseHandler.js";
import { authenticateUser } from "../../middlewares/auth";

export const loader = async ({ request }) => {
  try {
    console.log(
      "-----------------------------------------------------------hit api",
    );

    switch (path) {
      case "getData":
        return await getAll();
      default:
        return responseHandler(400, "no matech path", null);
    }
  } catch (error) {
    console.log("catch error in app setting loader :", error);
    return responseHandler(400, "no found", error.message);
  }
};

export const action = async ({ request }) => {
  try {
    // await mongoConnect();
    console.log(
      "-----------------------------------------------------------hit action  api",
    );

    const { status, shop, session, path, message, httpCode } =
      await authenticateUser(request);

    if (!status) {
      throw new Error(message);
    }

    const data = await request.json();
    const shopDomain = shop;

    switch (path) {
      case "create":
        return await create(shopDomain, data);
      case "getByTitle":
        return await getByTitle(shopDomain, data);
      case "updateByTitle":
        return await update(shopDomain, data);
      default:
        return responseHandler(400, "no matech path", null);
    }
  } catch (error) {
    console.log("catch error in app setting loader:", error);
    return responseHandler(400, "no found", null);
  }
};
