// Single source of truth for every customizable review-widget setting.
// The storefront extension keeps a mirrored copy of these defaults in
// extensions/review-extension/assets/reviewFilter.js (it cannot import app code).
//
// Storage shape (Setting.sectionSettings): arrays of
//   { type, settingName, isvalue, isChecked }
// keyed by `type` for color/layout entries and by `settingName` for theme/text.

export const SETTINGS_TITLE = "Review Widget Setting";

// Star SVG designs — the single source of truth for every star rendered in
// the admin (Ratting.jsx) . The storefront mirror lives in
// extensions/review-extension/assets/starDesigns.js; keep the two in sync.
// "rounded" is the app's original design and the default everywhere.
export const STAR_DESIGNS = {
  rounded: {
    label: "Rounded (default)",
    filled: {
      d: "M15.791,19.5,10.262,16.6,4.732,19.5a.75.75,0,0,1-1.088-.79L4.7,12.557.228,8.2a.75.75,0,0,1,.415-1.28l6.182-.9L9.589.419a.75.75,0,0,1,1.345,0l2.764,5.6,6.182.9A.751.751,0,0,1,20.3,8.2l-4.473,4.36,1.056,6.157a.748.748,0,0,1-1.088.79Z",
      transform: "translate(1.739 1.25)",
    },
    empty: {
      d: "M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z",
      strokeWidth: 1.5,
    },
  },
  pointed: {
    label: "Pointed",
    filled: {
      d: "M12 2L15 9H22L17 14L19 22L12 18L5 22L7 14L2 9H9L12 2Z",
    },
    empty: {
      d: "M12 2L15 9H22L17 14L19 22L12 18L5 22L7 14L2 9H9L12 2Z",
      strokeWidth: 1.5,
    },
  },
  classic: {
    label: "Classic",
    filled: {
      d: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
    },
    empty: {
      d: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
      strokeWidth: 1.5,
    },
  },
};

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
    { type: "starStyle", settingName: "Star Design", isvalue: "rounded" },
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
  starStyle: {
    control: "select",
    options: Object.entries(STAR_DESIGNS).map(([value, d]) => ({
      label: d.label,
      value,
    })),
  },
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
