// src/context/ThemeContext.jsx

import { createContext, useContext, useEffect, useState } from 'react';
 
const ThemeContext = createContext();
 
export const ColorProvider = ({ children }) => {

  const [color, setColor] = useState({
    hue: 120,
    brightness: 0.55625,
    saturation: 0.859375,
    alpha: 1,
  });

  const hsbaToHex = ({ hue, saturation, brightness, alpha }) => {
    let h = hue;
    let s = saturation;
    let b = brightness;

    const i = Math.floor(h / 60);
    const f = h / 60 - i;
    const p = b * (1 - s);
    const q = b * (1 - f * s);
    const t = b * (1 - (1 - f) * s);
    const r = [b, q, p, p, p, t, b][i];
    const g = [t, b, b, q, p, p][i];
    const bChannel = [p, p, t, b, b, q][i];

    const toHex = (x) => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    const hex = `#${toHex(r)}${toHex(g)}${toHex(bChannel)}`;

    if (alpha < 1) {
      const alphaHex = Math.round(alpha * 255).toString(16);
      return `${hex}${alphaHex.length === 1 ? "0" + alphaHex : alphaHex}`.toUpperCase();
    }

    return hex.toUpperCase();
  };

  const [hexCode, setHexCode] = useState(() => hsbaToHex(color));

  return (
    <ThemeContext.Provider value={{ hexCode, color, setColor, setHexCode , hsbaToHex }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useColorTheme = () => useContext(ThemeContext);


