import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

const DEFAULT_HSBA = {
  hue: 160,
  saturation: 0.65,
  brightness: 0.55,
  alpha: 1,
};

export const ColorProvider = ({ children }) => {
  const [isOpenColorPicker, setIsOpenColorPicker] = useState(null);

  const [colors, setColors] = useState({});

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

  const updateColor = (type, newColor) => {
    setColors((prev) => ({
      ...prev,
      [type]: newColor,
    }));

    if (typeof shopify !== "undefined" && shopify.saveBar) {
      shopify.saveBar.show("my-save-bar");
    }
  };

  const getHexCode = (type) => {
    if (!colors[type]) {
      if (typeof window !== "undefined") {
        const saved = window.localStorage.getItem(type);
        if (saved) return saved;
      }
      return hsbaToHex(DEFAULT_HSBA);
    }
    return hsbaToHex(colors[type]);
  };

  const getColorObject = (type) => {
    if (colors[type]) return colors[type];

    if (typeof window !== "undefined") {
      const savedHex = window.localStorage.getItem(type);
      if (savedHex) return hexToHsba(savedHex);
    }
    return DEFAULT_HSBA;
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
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useColorTheme = () => useContext(ThemeContext);
