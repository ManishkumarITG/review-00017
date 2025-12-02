import {
  createSetting,
  getAllSettings,
  updateSetting,
  updateSetting,
  getSettingByTitle,
} from "../services/setting.service.js";
import { responseHandler } from "../utils/responseHandler.js";
import STATUS_CODE from "../contents/statusCode.js";
import MESSAGE from "../contents/message.js";

export const create = async (shopDomain, settingData) => {
  try {
    const data = await createSetting(shopDomain, settingData);
    return responseHandler(STATUS_CODE.CREATED, MESSAGE, data);
  } catch (error) {
    console.log(error);
    return responseHandler(
      STATUS_CODE.INTERNAL_SERVER_ERROR,
      error.message,
      null,
    );
  }
};

export const getAll = async () => {
  try {
    const data = await getAllSettings();
    console.log(data);
    return responseHandler(STATUS_CODE.OK, "ok", data);
  } catch (error) {
    responseHandler(
      STATUS_CODE.INTERNAL_SERVER_ERROR,
      "setting get error",
      null,
    );
  }
};

export const getByTitle = async (shopDomain, name) => {
  try {
    const data = await getSettingByTitle(shopDomain, name);
    if (!data) {
      console.log("not found", data);
      return responseHandler(
        STATUS_CODE.NOT_FOUND,
        "setting is not found",
        null,
      );
    }
    return responseHandler(STATUS_CODE.OK, "ok", data);
  } catch (error) {
    return responseHandler(
      STATUS_CODE.INTERNAL_SERVER_ERROR,
      "setting get error",
      null,
    );
  }
};

export const update = async (shopDomain, settingData) => {
  try {
    console.log(
      "-------------------------------- data",
      shopDomain,
      settingData,
    );
    const data = await updateSetting(shopDomain, settingData);

    return responseHandler(STATUS_CODE.OK, "update successful", data);
  } catch (error) {
    return responseHandler(
      STATUS_CODE.INTERNAL_SERVER_ERROR,
      error.message,
      null,
    );
  }
};

// export const remove = async (req, res) => {
//   try {
//     const data = await deleteSetting(req.params.id);

//     if (!data)
//       return res.status(404).json({ success: false, message: "Not Found" });

//     res.status(200).json({ success: true, message: "Deleted Successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
