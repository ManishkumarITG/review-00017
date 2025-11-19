import React, { useState, useEffect } from "react";

import {
  Card,
  Page,
  Text,
  AppProvider,
  ColorPicker,
  InlineGrid,
  BlockStack,
  Box,
  InlineStack,
  Badge,
  Divider,
  ButtonGroup,
  Button,
} from "@shopify/polaris";

function Branding() {
  const [isOpenColorPicker, setIsOpenColorPicker] = useState(false);

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

  useEffect(() => {
    setHexCode(hsbaToHex(color));
  }, [color]);

  return (
    <AppProvider i18n={{}}>
      <Page title="Branding" fullWidth={true}>
        <InlineGrid gap="400" columns={1}>
          <Card padding="0">
            <BlockStack style={{ padding: "20px" }} gap="200">
              <InlineGrid columns={2}>
                <Text as="h2" variant="headingSm">
                  Color
                </Text>
                <ButtonGroup>
                  <Button
                    variant="plain"
                    onClick={() => {}}
                    accessibilityLabel="Preview"
                  >
                    Result To Default
                  </Button>
                </ButtonGroup>
              </InlineGrid>
            </BlockStack>

            <Divider />

            <BlockStack
              gap="500"
              style={{ padding: "32px", position: "relative" }}
            >
              <InlineGrid columns={1} gap="100">
                <BlockStack
                  gap="200"
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    gap: "10px",
                  }}
                >
                  <Box
                    style={{
                      background: hexCode,
                      height: "48px",
                      width: "48px",
                      borderRadius: "100%",
                    }}
                    onClick={() => {
                      setIsOpenColorPicker(!isOpenColorPicker);
                      console.log("clicked");
                    }}
                  ></Box>
                  <Box>
                    <Text element="span" variant="headingSm" tone="base">
                      Primary color
                    </Text>

                    <Text variant="headingSm">{hexCode}</Text>
                  </Box>
                </BlockStack>
                <Text>
                  Used for the star color, buttons, links and link buttons on
                  all widgets and emails.
                </Text>
              </InlineGrid>

              {/* Color Picker */}
              <BlockStack style={{ position: "absolute", zIndex: "999" }}>
                {isOpenColorPicker && (
                  <ColorPicker onChange={setColor} color={color} />
                )}
              </BlockStack>
            </BlockStack>
          </Card>
        </InlineGrid>
      </Page>
    </AppProvider>
  );
}

export default Branding;
