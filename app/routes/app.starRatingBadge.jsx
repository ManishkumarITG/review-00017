import {
  AppProvider,
  BlockStack,
  Box,
  Button,
  Card,
  Checkbox,
  Icon,
  InlineGrid,
  InlineStack,
  Layout,
  Link,
  Page,
  SkeletonDisplayText,
  SkeletonPage,
  Spinner,
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

import CollapsibleBox from "./components/Collapsible.jsx";
import ThumbnailSkeleton from "./components/ThumbnailSkeleton.jsx";
import StarRating from "./components/Ratting.jsx";
import ColorPickerCircle from "./components/ColorPicker.jsx";

import { useNavigate } from "react-router";
import { useColorTheme } from "./ColorContext";
import { SaveBar } from "@shopify/app-bridge-react";

export default function appStarRatting() {
  const nevigate = useNavigate();

  const {
    getHexCode,
    setting,
    handleSave,
    handleDiscard,
    lodaing,
    state,
    dispatch,
  } = useColorTheme();

  const starColor = getHexCode("star");

  const handleChange = (newChecked, id) => {
    console.log(newChecked, id);
    dispatch({
      field: id,
      value: newChecked,
    });
    shopify.saveBar.show("review_widgets");
  };

  const handlePgeChange = () => {
    nevigate("/app/mySettingPage");
  };

  return (
    <AppProvider>
      <SaveBar id="review_widgets">
        <button
          loading={lodaing}
          variant="primary"
          onClick={() => handleSave("review_widgets", "review_widgets")}
        ></button>
        <button onClick={() => handleDiscard("review_widgets")}></button>
      </SaveBar>
      <Page fullWidth>
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
                  <Button icon={ArrowLeftIcon} onClick={handlePgeChange} />
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
                  <BlockStack gap={500}>
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
                    {setting == null ? (
                      <Spinner
                        accessibilityLabel="Spinner example"
                        size="large"
                      />
                    ) : (
                      setting?.text?.map((text) => {
                        return (
                          text.type == "ChoiceList" && (
                            <Box paddingInline="200" key={text._id}>
                              <Checkbox
                                checked={state[text.settingName]}
                                label={text.settingName}
                                id={text.settingName}
                                onChange={handleChange}
                              />
                            </Box>
                          )
                        );
                      })
                    )}
                  </Box>
                </CollapsibleBox>

                <CollapsibleBox id="color-collapsible" boxName="Color">
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
                            {state["Show text and stars"] && "123 reviews"}
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
