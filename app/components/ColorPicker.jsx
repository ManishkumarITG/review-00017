import { useColorTheme } from "../routes/ColorContext";
import { Box, Popover, ColorPicker } from "@shopify/polaris";
import { SaveBar } from "@shopify/app-bridge-react";

function ColorPickerCircle({ type }) {
  const {
    updateColor,
    getColorObject,
    getHexCode,
    setIsOpenColorPicker,
    isOpenColorPicker,
    setColors,
    hexToHsba,
    setIsChnage,
  } = useColorTheme();

  const currentColor = getColorObject(type);
  const currentHex = getHexCode(type);

  const popoverId = `popover_${type}`;
  const saveBarId = `save-bar-${type}`;

  const toggleActive = () => {
    setIsOpenColorPicker((activeId) =>
      activeId !== popoverId ? popoverId : null,
    );
  };

  const handleSave = () => {
    console.log(type);
    localStorage.setItem(type, currentHex);
    console.log(`Saving ${type}`);
    shopify.saveBar.hide(saveBarId);
    setIsChnage(false);
  };

  const handleDiscard = () => {
    toggleActive();
    console.log(type);
    const oldColor = localStorage.getItem(type) || "#318C6E";
    const hsbcode = hexToHsba(oldColor);
    console.log(oldColor);
    setColors((prev) => ({
      ...prev,
      [type]: hsbcode,
    }));
    shopify.saveBar.hide(saveBarId);
    setIsChnage(false);
  };

  return (
    <>
      <SaveBar id={saveBarId}>
        <button variant="primary" onClick={handleSave}></button>
        <button onClick={handleDiscard}></button>
      </SaveBar>
      <Popover
        active={isOpenColorPicker === popoverId}
        preferredAlignment="right"
        activator={
          <Box
            className="color-trigger"
            onClick={toggleActive}
            style={{
              background: currentHex,
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
        <ColorPicker
          onChange={(newColor) => updateColor(type, newColor, saveBarId)}
          color={currentColor}
        />
      </Popover>
    </>
  );
}

export default ColorPickerCircle;
