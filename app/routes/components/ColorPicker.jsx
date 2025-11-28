import { useColorTheme } from "../ColorContext";
import { Box, Popover, ColorPicker, hsbToHex } from "@shopify/polaris";
import { useEffect, useState } from "react";

function ColorPickerCircle({ type, hexCodeColor, saveBarId }) {
  const {
    updateColor,
    getColorObject,
    setIsOpenColorPicker,
    isOpenColorPicker,
    setColors,
    hsbaToHex,
    getHexCode,
  } = useColorTheme();

  const [hex, setHexColor] = useState(hexCodeColor);
  const currentColor = getColorObject(type, hex);
  const currentHex = getHexCode(type);

  const popoverId = `popover_${type}`;

  useEffect(() => {
    setColors((prev) => ({
      ...prev,
      [type]: hex,
    }));
  }, []);

  const toggleActive = () => {
    setIsOpenColorPicker((activeId) =>
      activeId !== popoverId ? popoverId : null,
    );
  };

  const handleOnColorChange = (newColor) => {
    setHexColor(currentHex);
    const newHexColor = hsbaToHex(newColor);
    updateColor(type, newHexColor, saveBarId);
  };

  return (
    <>
      <Popover
        active={isOpenColorPicker === popoverId}
        preferredAlignment="right"
        activator={
          <Box
            className="color-trigger"
            onClick={toggleActive}
            style={{
              background: hex,
              height: "48px",
              width: "48px",
              borderRadius: "100%",
              cursor: "pointer",
              border: "2px solid #ddd",
            }}
            aria-label={`Open color picker for ${type}`}
          />
        }
        autofocusTarget="first-node"
        onClose={toggleActive}
      >
        <ColorPicker onChange={handleOnColorChange} color={currentColor} />
      </Popover>
    </>
  );
}

export default ColorPickerCircle;
