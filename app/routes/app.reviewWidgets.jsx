import {
  Page,
  Card,
  AppProvider,
  InlineGrid,
  Box,
  Text,
  InlineStack,
  BlockStack,
  Button,
  Popover,
  ActionList,
  Avatar,
  Divider,
  Checkbox,
} from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import Ratting from "../components/Ratting.jsx";
import { useColorTheme } from "./ColorContext";
import { useCallback, useState } from "react";
import { ChevronDownIcon } from "@shopify/polaris-icons";
import CustomProgressBar from "../components/CustomProgressBar.jsx";
import { reviews } from "../data/reviewData.js";
import ColorPickerCircle from "../components/ColorPicker.jsx";

export default function ReviewWidgets() {
  const { getHexCode } = useColorTheme();

  const starColor = getHexCode("star");
  const textColor = getHexCode("text");
  const buttonColor = getHexCode("button");
  const buttonTextColor = getHexCode("buttonTextColor");
  const rattingArray = [
    { rating: 5, pepole: 8 },
    { rating: 4, pepole: 3 },
    { rating: 3, pepole: 1 },
    { rating: 2, pepole: 3 },
    { rating: 1, pepole: 0 },
  ];

  const [active, setActive] = useState(null);
  const [dateChecked, setDateChecked] = useState(false);
  const handleChange = useCallback(
    (newChecked) => setDateChecked(newChecked),
    [],
  );

  const toggleActive = (id) => () => {
    setActive((activeId) => (activeId !== id ? id : null));
  };

  return (
    <AppProvider>
      <Page
        backAction={{ content: "Products", url: "/app/mySettingPage" }}
        title="Review Widget"
        primaryAction={{ content: "Sample data" }}
        secondaryActions={[{ content: "Previewing" }]}
      >
        <Card title="Credit card" sectioned>
          <InlineGrid
            gap="400"
            columns={{ sm: 1, md: ["oneThird", "twoThirds"] }}
          >
            <Box padding="100" borderInlineEndWidth="025">
              <Text as="strong">Color</Text>
              <Box padding="200">
                <InlineStack>
                  <ColorPickerCircle type="star" />
                  <Box gap="400">
                    <Text variant="headingMd" as="p">
                      Star Color
                    </Text>
                    <Text variant="headingsm" as="p">
                      {starColor}
                    </Text>
                  </Box>
                </InlineStack>
              </Box>
              <Divider borderWidth="050" />

              <Box padding="200">
                <InlineStack>
                  <ColorPickerCircle type="text" />
                  <Box gap="400">
                    <Text variant="headingMd" as="p">
                      Text Color
                    </Text>
                    <Text variant="headingsm" as="p">
                      {textColor}
                    </Text>
                  </Box>
                </InlineStack>
              </Box>

              <Divider borderWidth="050" />

              <Box padding="200">
                <InlineStack>
                  <ColorPickerCircle type="button" />
                  <Box gap="400">
                    <Text variant="headingMd" as="p">
                      Button Color
                    </Text>
                    <Text variant="headingsm" as="p">
                      {buttonColor}
                    </Text>
                  </Box>
                </InlineStack>
              </Box>

              <Divider borderWidth="050" />

              <Box padding="200">
                <InlineStack>
                  <ColorPickerCircle type="buttonTextColor" />
                  <Box gap="400">
                    <Text variant="headingMd" as="p">
                      Text Color
                    </Text>
                    <Text variant="headingsm" as="p">
                      {buttonTextColor}
                    </Text>
                  </Box>
                </InlineStack>
              </Box>

              <Divider borderWidth="050" />

              <Text as="strong">Theme</Text>

              <Box padding="200">
                <InlineStack>
                  <Box gap="400">
                    <Checkbox
                      label="show date"
                      checked={dateChecked}
                      onChange={handleChange}
                    />
                  </Box>
                </InlineStack>
              </Box>
            </Box>

            <Box borderInlineStartWidth="025">
              <InlineStack align="center" gap="300">
                <BlockStack gap="400">
                  <Text variant="headingLg" alignment="cetenr" as="h2">
                    Customer Reviews
                  </Text>
                  <InlineStack as="div" align="center">
                    <Ratting rating={4} color={starColor} />
                    <Text as="span">4.07 out of 5</Text>
                  </InlineStack>
                </BlockStack>
              </InlineStack>
              <Text alignment="center" as="span">
                Based on 15 reviews
              </Text>

              <Box padding="400">
                {rattingArray.map((v) => {
                  const ratingNumber = (v.rating / 5) * 100;
                  return (
                    <InlineStack
                      blockAlign="cemter"
                      direction="row"
                      as="div"
                      align="center"
                      gap="200"
                    >
                      <Ratting rating={v.rating} color={starColor} />
                      <CustomProgressBar
                        progress={ratingNumber}
                        color={starColor}
                      />
                      <Text>{v.pepole}</Text>
                    </InlineStack>
                  );
                })}
              </Box>

              <Box
                style={{
                  background: buttonColor,
                  textAlign: "center",
                  padding: "10px",
                  margin: "10px",
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: buttonTextColor,
                  cursor: "pointer",
                }}
              >
                Write A Review
              </Box>

              <Popover
                active={active === "popover2"}
                preferredAlignment="right"
                activator={
                  <Button
                    variant="plain"
                    icon={ChevronDownIcon}
                    onClick={toggleActive("popover2")}
                    accessibilityLabel="Other save actions"
                  >
                    most Recent
                  </Button>
                }
                autofocusTarget="first-node"
                onClose={toggleActive("popover2")}
              >
                <ActionList
                  actionRole="menuitem"
                  items={[
                    {
                      content: "most Recent",
                    },
                    {
                      content: "Heghset Recent",
                    },
                    {
                      content: "Lowest Recent",
                    },
                    {
                      content: "only pictures",
                    },
                  ]}
                />
              </Popover>

              <BlockStack>
                {reviews.map((review) => {
                  return (
                    <Box padding="100">
                      <InlineStack gap="100">
                        <Avatar customer name="Farrah" />

                        <Box>
                          <Ratting color={starColor} rating={review.Rating} />
                          <Box
                            as="legend"
                            style={{
                              color: starColor,
                            }}
                          >
                            {review.userName}
                          </Box>
                        </Box>

                        <Box>{dateChecked && review.date}</Box>
                      </InlineStack>

                      <Box style={{ color: textColor }} as="legend">
                        {review.tag}
                      </Box>

                      <Text as="p">{review.comment}</Text>
                    </Box>
                  );
                })}
              </BlockStack>
            </Box>
          </InlineGrid>
        </Card>
      </Page>
    </AppProvider>
  );
}
