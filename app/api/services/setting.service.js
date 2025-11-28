import Setting from "../models/setting.model.js";

// Create Setting
export const createSetting = async (data) => {
  const saved = await Setting.create(data);
  console.log("----------------------------------", saved);
  return saved.toObject();
};

// Get All Settings
export const getAllSettings = async () => {
  return await Setting.find();
};

// Get Setting by ID
export const getSettingByTitle = async (name) => {
  console.log("-------------------- name", name);
  return await Setting.findOne(name);
};

// Update Setting
export const updateSetting = async (settingData) => {
  const { title } = settingData;
  console.log("---------------------- hello", title, settingData);
  const updated = await Setting.findOneAndUpdate(
    { title: title },
    settingData,
    {
      new: true,
    },
  );

  if (!updated) {
    throw new Error("Setting not found");
  }

  return updated.toObject();
};

// Delete Setting
export const deleteSetting = async (id) => {
  return await Setting.findByIdAndDelete(id);
};
