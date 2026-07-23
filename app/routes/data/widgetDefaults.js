// Single source of truth for every customizable review-widget setting.
// The storefront extension keeps a mirrored copy of these defaults in
// extensions/review-extension/assets/reviewFilter.js (it cannot import app code).
//
// Storage shape (Setting.sectionSettings): arrays of
//   { type, settingName, isvalue, isChecked }
// keyed by `type` for color/layout entries and by `settingName` for theme/text.

export const SETTINGS_TITLE = "Review Widget Setting";

export const DEFAULT_SECTION_SETTINGS = {
  color: [
    { type: "star", settingName: "Star Color", isvalue: "#108474" },
    { type: "text", settingName: "Text Color", isvalue: "#000000" },
    { type: "button", settingName: "Button Color", isvalue: "#108474" },
    {
      type: "buttonTextColor",
      settingName: " Button Text Color",
      isvalue: "#ffffff",
    },
    { type: "emptyStar", settingName: "Empty Star Color", isvalue: "#D6D6D6" },
    { type: "heading", settingName: "Heading Color", isvalue: "#202223" },
    {
      type: "secondaryText",
      settingName: "Secondary Text Color",
      isvalue: "#888888",
    },
    { type: "widgetBg", settingName: "Widget Background", isvalue: "#ffffff" },
    { type: "cardBg", settingName: "Review Card Background", isvalue: "#ffffff" },
    {
      type: "progressTrack",
      settingName: "Progress Track Color",
      isvalue: "#e5e7eb",
    },
    { type: "avatarBg", settingName: "Avatar Background", isvalue: "#cccccc" },
  ],

  theme: [
    { type: "checkbox", settingName: "show date", isChecked: true, isvalue: "" },
    {
      type: "checkbox",
      settingName: "show widget title",
      isChecked: true,
      isvalue: "",
    },
    {
      type: "checkbox",
      settingName: "show average rating",
      isChecked: true,
      isvalue: "",
    },
    {
      type: "checkbox",
      settingName: "show review count",
      isChecked: true,
      isvalue: "",
    },
    {
      type: "checkbox",
      settingName: "show rating breakdown",
      isChecked: true,
      isvalue: "",
    },
    {
      type: "checkbox",
      settingName: "show write review button",
      isChecked: true,
      isvalue: "",
    },
    {
      type: "checkbox",
      settingName: "show sort options",
      isChecked: true,
      isvalue: "",
    },
    {
      type: "checkbox",
      settingName: "show reviewer avatar",
      isChecked: true,
      isvalue: "",
    },
    {
      type: "checkbox",
      settingName: "show reviewer name",
      isChecked: true,
      isvalue: "",
    },
    {
      type: "checkbox",
      settingName: "show card shadow",
      isChecked: true,
      isvalue: "",
    },
  ],

  text: [
    { type: "text", settingName: "Widget title", isvalue: "Customer Reviews" },
    { type: "text", settingName: "Average rating text", isvalue: "4.7" },
    { type: "text", settingName: "Button Text", isvalue: "Write a review" },
    { type: "text", settingName: "Rating suffix text", isvalue: "out of 5" },
    {
      type: "text",
      settingName: "Review count text",
      isvalue: "Based on {count} reviews",
    },
    {
      type: "text",
      settingName: "Empty state text",
      isvalue: "Be the first to write a review",
    },
    { type: "text", settingName: "Load more text", isvalue: "Load More Reviews" },
    {
      type: "ChoiceList",
      settingName: "Show text and stars",
      isvalue: "hidden",
      isChecked: true,
    },
    {
      type: "text",
      settingName: "Screen title",
      isvalue: "How would you rate this product?",
      isChecked: false,
    },
    {
      type: "text",
      settingName: "Introduction",
      isvalue: "We would love it if you would share a bit about your experience.",
      isChecked: false,
    },
    {
      type: "text",
      settingName: "display name",
      isvalue: "Yellow Snowboard",
      isChecked: false,
    },
  ],

  layout: [
    { type: "widgetWidth", settingName: "Widget Width (px)", isvalue: "600" },
    { type: "alignment", settingName: "Content Alignment", isvalue: "center" },
    { type: "starSize", settingName: "Star Size (px)", isvalue: "18" },
    { type: "titleSize", settingName: "Title Size (px)", isvalue: "22" },
    { type: "textSize", settingName: "Text Size (px)", isvalue: "15" },
    {
      type: "buttonRadius",
      settingName: "Button Corner Radius (px)",
      isvalue: "0",
    },
    { type: "buttonWidth", settingName: "Button Width (%)", isvalue: "60" },
    { type: "cardRadius", settingName: "Review Card Radius (px)", isvalue: "12" },
    {
      type: "cardGap",
      settingName: "Space Between Reviews (px)",
      isvalue: "18",
    },
    {
      type: "progressHeight",
      settingName: "Progress Bar Height (px)",
      isvalue: "14",
    },
    {
      type: "progressRadius",
      settingName: "Progress Bar Radius (px)",
      isvalue: "0",
    },
    { type: "reviewsPerPage", settingName: "Reviews Per Page", isvalue: "10" },
  ],
};

