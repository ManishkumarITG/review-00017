import React, { useState, useEffect, useCallback } from "react";

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
  TextField,
  Icon,
  Checkbox,
  Link,
  Popover,
} from "@shopify/polaris";

import {
  ChevronRightIcon,
  StarFilledIcon,
  StarIcon,
  ThumbsUpIcon,
} from "@shopify/polaris-icons";

function Branding() {
  const [isOpenColorPicker, setIsOpenColorPicker] = useState(false);

  const [checked, setChecked] = useState(true);
  const handleChange = useCallback((newChecked) => setChecked(newChecked), []);

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

    const i = Math.floor(h / 60)
    const f = h / 60 - i
    const p = b * (1 - s)
    const q = b * (1 - f * s)
    const t = b * (1 - (1 - f) * s)
    const r = [b, q, p, p, p, t, b][i]
    const g = [t, b, b, q, p, p][i]
    const bChannel = [p, p, t, b, b, q][i]

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
            <Box width="100%" padding="400" gap="400">
              <InlineGrid columns={2}>
                <Text as="p" variant="headingLg">
                  Color
                </Text>

                <Button
                  textAlign="end"
                  variant="plain"
                  onClick={() => {}}
                  accessibilityLabel="Preview"
                >
                  Result To Default
                </Button>
              </InlineGrid>
            </Box>

            <Divider />

            <Box gap="500" position="relative" padding="200">
              <InlineGrid columns={1} gap="100">
                <BlockStack
                  gap="200"
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    gap: "10px",
                  }}
                >
                  <Button
                    variant="plain"
                    onClick={() => {
                      setIsOpenColorPicker(!isOpenColorPicker);
                      console.log("clicked");
                    }}
                  >
                    <Box
                      style={{
                        background: hexCode,
                        height: "48px",
                        width: "48px",
                        borderRadius: "100%",
                      }}
                    ></Box>
                  </Button>
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
            </Box>
          </Card>
          {isOpenColorPicker && (
            <Box
              zIndex="20"
              position="absolute"
              insetInlineEnd="3200"
              insetBlockStart="3200"
            >
              <ColorPicker onChange={setColor} color={color} />
            </Box>
          )}

          <Card padding="0">
            <BlockStack style={{ padding: "20px" }} gap="400">
              <Text as="p" variant="headingLg">
                Branding
              </Text>
            </BlockStack>

            <Divider />

            <BlockStack
              gap="500"
              style={{ padding: "32px", position: "relative", width: "100%" }}
            >
              <InlineGrid columns={1} gap="400">
                <TextField
                  label={
                    <Box style={{ display: "flex", gap: "5px" }}>
                      <Text tone="base">Rating icon</Text>{" "}
                      <Badge icon={<Icon source={ThumbsUpIcon} />} tone="info">
                        Awesome
                      </Badge>
                    </Box>
                  }
                  type="number"
                  disabled
                  placeholder="star (Default)"
                />
                <Text>This will be used in widgets.</Text>

                <Box
                  style={{
                    padding: "10px",
                    border: "1px solid #E1E3E5",
                    width: "fit-content",
                    display: "flex",
                    color: hexCode,
                    fontSize: "50px",
                  }}
                >
                  <Icon source={StarFilledIcon} />
                  <Icon source={StarFilledIcon} />
                  <Icon source={StarFilledIcon} />
                  <Icon source={StarFilledIcon} />
                  <Icon source={StarFilledIcon} />
                </Box>

                <Box
                  borderColor="border"
                  borderWidth="025"
                  padding="400"
                  width="100%"
                >
                  <InlineGrid columns={2}>
                    <Box gap="100">
                      {" "}
                      <Text variant="headingMd">Store logo</Text>
                      <Text>Update your logo in Email styling setting</Text>
                    </Box>

                    <Box gap="100" insetInlineStart="200">
                      {" "}
                      <Icon source={ChevronRightIcon} />
                    </Box>
                  </InlineGrid>
                </Box>
              </InlineGrid>
            </BlockStack>
          </Card>

          <Card padding="0">
            <BlockStack style={{ padding: "20px" }} gap="400">
              <InlineGrid columns={1}>
                <Text as="h2" variant="headingLg">
                  Judge.me trust marks (Recommended){" "}
                  <Badge tone="info">Awesome</Badge>
                </Text>
              </InlineGrid>
            </BlockStack>

            <Divider />

            <BlockStack style={{ padding: "20px" }}>
              <InlineGrid columns={1} gap="100">
                <Checkbox
                  disabled
                  label="Show Powered by Judge.me in emails"
                  checked={checked}
                  onChange={handleChange}
                />

                <Checkbox
                  disabled
                  label="Show ‘Verified Checkmark’ in widgets"
                  checked={checked}
                  onChange={handleChange}
                />

                <Text tone="base">
                  <Link url="#">Learn more</Link> about where the Judge.me
                  branding can be removed
                </Text>
              </InlineGrid>
            </BlockStack>
          </Card>
        </InlineGrid>
      </Page>
    </AppProvider>
  );
}

export default Branding;
