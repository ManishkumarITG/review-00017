// import { useColorTheme } from "../routes/ColorContext";
// import { Box, Popover, ColorPicker } from "@shopify/polaris";
// import { SaveBar } from "@shopify/app-bridge-react";

// function ColorPickerCircle() {
//   const {
//     hexCode,
//     color,
//     setColor,
//     setIsOpenColorPicker,
//     isOpenColorPicker,
//     setHexCode,
//   } = useColorTheme();
//   const toggleActive = (id) => () => {
//     setIsOpenColorPicker((activeId) => (activeId !== id ? id : null));
//   };

//   const handleSave = () => {
//     localStorage.setItem("color", hexCode);
//     toggleActive("popover");
//     console.log("Saving");
//     shopify.saveBar.hide("my-save-bar");
//   };

//   const handleDiscard = () => {
//     const savedColor = localStorage.getItem("color") || "#ffffff";
//     setHexCode(savedColor);
//     toggleActive("popover");
//     shopify.saveBar.hide("my-save-bar");
//   };

//   return (
//     <>
//       <SaveBar id="my-save-bar">
//         <button variant="primary" onClick={handleSave}></button>
//         <button onClick={handleDiscard}></button>
//       </SaveBar>
//       <Popover
//         active={isOpenColorPicker == "popover"}
//         preferredAlignment="right"
//         activator={
//           <Box
//             className="color-trigger"
//             onClick={toggleActive("popover")}
//             style={{
//               background: hexCode || "#108474",
//               height: "48px",
//               width: "48px",
//               borderRadius: "100%",
//               cursor: "pointer",
//               border: "2px solid #ddd",
//             }}
//             aria-label="Open color picker"
//           />
//         }
//         autofocusTarget="first-node"
//         onClose={toggleActive("popover")}
//       >
//         <ColorPicker onChange={setColor} color={color} />
//       </Popover>
//     </>
//   );
// }

// export default ColorPickerCircle;

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
  } = useColorTheme();

  const currentColor = getColorObject(type);
  const currentHex = getHexCode(type);

  const popoverId = `popover_${type}`;

  const toggleActive = () => {
    setIsOpenColorPicker((activeId) =>
      activeId !== popoverId ? popoverId : null,
    );
  };

  const handleSave = () => {
    localStorage.setItem(type, currentHex);

    toggleActive();
    console.log(`Saving ${type}`);
    if (typeof shopify !== "undefined") shopify.saveBar.hide("my-save-bar");
  };

  const handleDiscard = () => {
    toggleActive();
    if (typeof shopify !== "undefined") shopify.saveBar.hide("my-save-bar");
    window.location.reload();
  };

  return (
    <>
      <SaveBar id="my-save-bar">
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
          onChange={(newColor) => updateColor(type, newColor)}
          color={currentColor}
        />
      </Popover>
    </>
  );
}

export default ColorPickerCircle;
