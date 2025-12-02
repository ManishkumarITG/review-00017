import shopify from "../../shopify.server";
import {
  create,
  getAll,
  update,
  getByTitle,
} from "../controller/setting.controller";
import { responseHandler } from "../utils/responseHandler.js";

export const loader = async ({ request }) => {
  try {
    console.log(
      "-----------------------------------------------------------hit api",
    );

    const { session } = await shopify.authenticate.admin(request);

    const shopDomain = session.shop;
    console.log("The shop domain is:", shopDomain);

    const url = request.url;
    const path = url.split("/").pop();

    console.log("---------------------------------------", path);

    switch (path) {
      case "getData":
        return await getAll();
    }
  } catch (error) {
    console.log("catch error in test loader :", error);
    return responseHandler(400, "no found", null);
  }
};

export const action = async ({ request }) => {
  try {
    // await mongoConnect();
    console.log(
      "-----------------------------------------------------------hit action  api",
    );

    const { session } = await shopify.authenticate.admin(request);

    console.log("-------------------------------- session", session);

    // The shop domain is available in session.shop
    const shopDomain = session.shop;
    console.log("The shop domain is:", shopDomain);

    const data = await request.json();

    console.log("-------------------------------- request", data);

    const url = request.url;
    const path = url.split("/").pop();

    console.log("---------------------------------------", path, url);

    switch (path) {
      case "create":
        return await create(shopDomain, data);
      case "getByTitle":
        return await getByTitle(shopDomain, data);
      case "updateByTitle":
        return await update(shopDomain, data);
    }
  } catch (error) {
    console.log("catch error in test loader :", error);
    return responseHandler(400, "no found", null);
  }
};
