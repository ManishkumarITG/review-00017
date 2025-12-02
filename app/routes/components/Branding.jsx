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
  Spinner,
  InlineStack,
} from "@shopify/polaris";

import { ThumbsUpIcon } from "@shopify/polaris-icons";
import { useColorTheme } from "../ColorContext";
import ColorPickerCircle from "./ColorPicker";
import { SaveBar } from "@shopify/app-bridge-react";
import StarRating from "./Ratting";

function Branding() {
  const { getHexCode, setting, handleSave, handleDiscard, lodaing } =
    useColorTheme();

  const starColor = getHexCode("star");

  return (
    <AppProvider i18n={{}}>
      <SaveBar id="review_widgets">
        <button
          loading={lodaing}
          variant="primary"
          onClick={() => handleSave("review_widgets", "review_widgets")}
        ></button>
        <button onClick={() => handleDiscard("review_widgets")}></button>
      </SaveBar>
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
                  onClick={() => {}}
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
                  {setting == null ? (
                    <Spinner
                      accessibilityLabel="Spinner example"
                      size="large"
                    />
                  ) : (
                    setting.color.map((color) => {
                      return (
                        color.type == "star" && (
                          <Box key={color._id} padding="200">
                            <InlineStack>
                              <ColorPickerCircle
                                hexCodeColor={color.isvalue}
                                type={color.type}
                                saveBarId="review_widgets"
                              />
                              <Box gap="400">
                                <Text variant="headingMd" as="p">
                                  Primary color
                                </Text>
                                <Text variant="headingsm" as="p">
                                  {getHexCode(color.type)}
                                </Text>
                              </Box>
                            </InlineStack>
                          </Box>
                        )
                      );
                    })
                  )}
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
                      <Badge icon={ThumbsUpIcon} tone="info">
                        Awesome
                      </Badge>
                    </Box>
                  }
                  type="number"
                  disabled
                  placeholder="star (Default)"
                />
                <Text>This will be used in widgets.</Text>

                <StarRating rating={5} color={starColor || "#108474"} />
              </InlineGrid>
            </BlockStack>
          </Card>
        </InlineGrid>
      </Page>
    </AppProvider>
  );
}

export default Branding;
