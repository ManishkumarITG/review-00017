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
  },
  { _id: false },
);

const settingSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },

  sectionSettings: {
    type: sectionSettingsSchema,
    required: true,
  },
});

const Setting =
  mongoose.models.Setting || mongoose.model("Setting", settingSchema);

export default Setting;
