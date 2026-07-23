import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { createSettings, getColorSetting } from "./services/api.js";
import {
  DEFAULT_SECTION_SETTINGS,
  SETTINGS_TITLE,
  mergeSectionSettings,
  settingsToMap,
} from "./data/widgetDefaults.js";

const ThemeContext = createContext();

const DEFAULT_HSBA = {
  hue: 160,
  saturation: 0.65,
  brightness: 0.55,
  alpha: 1,
};

const defaultMap = settingsToMap(DEFAULT_SECTION_SETTINGS);

// Text fields state (keyed by settingName) seeded from the defaults module.
const initialState = { ...defaultMap.texts };

function reducer(state, action) {
  return {
    ...state,
    [action.field]: action.value,
  };
}

export const ColorProvider = ({ children }) => {
  const [isOpenColorPicker, setIsOpenColorPicker] = useState(null);
  const [isChange, setIsChnage] = useState(false);
  const [setting, setSetting] = useState(null);
  const [lodaing, setLodaing] = useState(null);
  const [dateChecked, setDateChecked] = useState(
    defaultMap.toggles["show date"],
  );
  const [state, dispatch] = useReducer(reducer, initialState);
  const [shop, setShop] = useState("");
  const [active, setActive] = useState(null);
  const [btnText, setBtnText] = useState("Sempal Data");
  const [getData, setGetData] = useState(false);
  const [checkStar, setCheckStar] = useState(true);

  // Colors keyed by type (star, text, button, ...), values are hex strings.
  const [colors, setColors] = useState({ ...defaultMap.colors });
  // Visibility toggles keyed by settingName ("show date", "show avatar", ...).
  const [toggles, setToggles] = useState({ ...defaultMap.toggles });
  // Layout values keyed by type (widgetWidth, alignment, starSize, ...).
  const [layout, setLayout] = useState({ ...defaultMap.layout });

  const toggleActive = (id) => () => {
    setActive((activeId) => (activeId !== id ? id : null));
  };

  function hsbaToHex({ hue, saturation, brightness, alpha }) {
    const h = hue % 360;
    const s = saturation;
    const v = brightness;
    const c = v * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = v - c;
    let r1 = 0,
      g1 = 0,
      b1 = 0;
    if (h >= 0 && h < 60) {
      r1 = c;
      g1 = x;
      b1 = 0;
    } else if (h < 120) {
      r1 = x;
      g1 = c;
      b1 = 0;
    } else if (h < 180) {
      r1 = 0;
      g1 = c;
      b1 = x;
    } else if (h < 240) {
      r1 = 0;
      g1 = x;
      b1 = c;
    } else if (h < 300) {
      r1 = x;
      g1 = 0;
      b1 = c;
    } else {
      r1 = c;
      g1 = 0;
      b1 = x;
    }
    const r = Math.round((r1 + m) * 255);
    const g = Math.round((g1 + m) * 255);
    const b = Math.round((b1 + m) * 255);
    const toHex = (v) => {
      const h = v.toString(16);
      return h.length === 1 ? "0" + h : h;
    };
    let hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
    if (typeof alpha === "number" && alpha < 1) {
      const a = Math.round(alpha * 255);
      hex += toHex(a).toUpperCase();
    }
    return hex;
  }

  function hexToHsba(hex) {
    if (!hex) return DEFAULT_HSBA;
    let cleaned = hex.replace("#", "");
    if (cleaned.length === 3)
      cleaned = cleaned
        .split("")
        .map((c) => c + c)
        .join("");
    const r = parseInt(cleaned.substring(0, 2), 16);
    const g = parseInt(cleaned.substring(2, 4), 16);
    const b = parseInt(cleaned.substring(4, 6), 16);
    const a =
      cleaned.length === 8 ? parseInt(cleaned.substring(6, 8), 16) / 255 : 1;
    const rf = r / 255;
    const gf = g / 255;
    const bf = b / 255;
    const max = Math.max(rf, gf, bf);
    const min = Math.min(rf, gf, bf);
    const delta = max - min;
    let h = 0;
    if (delta === 0) h = 0;
    else if (max === rf) h = 60 * (((gf - bf) / delta) % 6);
    else if (max === gf) h = 60 * ((bf - rf) / delta + 2);
    else h = 60 * ((rf - gf) / delta + 4);
    if (h < 0) h += 360;
    const s = max === 0 ? 0 : delta / max;
    const v = max;
    return {
      hue: Math.round(h),
      saturation: Number(s.toFixed(6)),
      brightness: Number(v.toFixed(6)),
      alpha: Number(a.toFixed(3)),
    };
  }

  // The save bar for the page currently editing settings. The dirty-check
  // effect below owns showing/hiding it by comparing state against `setting`.
  const [activeSaveBarId, setActiveSaveBarId] = useState(null);

  const markDirty = (saveBarId) => {
    if (saveBarId) setActiveSaveBarId(saveBarId);
  };

  const updateColor = (type, newColor, saveBarId) => {
    setColors((prev) => ({
      ...prev,
      [type]: newColor,
    }));
    markDirty(saveBarId);
  };

  const updateToggle = (settingName, checked, saveBarId) => {
    setToggles((prev) => ({
      ...prev,
      [settingName]: checked,
    }));
    if (settingName === "show date") setDateChecked(checked);
    markDirty(saveBarId);
  };

  const updateLayout = (type, value, saveBarId) => {
    setLayout((prev) => ({
      ...prev,
      [type]: String(value),
    }));
    markDirty(saveBarId);
  };

  const updateText = (field, value, saveBarId) => {
    dispatch({ field, value });
    markDirty(saveBarId);
  };

  const getHexCode = (type) => {
    if (!colors[type]) {
      return defaultMap.colors[type] || hsbaToHex(DEFAULT_HSBA);
    }
    return colors[type];
  };

  const getColorObject = (type, hexcode) => {
    if (colors[type]) return hexToHsba(colors[type]);
    if (hexcode) return hexToHsba(hexcode);
    return DEFAULT_HSBA;
  };

  // Build the full sectionSettings payload from the defaults skeleton and
  // the current UI state, so every section is always saved complete.
  const buildSectionSettings = () => ({
    color: DEFAULT_SECTION_SETTINGS.color.map((d) => ({
      ...d,
      isvalue: colors[d.type] || d.isvalue,
    })),
    theme: DEFAULT_SECTION_SETTINGS.theme.map((d) => ({
      ...d,
      isChecked:
        typeof toggles[d.settingName] === "boolean"
          ? toggles[d.settingName]
          : d.isChecked,
    })),
    text: DEFAULT_SECTION_SETTINGS.text.map((d) => {
      if (d.settingName === "Show text and stars") {
        return { ...d, isChecked: checkStar };
      }
      return {
        ...d,
        isvalue:
          state[d.settingName] !== undefined && state[d.settingName] !== null
            ? String(state[d.settingName])
            : d.isvalue,
      };
    }),
    layout: DEFAULT_SECTION_SETTINGS.layout.map((d) => ({
      ...d,
      isvalue: layout[d.type] !== undefined ? String(layout[d.type]) : d.isvalue,
    })),
  });

  const handleSave = async (islodaing, savBarId) => {
    try {
      setLodaing(islodaing);
      setIsChnage(true);
      const res = await fetch("/api/routes/app/setting/updateByTitle", {
        method: "POST",
        body: JSON.stringify({
          title: SETTINGS_TITLE,
          sectionSettings: buildSectionSettings(),
        }),
      });

      const resData = await res.json();
      console.log("setting saved", resData);
      shopify.saveBar.hide(savBarId);
    } catch (error) {
      console.log(error);
    } finally {
      setLodaing(null);
      setIsChnage(false);
      setGetData((p) => !p);
    }
  };

  // Push a merged sectionSettings object into every piece of UI state.
  const applySettingsToState = (merged) => {
    const map = settingsToMap(merged);

    setColors({ ...defaultMap.colors, ...map.colors });
    setToggles({ ...defaultMap.toggles, ...map.toggles });
    setLayout({ ...defaultMap.layout, ...map.layout });
    setDateChecked(
      typeof map.toggles["show date"] === "boolean"
        ? map.toggles["show date"]
        : defaultMap.toggles["show date"],
    );

    merged.text?.forEach((text) => {
      if (text.settingName === "Show text and stars") {
        setCheckStar(!!text.isChecked);
      } else {
        dispatch({
          field: text.settingName,
          value: text.isvalue,
        });
      }
    });
  };

  const handleDiscard = (saveBarId) => {
    if (setting) applySettingsToState(setting);
    shopify.saveBar.hide(saveBarId);
    setIsChnage(false);
  };

  // Show the save bar only while the current state actually differs from the
  // saved settings; hide it again (without resetting anything) when every
  // value is back to its saved state.
  useEffect(() => {
    if (!setting || !activeSaveBarId) return;

    const current = settingsToMap(buildSectionSettings());
    const saved = settingsToMap(setting);

    const mapsEqual = (a, b) =>
      Object.keys(a).every((k) => String(a[k]) === String(b[k]));

    const isDirty = !(
      mapsEqual(current.colors, saved.colors) &&
      mapsEqual(current.toggles, saved.toggles) &&
      mapsEqual(current.texts, saved.texts) &&
      mapsEqual(current.layout, saved.layout)
    );

    if (isDirty) {
      shopify.saveBar.show(activeSaveBarId);
      setIsChnage(true);
    } else {
      shopify.saveBar.hide(activeSaveBarId);
      setIsChnage(false);
    }
  }, [colors, toggles, layout, state, checkStar, setting, activeSaveBarId]);

  useEffect(() => {
    async function setColorData() {
      const createSetting = await createSettings();

      console.log(createSetting);

      const colorSettingData = await getColorSetting();

      console.log("new setttings", colorSettingData);

      if (!colorSettingData?.data) return;

      const merged = mergeSectionSettings(
        colorSettingData.data.sectionSettings,
      );
      const newShop = colorSettingData.data.shop;

      setShop(newShop);
      setSetting(merged);
      applySettingsToState(merged);
    }
    setColorData();
  }, [getData]);

  // If the user manually reverts a control back to its saved value, treat it
  // as a discard so the save bar hides again.
  const handleCheckeState = (arr, id, newValue, saveBarId) => {
    if (!arr) return false;
    const element = arr.find((e) => e.settingName == id);
    if (!element) return false;

    const savedValue =
      element.type === "checkbox" || element.type === "ChoiceList"
        ? element.isChecked
        : element.isvalue;

    if (savedValue == newValue) {
      handleDiscard(saveBarId);
      return true;
    }
    return false;
  };

  const value = {
    colors,
    updateColor,
    getHexCode,
    getColorObject,
    hsbaToHex,
    hexToHsba,
    isOpenColorPicker,
    setIsOpenColorPicker,
    setColors,
    isChange,
    setIsChnage,
    setting,
    setSetting,
    handleSave,
    dateChecked,
    setDateChecked,
    toggles,
    updateToggle,
    layout,
    updateLayout,
    updateText,
    state,
    dispatch,
    handleDiscard,
    lodaing,
    shop,
    toggleActive,
    active,
    setActive,
    btnText,
    setBtnText,
    initialState,
    handleCheckeState,
    checkStar,
    setCheckStar,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useColorTheme = () => useContext(ThemeContext);
