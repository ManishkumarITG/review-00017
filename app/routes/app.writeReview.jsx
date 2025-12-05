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
  Checkbox,
  TextField,
  LegacyTabs,
  Banner,
  Icon,
  Form,
  FormLayout,
  Spinner,
} from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import { useColorTheme } from "./ColorContext";
import { useCallback, useReducer, useState } from "react";
import {
  ArrowLeftIcon,
  StarFilledIcon,
  StarIcon,
} from "@shopify/polaris-icons";
import ColorPickerCircle from "./components/ColorPicker.jsx";
import DropZoneWithImageFileUpload from "./components/ImageDrop.jsx";
import { useNavigate } from "react-router";
import { SaveBar } from "@shopify/app-bridge-react";
import CollapsibleBox from "./components/Collapsible";
import Loding from "./components/Loding";

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
      shopify.saveBar.leaveConfirmation();
    } else {
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
                  <Text variant="headingLg">Write a review flow</Text>
                </InlineStack>

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
              <LegacyTabs
                tabs={tabs}
                selected={selected}
                onSelect={handleTabChange}
              ></LegacyTabs>

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
                            We are processing it and it will appear on the store
                            soon. You can edit review by logging into your
                            Judge.me profile.
                          </Text>
                          <Text alignment="center" variant="headingLg">
                            Would you like to share your experience of shopping
                            with us?
                          </Text>

                          <Text
                            alignment="center"
                            variant="headingMd"
                            tone="base"
                          >
                            We value your feedback and use it to improve. Please
                            share any thoughts or suggestions you have.
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
                              <Icon source={StarFilledIcon} />
                            ) : (
                              <Icon source={StarIcon} />
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

                  <Box padding="400">
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
                                  agree to our terms and conditions and privacy
                                  policy.
                                </Text>
                              }
                            />
                          ) : (
                            pageCount == 1 && <DropZoneWithImageFileUpload />
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
          </InlineGrid>
        </Card>
      </Page>
    </AppProvider>
  );
}
