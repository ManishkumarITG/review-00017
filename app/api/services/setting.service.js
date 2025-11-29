import Setting from "../models/setting.model.js";

// Create Setting
export const createSetting = async (shopDomain, data) => {
  const isShop = await Setting.exists({ shop: shopDomain });
  if (isShop) {
    throw new Error("shop is all rady exsit");
  }

  data.shop = shopDomain;
  const saved = await Setting.create(data);
  console.log("----------------------------------", saved);
  return saved.toObject();
};

// Get All Settings
export const getAllSettings = async () => {
  return await Setting.find();
};

// Get Setting by ID
export const getSettingByTitle = async (shopDomain, name) => {
  const { title } = name;
  console.log(title, shopDomain);
  return await Setting.findOne({ shop: shopDomain, title: title });
};

// Update Setting
export const updateSetting = async (shopDomain, settingData) => {
  const { title } = settingData;
  settingData.shop = shopDomain;
  console.log(settingData);
  console.log("---------------------- hello", title, settingData);
  const updated = await Setting.findOneAndUpdate(
    { shop: shopDomain },
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

// // Delete Setting
// export const deleteSetting = async (id) => {
//   return await Setting.findByIdAndDelete(id);
// };
