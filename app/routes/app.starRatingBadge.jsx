// shopify components

import {
  AppProvider,
  BlockStack,
  Box,
  Button,
  Card,
  ChoiceList,
  Icon,
  InlineGrid,
  InlineStack,
  Layout,
  Link,
  Page,
  SkeletonDisplayText,
  SkeletonPage,
  Text,
} from "@shopify/polaris";

// icons shopify

import {
  ArrowLeftIcon,
  ArrowDiagonalIcon,
  PlusIcon,
  MinusIcon,
} from "@shopify/polaris-icons";

// costom copnents

import CollapsibleBox from "../components/Collapsible";
import ThumbnailSkeleton from "../components/ThumbnailSkeleton.jsx";
import StarRating from "../components/Ratting";
import ColorPickerCircle from "../components/ColorPicker";

import { useNavigate } from "react-router";
import { useCallback, useState } from "react";
import { useColorTheme } from "./ColorContext";

export default function appStarRatting() {
  const nevigate = useNavigate();

  const { getHexCode } = useColorTheme();

  const starColor = getHexCode("star");

  const [isAllowed, setIsAllowed] = useState(true);

  const handleChange = useCallback((value) => {
    const selectedValue = value[0];

    if (selectedValue === "hidden") {
      setIsAllowed(true);
    } else if (selectedValue === "optional") {
      setIsAllowed(false);
    }
  }, []);
  return (
    <AppProvider>
      <Page fullWidth={true}>
        <Card>
          <InlineGrid
            columns={{
              xs: 1,
              sm: 1,
              md: ["oneThird", "twoThirds"],
            }}
          >
            <Box padding="400">
              <BlockStack gap={600}>
                <InlineStack gap={400}>
                  <Button
                    icon={ArrowLeftIcon}
                    onClick={() => {
                      nevigate("/app/mySettingPage");
                    }}
                  />
                  <Text as="h2" variant="headingSm">
                    Rating Badge
                  </Text>
                </InlineStack>
                <Box
                  padding="500"
                  borderWidth="025"
                  borderRadius="100"
                  borderColor="border-brand"
                >
                  <BlockStack gap={500} fullWidth>
                    <Text as="h3" variant="headingSm">
                      Install
                    </Text>
                    <Text as="p">
                      Add the Star Rating Badge on product pages.
                    </Text>
                    <InlineStack gap={300}>
                      <Button icon={ArrowDiagonalIcon}>Install</Button>
                      <Button variant="plain" icon={ArrowDiagonalIcon}>
                        Learn more
                      </Button>
                    </InlineStack>
                    <s-divider />

                    <Text>
                      Add the Star Rating Badge on collection pages (optional):
                    </Text>
                    <Link monochrome url="#">
                      See guide ↗
                    </Link>
                  </BlockStack>
                </Box>

                <CollapsibleBox id="text_Badge_Ratting" boxName="Text">
                  <Box padding="400">
                    <ChoiceList
                      choices={[
                        { label: "Show text and stars", value: "hidden" },
                        { label: "Show stars only", value: "optional" },
                      ]}
                      selected={isAllowed ? ["hidden"] : ["optional"]}
                      onChange={handleChange}
                    />
                  </Box>
                </CollapsibleBox>

                <CollapsibleBox id="color-collapsible" boxName="Color">
                  <Box
                    borderStyle="solid"
                    borderBlockStartWidth="025"
                    padding="200"
                    borderColor="border-brand"
                  >
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
                </CollapsibleBox>
              </BlockStack>
            </Box>
            <Box>
              <SkeletonPage>
                <Layout>
                  <Layout.Section>
                    <Box>
                      <BlockStack gap="500">
                        <ThumbnailSkeleton height="400px" width="70%" />
                        <SkeletonDisplayText maxWidth="100%" size="medium" />
                        <InlineStack>
                          {" "}
                          <StarRating rating={5} color={starColor} />{" "}
                          <Text variant="headingMd" as="span">
                            {isAllowed && "123 reviews"}
                          </Text>
                        </InlineStack>

                        <InlineStack gap="100">
                          <Box as="span" style={{ color: "#cfcfcfff" }}>
                            100.00
                          </Box>
                          <Box
                            style={{
                              background: "#cfcfcfff",
                              width: "40px",
                              height: "20px",
                            }}
                          />
                        </InlineStack>

                        <Box
                          width="100px"
                          borderWidth="025"
                          borderColor="border-brand"
                          borderRadius="300"
                          padding="100"
                        >
                          <InlineStack gap="500">
                            <Box as="span" style={{ color: "#cfcfcfff" }}>
                              <Icon source={PlusIcon} tone="base" />
                            </Box>

                            <Box as="span" style={{ color: "#cfcfcfff" }}>
                              1
                            </Box>

                            <Box
                              style={{
                                color: "#cfcfcfff",
                              }}
                            >
                              <Icon source={MinusIcon} tone="base" />
                            </Box>
                          </InlineStack>
                        </Box>

                        <SkeletonDisplayText maxWidth="100%" size="small" />
                        <SkeletonDisplayText maxWidth="100%" size="small" />
                        <InlineGrid columns={2} gap="300">
                          <Box>
                            <ThumbnailSkeleton width="100%" height="300px" />
                            <InlineStack align="center">
                              {" "}
                              <StarRating rating={5} color={starColor} />{" "}
                              <Text>123 reviews</Text>
                            </InlineStack>
                            <InlineStack align="center" gap="100">
                              <Box as="span" style={{ color: "#cfcfcfff" }}>
                                100.00
                              </Box>
                              <Box
                                style={{
                                  background: "#cfcfcfff",
                                  width: "40px",
                                  height: "20px",
                                }}
                              />
                            </InlineStack>
                          </Box>

                          <Box>
                            <ThumbnailSkeleton width="100%" height="300px" />
                            <InlineStack align="center">
                              {" "}
                              <StarRating rating={5} color={starColor} />{" "}
                              <Text>123 reviews</Text>
                            </InlineStack>
                            <InlineStack align="center" gap="100">
                              <Box as="span" style={{ color: "#cfcfcfff" }}>
                                100.00
                              </Box>
                              <Box
                                style={{
                                  background: "#cfcfcfff",
                                  width: "40px",
                                  height: "20px",
                                }}
                              />
                            </InlineStack>
                          </Box>

                          <Box>
                            <ThumbnailSkeleton width="100%" height="300px" />
                            <InlineStack align="center">
                              {" "}
                              <StarRating rating={5} color={starColor} />{" "}
                              <Text>123 reviews</Text>
                            </InlineStack>
                            <InlineStack align="center" gap="100">
                              <Box as="span" style={{ color: "#cfcfcfff" }}>
                                100.00
                              </Box>
                              <Box
                                style={{
                                  background: "#cfcfcfff",
                                  width: "40px",
                                  height: "20px",
                                }}
                              />
                            </InlineStack>
                          </Box>
                        </InlineGrid>
                      </BlockStack>
                    </Box>
                  </Layout.Section>
                </Layout>
              </SkeletonPage>
            </Box>
          </InlineGrid>
        </Card>
      </Page>
    </AppProvider>
  );
}
