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
  Checkbox,
  TextField,
  Spinner,
} from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import Ratting from "./components/Ratting.jsx";
import { useColorTheme } from "./ColorContext";
import { useCallback, useState } from "react";
import { ArrowLeftIcon, ChevronDownIcon } from "@shopify/polaris-icons";
import CustomProgressBar from "./components/CustomProgressBar.jsx";
import { rattingArray, reviews } from "./data/reviewData.js";
import ColorPickerCircle from "./components/ColorPicker.jsx";
import CollapsibleBox from "./components/Collapsible.jsx";
import Loding from "./components/Loding.jsx";
import { useNavigate } from "react-router";
import { SaveBar } from "@shopify/app-bridge-react";
import { getAllReviews, ratingSummary } from "./services/api.js";

export default function ReviewWidgets() {
  // usenevigate for back to setting page

  const nevigate = useNavigate();

  // import color context
  const {
    getHexCode,
    setIsChnage,
    setting,
    dateChecked,
    setDateChecked,
    state,
    dispatch,
    handleSave,
    handleDiscard,
    lodaing,
  } = useColorTheme();

  // import all hex code
  const starColor = getHexCode("star");
  const textColor = getHexCode("text");
  const buttonColor = getHexCode("button");
  const buttonTextColor = getHexCode("buttonTextColor");

  const [active, setActive] = useState(null);

  const [dataBtn, setdataBtn] = useState(null);

  const [review, setReview] = useState(reviews);

  const [btnText, setBtnText] = useState("Sempal Data");

  const [loding, setLoding] = useState(false);

  const [rattingSummary, setRattingSummary] = useState(rattingArray.reviews);

  const [totalReview, setTotalReview] = useState(rattingArray.totalReview);

  const summary = async () => {
    try {
      const data = await ratingSummary();
      console.log("data", data);
      setRattingSummary(data.data.reviews);
      setTotalReview(data.data.totalReview);
    } catch (error) {}
  };

  const toggleDataBtn = (id) => () => {
    setdataBtn((activeId) => (activeId !== id ? id : null));
  };

  const handleRealData = async () => {
    try {
      setLoding(true);
      const resopanse = await getAllReviews();
      await summary();
      console.log(resopanse);
      setReview(resopanse);
    } catch (error) {
      console.log(error);
    } finally {
      setLoding(false);
    }
  };

  const handleTextChnge = useCallback((newValue, id) => {
    dispatch({
      field: id,
      value: newValue,
    });
    shopify.saveBar.show("review_widgets");
    setIsChnage(true);
  }, []);

  const handleChange = useCallback((newChecked) => {
    setDateChecked(newChecked);
    shopify.saveBar.show("review_widgets");
    setIsChnage(true);
  }, []);

  const toggleActive = (id) => () => {
    setActive((activeId) => (activeId !== id ? id : null));
  };
  // handle page change
  const handlePageChange = async () => {
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
      <Page>
        <Card title="Credit card" sectioned>
          <InlineGrid
            gap="400"
            columns={{ sm: 1, md: ["oneThird", "twoThirds"] }}
          >
            {/* reviews settiing */}

            <Box
              padding="100"
              borderColor="border-brand"
              borderInlineEndWidth="025"
            >
              <BlockStack gap="300">
                <InlineStack align="start" gap="200">
                  <Button icon={ArrowLeftIcon} onClick={handlePageChange} />
                  <Text variant="headingLg">Review Widget</Text>
                </InlineStack>

                <CollapsibleBox id="color-collapsible" boxName="Color">
                  {setting == null ? (
                    <Spinner
                      accessibilityLabel="Spinner example"
                      size="large"
                    />
                  ) : (
                    setting?.color?.map((color) => {
                      const crrColor = getHexCode(color.type);
                      return (
                        <Box key={color._id} padding="200">
                          <InlineStack>
                            <ColorPickerCircle
                              hexCodeColor={crrColor}
                              type={color.type}
                              saveBarId="review_widgets"
                            />
                            <Box gap="400">
                              <Text variant="headingMd" as="p">
                                {color.settingName}
                              </Text>
                              <Text variant="headingsm" as="p">
                                {crrColor}
                              </Text>
                            </Box>
                          </InlineStack>
                        </Box>
                      );
                    })
                  )}
                </CollapsibleBox>

                <CollapsibleBox id="theme-collapsible" boxName="Theme">
                  {setting == null ? (
                    <Spinner
                      accessibilityLabel="Spinner example"
                      size="large"
                    />
                  ) : (
                    setting?.theme?.map((theme) => {
                      return (
                        <Box key={theme._id} gap="400">
                          <InlineStack>
                            <Box
                              borderStyle="solid"
                              borderBlockStartWidth="025"
                              padding="200"
                              borderColor="border-brand"
                              gap="200"
                              width="100%"
                            >
                              <Checkbox
                                label={theme.settingName}
                                checked={dateChecked}
                                onChange={handleChange}
                              />
                            </Box>
                          </InlineStack>
                        </Box>
                      );
                    })
                  )}
                </CollapsibleBox>

                <CollapsibleBox id="text-collapsible" boxName="Text">
                  {" "}
                  <Box gap="400">
                    {setting == null ? (
                      <Spinner
                        accessibilityLabel="Spinner example"
                        size="large"
                      />
                    ) : (
                      setting?.text?.map((text) => {
                        const titelValue = text.settingName;
                        return (
                          text.type == "text" && (
                            <Box
                              key={text._id}
                              borderStyle="solid"
                              borderBlockStartWidth="025"
                              padding="200"
                              borderColor="border-brand"
                              gap="200"
                              width="100%"
                            >
                              <TextField
                                label={text.settingName}
                                value={state[titelValue]}
                                id={text.settingName}
                                onChange={handleTextChnge}
                                autoComplete="off"
                                placeholder="Customer Reviews"
                              />
                            </Box>
                          )
                        );
                      })
                    )}
                  </Box>
                </CollapsibleBox>
              </BlockStack>
            </Box>

            {/* reviews data */}

            <Box
              minHeight="100vh"
              borderColor="border-brand"
              borderInlineStartWidth="025"
            >
              <Box
                padding="200"
                borderColor="border-brand"
                borderBlockEndWidth="025"
              >
                <Popover
                  active={dataBtn === "popover2"}
                  preferredAlignment="right"
                  activator={
                    <Button
                      onClick={toggleDataBtn("popover2")}
                      icon={ChevronDownIcon}
                      accessibilityLabel="Other save actions"
                    >
                      {btnText}
                    </Button>
                  }
                  autofocusTarget="first-node"
                  onClose={toggleDataBtn("popover2")}
                >
                  <Box
                    padding="100"
                    borderRadius="0"
                    borderWidth="0"
                    background="bg-fill"
                  >
                    <BlockStack gap="100">
                      <Button
                        onClick={() => {
                          setReview(reviews);
                          setRattingSummary(rattingArray.reviews);
                          setBtnText("Sempal Data");
                        }}
                      >
                        Sempal Data
                      </Button>
                      <Button
                        onClick={() => {
                          handleRealData();
                          setBtnText("Real Data");
                        }}
                      >
                        Real Data
                      </Button>
                      <Button
                        onClick={() => {
                          setReview([]);
                          setBtnText("No Review");
                        }}
                      >
                        No Review
                      </Button>
                    </BlockStack>
                  </Box>
                </Popover>
              </Box>
              <InlineStack align="center" gap="300">
                <BlockStack gap="400">
                  <Text variant="headingLg" alignment="cetenr" as="h2">
                    {state["Widget title"]}
                  </Text>
                  <InlineStack as="div" align="center">
                    <Ratting
                      rating={
                        review.length == 0 ? 0 : state["Average rating text"]
                      }
                      color={starColor}
                    />
                    {review.length !== 0 && (
                      <Text as="span">
                        {state["Average rating text"]} out of 5
                      </Text>
                    )}
                  </InlineStack>
                </BlockStack>
              </InlineStack>
              <Text alignment="center" as="span">
                Based on {totalReview} reviews
              </Text>

              {rattingSummary.length !== 0 && (
                <Box padding="400">
                  {!loding ? (
                    rattingSummary.map((v) => {
                      const ratingNumber = (v.pepole / totalReview) * 100;
                      return (
                        <InlineStack
                          blockAlign="cemter"
                          direction="row"
                          as="div"
                          align="center"
                          gap="200"
                          key={v.rating}
                        >
                          <Ratting rating={v.rating} color={starColor} />
                          <CustomProgressBar
                            progress={ratingNumber}
                            color={starColor}
                          />
                          <Text>{v.pepole}</Text>
                        </InlineStack>
                      );
                    })
                  ) : (
                    <Loding />
                  )}
                </Box>
              )}

              <Box
                onClick={() => {
                  nevigate("/app/writeReview");
                }}
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
                {state["Button Text"]}
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
                {!loding ? (
                  review.length !== 0 &&
                  review.map((v) => {
                    const formattedDate = v.updatedAt;
                    const tag = v.email.split("@")[0];
                    return (
                      <Box key={v.name} padding="100">
                        <InlineStack gap="100">
                          <Avatar customer name="Farrah" />

                          <Box>
                            <Ratting color={starColor} rating={v.rating} />
                            <Box
                              as="legend"
                              style={{
                                color: starColor,
                              }}
                            >
                              {v.name}
                            </Box>
                          </Box>

                          <Box>{dateChecked && formattedDate}</Box>
                        </InlineStack>

                        <Box style={{ color: textColor }} as="legend">
                          {tag}
                        </Box>

                        <Text as="p">{v.description}</Text>
                      </Box>
                    );
                  })
                ) : (
                  <Loding />
                )}
              </BlockStack>
            </Box>
          </InlineGrid>
        </Card>
      </Page>
    </AppProvider>
  );
}
