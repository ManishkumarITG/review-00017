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
} from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import Ratting from "../components/Ratting.jsx";
import { useColorTheme } from "./ColorContext";
import { useCallback, useReducer, useState } from "react";
import { ArrowLeftIcon, ChevronDownIcon } from "@shopify/polaris-icons";
import CustomProgressBar from "../components/CustomProgressBar.jsx";
import { reviews } from "../data/reviewData.js";
import ColorPickerCircle from "../components/ColorPicker.jsx";
import CollapsibleBox from "../components/Collapsible.jsx";
import { useNavigate } from "react-router";

const initialState = {
  Widget_title: "Costomer review",
  Average_rating_text: 4.07,
  button_text: "Write a review",
};

function reducer(state, action) {
  return {
    ...state,
    [action.field]: action.value,
  };
}

export default function ReviewWidgets() {
  // usenevigate for back to setting page

  const nevigate = useNavigate();

  // import color context
  const { getHexCode } = useColorTheme();

  // import all hex code
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

  const [state, dispatch] = useReducer(reducer, initialState);

  const [active, setActive] = useState(null);

  const [dateChecked, setDateChecked] = useState(false);

  const [dataBtn, setdataBtn] = useState(null);

  const [review, setReview] = useState(reviews);

  const [btnText, setBtnText] = useState("Sempal Data");

  // const [loging, setLoding] = useState(false);

  const toggleDataBtn = (id) => () => {
    setdataBtn((activeId) => (activeId !== id ? id : null));
  };

  const handleTextChnge = useCallback((newValue, id) => {
    dispatch({
      field: id,
      value: newValue,
    });
  }, []);

  const handleChange = useCallback(
    (newChecked) => setDateChecked(newChecked),
    [],
  );

  const toggleActive = (id) => () => {
    setActive((activeId) => (activeId !== id ? id : null));
  };

  const handlePageChange = async () => {
    nevigate("/app/mySettingPage");
  };

  return (
    <AppProvider>
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
                  <Box
                    borderStyle="solid"
                    borderBlockStartWidth="025"
                    padding="200"
                    borderColor="border-brand"
                  >
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
                  <Box
                    borderStyle="solid"
                    borderBlockStartWidth="025"
                    padding="200"
                    borderColor="border-brand"
                  >
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
                  <Box
                    borderStyle="solid"
                    borderBlockStartWidth="025"
                    padding="200"
                    borderColor="border-brand"
                  >
                    <InlineStack>
                      <ColorPickerCircle type="buttonTextColor" />
                      <Box
                        gap="400"
                        borderStyle="solid"
                        borderBlockStartWidth="025"
                        padding="200"
                        borderColor="border-brand"
                      >
                        <Text variant="headingMd" as="p">
                          Text Color
                        </Text>
                        <Text variant="headingsm" as="p">
                          {buttonTextColor}
                        </Text>
                      </Box>
                    </InlineStack>
                  </Box>
                </CollapsibleBox>

                <CollapsibleBox id="theme-collapsible" boxName="Theme">
                  {" "}
                  <Box gap="400">
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
                          label="show date"
                          checked={dateChecked}
                          onChange={handleChange}
                        />
                      </Box>
                    </InlineStack>
                  </Box>{" "}
                </CollapsibleBox>

                <CollapsibleBox id="text-collapsible" boxName="Text">
                  {" "}
                  <Box gap="400">
                    <InlineStack>
                      <Box
                        borderStyle="solid"
                        borderBlockStartWidth="025"
                        padding="200"
                        borderColor="border-brand"
                        gap="200"
                        width="100%"
                      >
                        <TextField
                          label="Widget title"
                          value={state.Widget_title}
                          id="Widget_title"
                          onChange={handleTextChnge}
                          autoComplete="off"
                          placeholder="Customer Reviews"
                        />
                      </Box>

                      <Box
                        borderStyle="solid"
                        borderBlockStartWidth="025"
                        padding="200"
                        borderColor="border-brand"
                        gap="200"
                        width="100%"
                      >
                        <TextField
                          label="Average rating text"
                          value={state.Average_rating_text}
                          id="Average_rating_text"
                          onChange={handleTextChnge}
                          autoComplete="off"
                          type="number"
                          placeholder="{{ average_rating }} out of 5"
                          min="0"
                          max="5"
                        />
                      </Box>

                      <Box
                        borderStyle="solid"
                        borderBlockStartWidth="025"
                        padding="200"
                        borderColor="border-brand"
                        gap="200"
                        width="100%"
                      >
                        <TextField
                          label="Button Text"
                          value={state.button_text}
                          id="button_text"
                          onChange={handleTextChnge}
                          autoComplete="off"
                          placeholder="Write a review"
                        />
                      </Box>
                    </InlineStack>
                  </Box>{" "}
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
                          setBtnText("Sempal Data");
                        }}
                      >
                        Sempal Data
                      </Button>
                      <Button
                        onClick={() => {
                          setReview([]);
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
                    {state.Widget_title}
                  </Text>
                  <InlineStack as="div" align="center">
                    <Ratting
                      rating={
                        review.length == 0 ? 0 : state.Average_rating_text
                      }
                      color={starColor}
                    />
                    {review.length !== 0 && (
                      <Text as="span">
                        {state.Average_rating_text} out of 5
                      </Text>
                    )}
                  </InlineStack>
                </BlockStack>
              </InlineStack>
              <Text alignment="center" as="span">
                Based on 15 reviews
              </Text>

              {review.length !== 0 && (
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
                  })}
                </Box>
              )}

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
                {state.button_text}
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
                {review.length !== 0
                  ? review.map((review) => {
                      return (
                        <Box key={review.userName} padding="100">
                          <InlineStack gap="100">
                            <Avatar customer name="Farrah" />

                            <Box>
                              <Ratting
                                color={starColor}
                                rating={review.Rating}
                              />
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
                    })
                  : ""}
              </BlockStack>
            </Box>
          </InlineGrid>
        </Card>
      </Page>
    </AppProvider>
  );
}
