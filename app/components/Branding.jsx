import React, { useState, useCallback } from "react";

import {
  Card,
  Page,
  Text,
  AppProvider,
  InlineGrid,
  BlockStack,
  Box,
  Badge,
  Divider,
  Button,
  TextField,
  Icon,
  Checkbox,
  Link,
} from "@shopify/polaris";

import {
  ChevronRightIcon,
  StarFilledIcon,
  ThumbsUpIcon,
} from "@shopify/polaris-icons";
import { useColorTheme } from "../routes/ColorContext";
import ColorPickerCircle from "./ColorPicker";

function Branding() {
  const { getHexCode } = useColorTheme();

  const starColor = getHexCode("star");

  const [checked, setChecked] = useState(true);
  const handleChange = useCallback((newChecked) => {
    setChecked(newChecked);
  }, []);

  return (
    <AppProvider i18n={{}}>
      <Page title="Branding" fullWidth={true}>
        <InlineGrid gap="400" columns={1}>
          {/* ---------- Color Card ---------- */}
          <Card padding="0">
            <Box width="100%" padding="400" gap="400">
              <InlineGrid columns={2}>
                <Text as="p" variant="headingLg">
                  Color
                </Text>

                <Button
                  textAlign="end"
                  variant="plain"
                  onClick={() => { }}
                  accessibilityLabel="Preview"
                >
                  Reset To Default
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
                  <ColorPickerCircle type="star" />
                  <Box>
                    <Text element="span" variant="headingSm" tone="base">
                      Primary color
                    </Text>

                    <Text variant="headingSm">{starColor}</Text>
                  </Box>
                </BlockStack>
                <Text>
                  Used for the star color, buttons, links and link buttons on
                  all widgets and emails.
                </Text>
              </InlineGrid>
            </Box>
          </Card>

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
                      <Text tone="base">Rating icon</Text>
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
                    color: starColor || "#108474",
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
                      <Text variant="headingMd">Store logo</Text>
                      <Text>Update your logo in Email styling setting</Text>
                    </Box>

                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    >
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
                  label="Show Verified Checkmark in widgets"
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
