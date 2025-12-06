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
  Popover,
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
  ChevronDownIcon,
} from "@shopify/polaris-icons";

// costom copnents

import CollapsibleBox from "./components/Collapsible.jsx";
import ThumbnailSkeleton from "./components/ThumbnailSkeleton.jsx";
import StarRating from "./components/Ratting.jsx";
import ColorPickerCircle from "./components/ColorPicker.jsx";

import { useNavigate } from "react-router";
import { useColorTheme } from "./ColorContext";
import { SaveBar } from "@shopify/app-bridge-react";
import Loding from "./components/Loding.jsx";
import { arrowIcon } from "./icons/icon.jsx";

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
    toggleActive,
    active,
    btnText,
    setBtnText,
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

  const handlePageChange = () => {
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

      <Card roundedAbove="0" padding={0} title="star ratting card" sectioned>
        <InlineGrid
          columns={{
            xs: 1,
            sm: 1,
            md: ["oneThird", "twoThirds"],
          }}
        >
          {/* settings */}
          <Box
            style={{
              height: "100vh",
              overflow: "auto",
              padding: "25px 25px 25px 25px",
            }}
          >
            <BlockStack gap={600}>
              <InlineStack blockAlign="center" align="start" gap="200">
                <Box
                  style={{
                    border: "1px solid #babfc3",
                    padding: "7px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={handlePageChange}
                >
                  <Icon source={arrowIcon} />
                </Box>
                <Text as="span" variant="headingLg" fontWeight="regular">
                  Star Rating Badge
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
                    <Loding />
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
                  <Loding />
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

          {/*product Skeleton */}
          <Box borderColor="border-brand" borderInlineStartWidth="025">
            <Box
              padding="200"
              borderColor="border-brand"
              borderBlockEndWidth="025"
            >
              <InlineStack blockAlign="center" align="end" gap={200}>
                <Text>Previewing</Text>
                <Popover
                  active={active === "popover2"}
                  preferredAlignment="center"
                  activator={
                    <Box
                      width="132px"
                      paddingBlockEnd={100}
                      paddingBlockStart={100}
                      paddingInline={200}
                      borderWidth="025"
                      borderRadius="0"
                      borderColor="border-brand"
                      onClick={toggleActive("popover2")}
                    >
                      {
                        <InlineStack gap={100}>
                          {btnText} <Icon source={ChevronDownIcon} />
                        </InlineStack>
                      }
                    </Box>
                  }
                  autofocusTarget="first-node"
                  onClose={toggleActive("popover2")}
                >
                  <Box
                    padding="300"
                    borderRadius="0"
                    borderWidth="0"
                    background="bg-fill"
                  >
                    <Box width="109px">
                      <Box
                        style={{
                          cursor: "pointer",
                          padding: "0 0 4px 0",
                        }}
                        onClick={() => {
                          setBtnText("Sempal Data");
                        }}
                      >
                        Sempal Data
                      </Box>
                      <Box
                        style={{
                          cursor: "pointer",
                          padding: "0 0 4px 0",
                        }}
                        onClick={() => {
                          setBtnText("No Review");
                        }}
                      >
                        No Review
                      </Box>
                    </Box>
                  </Box>
                </Popover>
              </InlineStack>
            </Box>
            <Box
              style={{
                height: "100vh",
                overflow: "auto",
                padding: "30px 30px 60px 30px",
              }}
            >
              <SkeletonPage>
                <Layout>
                  <Layout.Section>
                    <Box>
                      <BlockStack gap="500">
                        <ThumbnailSkeleton height="400px" width="70%" />
                        <SkeletonDisplayText maxWidth="100%" size="medium" />
                        <InlineStack>
                          {" "}
                          {btnText !== "No Review" && (
                            <StarRating rating={5} color={starColor} />
                          )}{" "}
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
                              {btnText !== "No Review" && (
                                <>
                                  {" "}
                                  <StarRating rating={5} color={starColor} />
                                  <Text>123 reviews</Text>{" "}
                                </>
                              )}
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
                              {btnText !== "No Review" && (
                                <>
                                  {" "}
                                  <StarRating rating={5} color={starColor} />
                                  <Text>123 reviews</Text>{" "}
                                </>
                              )}
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
                              {btnText !== "No Review" && (
                                <>
                                  {" "}
                                  <StarRating rating={5} color={starColor} />
                                  <Text>123 reviews</Text>{" "}
                                </>
                              )}
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
          </Box>
        </InlineGrid>
      </Card>
    </AppProvider>
  );
}
