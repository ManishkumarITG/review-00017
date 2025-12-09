import {
  Card,
  AppProvider,
  InlineGrid,
  Box,
  Text,
  InlineStack,
  BlockStack,
  Checkbox,
  TextField,
  LegacyTabs,
  Banner,
  Icon,
  Form,
  FormLayout,
} from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import { useColorTheme } from "./ColorContext";
import { useCallback, useReducer, useState } from "react";
import ColorPickerCircle from "./components/ColorPicker.jsx";
import { useNavigate } from "react-router";
import { SaveBar } from "@shopify/app-bridge-react";
import CollapsibleBox from "./components/Collapsible";
import Loding from "./components/Loding";
import { arrowIcon } from "./icons/icon";

const colorInitialState = {
  defaultColor: true,
  customColor: false,
};

const colorReducer = (state, action) => {
  switch (action.type) {
    case "defaultColor":
      return {
        ...state,
        defaultColor: true,
        customColor: false,
      };

    case "customColor":
      return {
        ...state,
        defaultColor: false,
        customColor: true,
      };

    default:
      return state;
  }
};

export default function ReviewWidgets() {
  // usenevigate for back to setting page

  const nevigate = useNavigate();

  // import color context
  const {
    getHexCode,
    isChange,
    shop,
    setting,
    handleSave,
    handleDiscard,
    lodaing,
    state,
    dispatch,
    handleCheckeState,
    setIsChnage,
  } = useColorTheme();

  // import all hex code
  const starColor = getHexCode("star");

  const buttonColor = getHexCode("button");
  const buttonTextColor = getHexCode("buttonTextColor");

  const [selected, setSelected] = useState(0);
  const [rating, setRating] = useState(0);
  const [isFromOpen, setIsFromOpen] = useState(false);
  const [userReview, setUserReview] = useState("");
  const [reqData, setReqData] = useState(false);
  const [pageCount, setPageCount] = useState(0);

  const handleSubmit = () => {
    const count = pageCount + 1;

    if (count > 2) {
      window.open(`https://${shop}`, "_blank");
      setIsFromOpen(false);
      console.log(isFromOpen);
    } else {
      setPageCount(count);
    }

    if (count == 2) {
      setRating(0);
    }

    setReqData(false);
    setUserReview("");
  };

  const handleTextChnge = useCallback((newValue, id) => {
    const textSettingArray = setting?.text;
    if (handleCheckeState(textSettingArray, id, newValue, "review_widgets"))
      return;
    dispatch({
      field: id,
      value: newValue,
    });
    if (id !== "Button Text") {
      setSelected(1);
    }
    shopify.saveBar.show("review_widgets");
    setIsChnage(true);
  }, []);

  const handleReviewChange = useCallback((value) => setUserReview(value), []);

  const handleRating = (index) => {
    setRating(index + 1);
    setIsFromOpen(true);
    setPageCount(0);
  };

  const [colorChangeState, colorDispatch] = useReducer(
    colorReducer,
    colorInitialState,
  );

  const handleOpen = (newChecked, id) => {
    colorDispatch({
      type: id,
    });
  };

  const handlePageChange = async () => {
    if (isChange) {
      console.log("is page changes", isChange);
      shopify.saveBar.leaveConfirmation();
    } else {
      console.log("page changes");
      nevigate("/app/mySettingPage");
    }
  };

  const handleTabChange = useCallback((selectedTabIndex) => {
    setSelected(selectedTabIndex);
  }, []);

  const tabs = [
    {
      id: "from-1",
      content: "In-store from",
      panelID: "all-customers-content-1",
    },
    {
      id: "from-2",
      content: "External from",
      panelID: "accepts-marketing-content-1",
    },
  ];

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
      <Box padding={400}>
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
            Write a review flow
          </Text>
        </InlineStack>

        <InlineGrid
          gap="400"
          columns={{ sm: 1, md: ["oneThird", "twoThirds"] }}
        >
          {/* reviews settiing */}

          <Box padding="100">
            <BlockStack gap="300">
              <Card>
                <CollapsibleBox id="write_a_review_page" boxName="text">
                  {" "}
                  <Box gap="400">
                    {setting == null ? (
                      <Loding />
                    ) : (
                      setting?.text?.map((text) => {
                        const titelValue = text.settingName;
                        return (
                          ((text.type == "text" &&
                            text.settingName == "Screen title") ||
                            text.settingName == "Introduction" ||
                            text.settingName == "display name" ||
                            text.settingName == "Button Text") && (
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
                                placeholder="Customer Reviews"
                              />
                            </Box>
                          )
                        );
                      })
                    )}
                  </Box>
                </CollapsibleBox>
              </Card>

              <Card>
                <Box padding="300">
                  <BlockStack gap="100">
                    <Checkbox
                      label="Default colors (from your brand settings)"
                      checked={colorChangeState.defaultColor}
                      id="defaultColor"
                      onChange={handleOpen}
                    />
                    <Checkbox
                      label="Custom colors"
                      checked={colorChangeState.customColor}
                      id="customColor"
                      onChange={handleOpen}
                    />
                  </BlockStack>

                  {colorChangeState.customColor && (
                    <>
                      {setting == null ? (
                        <Loding />
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
                    </>
                  )}
                </Box>
              </Card>
            </BlockStack>
          </Box>

          {/* reviews data */}

          <Card roundedAbove="0" padding={0}>
            <Box minHeight="100vh">
              <Box
                padding="200"
                borderColor="border-brand"
                borderBlockEndWidth="025"
              >
                <InlineStack blockAlign="center" align="end" gap={200}>
                  <Text>Previewing</Text>
                </InlineStack>
              </Box>
              <LegacyTabs
                tabs={tabs}
                selected={selected}
                onSelect={handleTabChange}
              ></LegacyTabs>

              <Box style={{ padding: "20px" }}>
                {" "}
                {selected == 0 ? (
                  <Box
                    onClick={() => {
                      handleFromOpem;
                    }}
                    style={{
                      background: buttonColor,
                      textAlign: "center",
                      padding: "10px",
                      margin: "10px",
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: buttonTextColor || "#ffffff",
                      cursor: "pointer",
                    }}
                  >
                    {state["Button Text"]}
                  </Box>
                ) : (
                  <BlockStack gap="400">
                    <Box paddingBlockStart="400" paddingInline="200">
                      <Banner title="This is a sample preview. Reviews submitted won't be saved." />
                    </Box>

                    {pageCount == 0 || pageCount == 2 ? (
                      <BlockStack gap="400">
                        {" "}
                        {pageCount == 2 ? (
                          <>
                            <Text alignment="center" variant="heading2xl">
                              Thanks for your review!
                            </Text>
                            <Text
                              alignment="center"
                              variant="headingMd"
                              tone="base"
                            >
                              We are processing it and it will appear on the
                              store soon. You can edit review by logging into
                              your Judge.me profile.
                            </Text>
                            <Text alignment="center" variant="headingLg">
                              Would you like to share your experience of
                              shopping with us?
                            </Text>

                            <Text
                              alignment="center"
                              variant="headingMd"
                              tone="base"
                            >
                              We value your feedback and use it to improve.
                              Please share any thoughts or suggestions you have.
                            </Text>
                          </>
                        ) : (
                          <>
                            <Text alignment="center" variant="heading2xl">
                              {state["Screen title"]}
                            </Text>
                            <Text
                              alignment="center"
                              variant="headingMd"
                              tone="base"
                            >
                              {state["Introduction"]}
                            </Text>
                            <Text alignment="center" variant="headingLg">
                              {state["display name"]}
                            </Text>
                          </>
                        )}
                        <InlineStack gap="050" align="center">
                          {[...Array(5)].map((_, index) => (
                            <Box
                              key={index}
                              as="span"
                              style={{
                                color: starColor,
                                height: "100px",
                                cursor: "pointer",
                              }}
                              onClick={() => handleRating(index)}
                            >
                              {index < rating ? (
                                <svg
                                  width="48px"
                                  height="72px"
                                  viewBox="0 0 24 24"
                                  id="_24x24_On_Light_Star"
                                  data-name="24x24/On Light/Star"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill={starColor ? starColor : "#29ffd4"}
                                >
                                  <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                                  <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />

                                  <g id="SVGRepo_iconCarrier">
                                    {" "}
                                    <rect
                                      id="view-box"
                                      width="24"
                                      height="24"
                                      fill="none"
                                    />{" "}
                                    <path
                                      id="Shape"
                                      d="M15.791,19.5,10.262,16.6,4.732,19.5a.75.75,0,0,1-1.088-.79L4.7,12.557.228,8.2a.75.75,0,0,1,.415-1.28l6.182-.9L9.589.419a.75.75,0,0,1,1.345,0l2.764,5.6,6.182.9A.751.751,0,0,1,20.3,8.2l-4.473,4.36,1.056,6.157a.748.748,0,0,1-1.088.79Z"
                                      transform="translate(1.739 1.25)"
                                      fill={starColor ? starColor : "#29ffd4"}
                                    />{" "}
                                  </g>
                                </svg>
                              ) : (
                                <svg
                                  width="48px"
                                  height="72px"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                  <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></g>
                                  <g id="SVGRepo_iconCarrier">
                                    {" "}
                                    <path
                                      d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z"
                                      stroke="#000000"
                                      strokeWidth="1.5px"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></path>{" "}
                                  </g>
                                </svg>
                              )}
                            </Box>
                          ))}
                        </InlineStack>
                      </BlockStack>
                    ) : (
                      pageCount == 1 && (
                        <BlockStack>
                          <Text
                            alignment="center"
                            variant="headingLg"
                            tone="base"
                          >
                            Share a picture
                          </Text>
                          <Text alignment="center" variant="headingsm">
                            Upload a photo to support your review.
                          </Text>
                        </BlockStack>
                      )
                    )}

                    <Box>
                      {isFromOpen && (
                        <Form>
                          <FormLayout>
                            {pageCount == 0 ? (
                              <TextField
                                value={userReview}
                                onChange={handleReviewChange}
                                label="Review content"
                                type="text"
                                multiline={4}
                                error={reqData && "data is requird"}
                                autoComplete="email"
                                helpText={
                                  <Text alignment="center" as="span">
                                    We’ll only contact you about your review if
                                    necessary. By submitting your review, you
                                    agree to our terms and conditions and
                                    privacy policy.
                                  </Text>
                                }
                              />
                            ) : (
                              pageCount == 1 && (
                                <s-drop-zone
                                  label="Upload"
                                  accessibilityLabel="Upload image of type jpg, png, or gif"
                                  multiple
                                  onInput={(event) =>
                                    console.log(
                                      "onInput",
                                      event.currentTarget?.value,
                                    )
                                  }
                                  onChange={(event) =>
                                    console.log(
                                      "onChange",
                                      event.currentTarget?.value,
                                    )
                                  }
                                  onDropRejected={(event) =>
                                    console.log(
                                      "onDropRejected",
                                      event.currentTarget?.value,
                                    )
                                  }
                                />
                              )
                            )}

                            <Box
                              onClick={handleSubmit}
                              style={{
                                background: buttonColor,
                                textAlign: "center",
                                padding: "10px",
                                margin: "10px",
                                fontSize: "20px",
                                color: buttonTextColor || "#ffffff",
                                cursor: "pointer",
                                width: "100%",
                              }}
                            >
                              {pageCount == 2 ? "Go to store" : "Next"}
                            </Box>
                          </FormLayout>
                        </Form>
                      )}
                    </Box>
                  </BlockStack>
                )}
              </Box>
            </Box>
          </Card>
        </InlineGrid>
      </Box>
    </AppProvider>
  );
}