// Control metadata for the admin customizer UI (sliders/selects).
export const LAYOUT_CONTROLS = {
  widgetWidth: { control: "range", min: 320, max: 1200, step: 10, suffix: "px" },
  alignment: {
    control: "select",
    options: [
      { label: "Left", value: "left" },
      { label: "Center", value: "center" },
      { label: "Right", value: "right" },
    ],
  },
  starSize: { control: "range", min: 12, max: 36, step: 1, suffix: "px" },
  titleSize: { control: "range", min: 14, max: 40, step: 1, suffix: "px" },
  textSize: { control: "range", min: 12, max: 24, step: 1, suffix: "px" },
  buttonRadius: { control: "range", min: 0, max: 30, step: 1, suffix: "px" },
  buttonWidth: { control: "range", min: 20, max: 100, step: 5, suffix: "%" },
  cardRadius: { control: "range", min: 0, max: 30, step: 1, suffix: "px" },
  cardGap: { control: "range", min: 0, max: 40, step: 2, suffix: "px" },
  progressHeight: { control: "range", min: 6, max: 24, step: 1, suffix: "px" },
  progressRadius: { control: "range", min: 0, max: 12, step: 1, suffix: "px" },
  reviewsPerPage: {
    control: "select",
    options: [
      { label: "5", value: "5" },
      { label: "10", value: "10" },
      { label: "15", value: "15" },
      { label: "20", value: "20" },
    ],
  },
};

const keyOf = (section, entry) =>
  section === "color" || section === "layout" ? entry.type : entry.settingName;

// Merge stored settings over the defaults so shops saved before a new
// setting existed still get every entry (and keep any extra stored ones).
export const mergeSectionSettings = (stored) => {
  const merged = {};
  for (const section of Object.keys(DEFAULT_SECTION_SETTINGS)) {
    const defaults = DEFAULT_SECTION_SETTINGS[section];
    const storedEntries = stored?.[section] || [];
    const storedByKey = new Map(
      storedEntries.map((e) => [keyOf(section, e), e]),
    );
    merged[section] = defaults.map((d) => {
      const found = storedByKey.get(keyOf(section, d));
      if (!found) return { ...d };
      return {
        ...d,
        isvalue:
          found.isvalue !== undefined && found.isvalue !== null && found.isvalue !== ""
            ? String(found.isvalue)
            : d.isvalue,
        isChecked:
          typeof found.isChecked === "boolean" ? found.isChecked : d.isChecked,
      };
    });
    const defaultKeys = new Set(defaults.map((d) => keyOf(section, d)));
    for (const e of storedEntries) {
      if (!defaultKeys.has(keyOf(section, e))) merged[section].push({ ...e });
    }
  }
  return merged;
};

// Flatten merged sectionSettings into quick lookup maps.
export const settingsToMap = (sectionSettings) => {
  const map = { colors: {}, toggles: {}, texts: {}, layout: {} };
  (sectionSettings?.color || []).forEach((c) => {
    map.colors[c.type] = c.isvalue;
  });
  (sectionSettings?.theme || []).forEach((t) => {
    map.toggles[t.settingName] = !!t.isChecked;
  });
  (sectionSettings?.text || []).forEach((t) => {
    map.texts[t.settingName] = t.isvalue;
  });
  (sectionSettings?.layout || []).forEach((l) => {
    map.layout[l.type] = l.isvalue;
  });
  return map;
};
