import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { createSettings, getColorSetting } from "./services/api.js";

const ThemeContext = createContext();

const DEFAULT_HSBA = {
  hue: 160,
  saturation: 0.65,
  brightness: 0.55,
  alpha: 1,
};

const initialState = {
  "Widget title": "Costomer review",
  "Average rating text": 4.07,
  "Button Text": "Write a review",
  "Show text and stars": true,
  "Screen title": "How would you rate this product?",
  Introduction:
    "We would love it if you would share a bit about your experience.",
  "display name": "Yellow Snowboard",
};

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
  const [dateChecked, setDateChecked] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [shop, setShop] = useState("");
  const [active, setActive] = useState(null);
  const [btnText, setBtnText] = useState("Sempal Data");

  const [colors, setColors] = useState({});

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

  const updateColor = (type, newColor, saveBarId) => {
    setColors((prev) => ({
      ...prev,
      [type]: newColor,
    }));
    if (saveBarId) {
      shopify.saveBar.show(saveBarId);
      setIsChnage(true);
    }
  };

  const getHexCode = (type) => {
    if (!colors[type]) {
      return hsbaToHex(DEFAULT_HSBA);
    }
    return colors[type];
  };

  const getColorObject = (type, hexcode) => {
    if (colors[type]) return hexToHsba(colors[type]);
    if (hexcode) return hexToHsba(hexcode);
    return DEFAULT_HSBA;
  };

  const handleSave = async (islodaing, savBarId) => {
    try {
      setLodaing(islodaing);
      setIsChnage(true);
      const res = await fetch("/api/routes/app/setting/updateByTitle", {
        method: "POST",
        body: JSON.stringify({
          title: "Review Widget Setting",
          sectionSettings: {
            color: [
              {
                type: "star",
                settingName: "Star Color",
                isvalue: colors.star,
              },
              {
                type: "text",
                settingName: "Text Color",
                isvalue: colors.text,
              },
              {
                type: "button",
                settingName: "Button Color",
                isvalue: colors.button,
              },
              {
                type: "buttonTextColor",
                settingName: " Button Text Color",
                isvalue: colors.buttonTextColor,
              },
            ],
            theme: [
              {
                type: "checkbox",
                settingName: "show date",
                isChecked: dateChecked,
                isvalue: "",
              },
            ],
            text: [
              {
                type: "text",
                settingName: "Widget title",
                isvalue: state["Widget title"],
              },
              {
                type: "text",
                settingName: "Average rating text",
                isvalue: state["Average rating text"],
              },
              {
                type: "text",
                settingName: "Button Text",
                isvalue: state["Button Text"],
              },
              {
                type: "ChoiceList",
                settingName: "Show text and stars",
                isvalue: "hidden",
                isChecked: state["Show text and stars"],
              },
              {
                type: "text",
                settingName: "Screen title",
                isvalue: state["Screen title"],
                isChecked: false,
              },
              {
                type: "text",
                settingName: "Introduction",
                isvalue: state["Introduction"],
                isChecked: false,
              },
              {
                type: "text",
                settingName: "display name",
                isvalue: state["display name"],
                isChecked: false,
              },
            ],
          },
        }),
      });

      const resData = await res.json();
      console.log("hello world", resData);
      shopify.saveBar.hide(savBarId);
    } catch (error) {
      console.log(error);
    } finally {
      setLodaing(null);
      setIsChnage(false);
    }
  };

  const handleDiscard = (saveBarId) => {
    setDateChecked(setting.theme[0].isChecked);
    setting.text.forEach((text) => {
      dispatch({
        field: text.settingName,
        value: text.isvalue,
      });
    });
    setting.color.forEach((color) => {
      updateColor(color.type, color.isvalue, null);
    });

    shopify.saveBar.hide(saveBarId);
    setIsChnage(false);
  };

  useEffect(() => {
    async function setColorData() {
      const createSetting = await createSettings();

      console.log(createSetting);

      const colorSettingData = await getColorSetting();

      console.log("new setttings", colorSettingData);

      const settigngObj = colorSettingData.data.sectionSettings;
      const newShop = colorSettingData.data.shop;

      setShop(newShop);
      setSetting(settigngObj);

      // add color
      settigngObj.color.forEach((color) => {
        updateColor(color.type, color.isvalue, null);
      });

      setDateChecked(settigngObj?.theme[0]?.isChecked);
      // add text in state
      settigngObj.text?.forEach((text) => {
        if (text.type == "ChoiceList") {
          initialState[text.settingName] = text.isChecked;
        } else {
          initialState[text.settingName] = text.isvalue;
        }
      });
    }
    setColorData();
  }, []);

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
    initialState,
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
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useColorTheme = () => useContext(ThemeContext);
