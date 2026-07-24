import mongoose, { Schema } from "mongoose";

const innerSettingSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  settingName: {
    type: String,
    required: true,
  },
  isvalue: {
    type: String,
    default: "",
  },
  isChecked: {
    type: Boolean,
    default: false,
  },
});

const sectionSettingsSchema = new Schema(
  {
    color: {
      type: [innerSettingSchema],
      default: [],
    },
    theme: {
      type: [innerSettingSchema],
      default: [],
    },
    text: {
      type: [innerSettingSchema],
      default: [],
    },
    layout: {
      type: [innerSettingSchema],
      default: [],
    },
  },
  { _id: false },
);

const settingSchema = new Schema({
  shop: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },

  sectionSettings: {
    type: sectionSettingsSchema,
    required: true,
  },

  // Set the first time the merchant saves from the widget customizer;
  // used by the dashboard setup guide to verify the "customize" step.
  isCustomized: {
    type: Boolean,
    default: false,
  },
});

const Setting =
  mongoose.models.Setting || mongoose.model("Setting", settingSchema);

export default Setting;
