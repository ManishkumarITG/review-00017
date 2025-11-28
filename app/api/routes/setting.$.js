import {
  create,
  getAll,
  update,
  getByTitle,
} from "../controller/setting.controller";
import { responseHandler } from "../utils/responseHandler.js";
import mongoConnect from "../../db.server";

export const loader = async ({ request }) => {
  try {
    console.log(
      "-----------------------------------------------------------hit api",
    );

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
    await mongoConnect();
    console.log(
      "-----------------------------------------------------------hit action  api",
    );

    const data = await request.json();

    console.log("-------------------------------- request", data);

    const url = request.url;
    const path = url.split("/").pop();

    console.log("---------------------------------------", path, url);

    switch (path) {
      case "create":
        return await create(data);
      case "getByTitle":
        return await getByTitle(data);
      case "updateByTitle":
        return await update(data);
    }
  } catch (error) {
    console.log("catch error in test loader :", error);
    return responseHandler(400, "no found", null);
  }
};
