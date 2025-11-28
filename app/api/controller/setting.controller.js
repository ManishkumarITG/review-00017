import {
  createSetting,
  getAllSettings,
  updateSetting,
  updateSetting,
  deleteSetting,
  getSettingByTitle,
} from "../services/setting.service.js";
import { responseHandler } from "../utils/responseHandler.js";

export const create = async (settingData) => {
  try {
    const data = await createSetting(settingData);
    return responseHandler(200, "ok", data);
  } catch (error) {
    console.log(error);
    return responseHandler(500, "setting get error", null);
  }
};

export const getAll = async (req, res) => {
  try {
    const data = await getAllSettings();
    return responseHandler(200, "ok", data);
  } catch (error) {
    responseHandler(500, "setting get error", null);
  }
};

export const getByTitle = async (name) => {
  try {
    console.log("hello -------------------------- heloos");
    const data = await getSettingByTitle(name);
    if (!data) {
      return responseHandler(500, "setting is not found", null);
    }
    return responseHandler(200, "ok", data);
  } catch (error) {
    return responseHandler(500, "setting get error", null);
  }
};

export const update = async (settingData) => {
  try {
    const data = await updateSetting(settingData);

    return responseHandler(200, "update successful", data);
  } catch (error) {
    return responseHandler(500, error.message, null);
  }
};

export const remove = async (req, res) => {
  try {
    const data = await deleteSetting(req.params.id);

    if (!data)
      return res.status(404).json({ success: false, message: "Not Found" });

    res.status(200).json({ success: true, message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
