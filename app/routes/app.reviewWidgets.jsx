import {
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
  Checkbox,
  TextField,
  Spinner,
  Icon,
  RangeSlider,
  Select,
} from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import Ratting from "./components/Ratting.jsx";
import { useColorTheme } from "./ColorContext";
import { useEffect, useState } from "react";
import {
  ArrowDiagonalIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@shopify/polaris-icons";
import CustomProgressBar from "./components/CustomProgressBar.jsx";
import { rattingArray, reviews } from "./data/reviewData.js";
import { LAYOUT_CONTROLS } from "./data/widgetDefaults.js";
import ColorPickerCircle from "./components/ColorPicker.jsx";
import CollapsibleBox from "./components/Collapsible.jsx";
import Loding from "./components/Loding.jsx";
import { useNavigate } from "react-router";
import { SaveBar } from "@shopify/app-bridge-react";
import { getAllReviews, ratingSummary } from "./services/api.js";
import { arrowIcon } from "./icons/icon.jsx";
import { useAppBridge } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";

const SAVE_BAR_ID = "review_widgets";

export default function ReviewWidgets() {
  const shopify = useAppBridge();
  const nevigate = useNavigate();
  const { t } = useTranslation();

  const {
    getHexCode,
    setting,
    state,
    handleSave,
    handleDiscard,
    lodaing,
    toggleActive,
    active,
    btnText,
    setBtnText,
    isChange,
    toggles,
    updateToggle,
    layout,
    updateLayout,
    updateText,
  } = useColorTheme();

  // colors
  const starColor = getHexCode("star");
  const emptyStarColor = getHexCode("emptyStar");
  const headingColor = getHexCode("heading");
  const textColor = getHexCode("text");
  const secondaryTextColor = getHexCode("secondaryText");
  const buttonColor = getHexCode("button");
  const buttonTextColor = getHexCode("buttonTextColor");
  const widgetBg = getHexCode("widgetBg");
  const cardBg = getHexCode("cardBg");
  const progressTrack = getHexCode("progressTrack");
  const avatarBg = getHexCode("avatarBg");

  // layout numbers
  const num = (type, fallback) => {
    const v = Number(layout?.[type]);
    return Number.isFinite(v) && layout?.[type] !== "" ? v : fallback;
  };
  const widgetWidth = num("widgetWidth", 600);
  const starSize = num("starSize", 18);
  const titleSize = num("titleSize", 22);
  const textSize = num("textSize", 15);
  const buttonRadius = num("buttonRadius", 0);
  const buttonWidth = num("buttonWidth", 60);
  const cardRadius = num("cardRadius", 12);
  const cardGap = num("cardGap", 18);
  const progressHeight = num("progressHeight", 14);
  const progressRadius = num("progressRadius", 0);
  const alignment = layout?.alignment || "center";

  const justifyMap = { left: "start", center: "center", right: "end" };
  const flexAlign = { left: "flex-start", center: "center", right: "flex-end" };

  const limit = 5;
  const massage = "Something Went wrong";
  const duration = 7000;

  const [total, setTotal] = useState(1);
  const [page, setPage] = useState(1);
  const [review, setReview] = useState(reviews);
  const [loding, setLoding] = useState(false);
  const [rattingSummary, setRattingSummary] = useState(rattingArray.reviews);
  const [totalReview, setTotalReview] = useState(rattingArray.totalReview);
  const [avgStarRating, setAvgStarRating] = useState(rattingArray.avgRating);
  const [shopDomin, setShopDomain] = useState("");
  // shopify.config is only available in the browser — reading it during
  // server-side rendering (direct URL loads) throws.
  const [embedId, setEmbedId] = useState("");

  useEffect(() => {
    setBtnText("Sample Data");
    const shopDomin = shopify.config.shop.split(".")[0];
    setShopDomain(shopDomin);
    setEmbedId(shopify.config.apiKey);
  }, []);

  const summary = async () => {
    try {
      const data = await ratingSummary();
      setRattingSummary(data.data.reviews);
      setTotalReview(data.data.totalReview);
      setAvgStarRating(data.data.avgRating);
    } catch (error) {
      console.log(error);
      shopify.toast.show(massage, { duration: duration });
    }
  };

  const handleRealData = async (data) => {
    const { limit, page, filterType } = data;
    try {
      setLoding(true);
      const resopanse = await getAllReviews(page, limit, filterType);
      await summary();
      setTotal(resopanse.data.total);
      setReview(resopanse.data.items);
    } catch (error) {
      shopify.toast.show(massage, { duration: duration });
      console.log(error);
    } finally {
      setLoding(false);
    }
  };

  const handleTextChnge = (newValue, id) => {
    updateText(id, newValue, SAVE_BAR_ID);
  };

  const handleToggleChange = (newChecked, id) => {
    updateToggle(id, newChecked, SAVE_BAR_ID);
  };

  const handleLayoutChange = (type) => (value) => {
    updateLayout(type, String(value), SAVE_BAR_ID);
  };

  const handlePageChange = async () => {
    if (isChange) {
      shopify.saveBar.leaveConfirmation();
    } else {
      nevigate("/app/mySettingPage");
    }
  };

  const countText = (state["Review count text"] || "Based on {count} reviews")
    .split("{count}")
    .join(String(totalReview));

  return (
    <AppProvider>
      <SaveBar id={SAVE_BAR_ID}>
        <button
          loading={lodaing}
          variant="primary"
          onClick={() => handleSave(SAVE_BAR_ID, SAVE_BAR_ID)}
        ></button>
        <button onClick={() => handleDiscard(SAVE_BAR_ID)}></button>
      </SaveBar>

      <Box style={{ height: "100vh", overflow: "auto" }}>
        <Card roundedAbove="0" padding={0} title="widget card" sectioned>
          <InlineGrid
            gap="400"
            columns={{ sm: 1, md: ["oneThird", "twoThirds"] }}
          >
            {/* ---------------- settings panel ---------------- */}

            <Box
              style={{
                height: "100vh",
                overflow: "auto",
                padding: "25px 25px 25px 25px",
              }}
            >
              <BlockStack gap="300">
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
                    {t("reviewWidgets.PageTitle")}
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
                      {t("reviewWidgets.Sections.Install.Title")}
                    </Text>
                    <Text as="p">
                      {t("reviewWidgets.Sections.Install.Description")}
                    </Text>
                    <InlineStack gap={300}>
                      <Button
                        icon={ArrowDiagonalIcon}
                        onClick={() =>
                          window.open(
                            `https://admin.shopify.com/store/${shopDomin}/themes/current/editor?context=apps&activateAppId=${embedId}/Product_review`,
                            "_blank",
                          )
                        }
                      >
                        {t("reviewWidgets.Sections.Install.InstallButton")}
                      </Button>
                    </InlineStack>
                  </BlockStack>
                </Box>

                {/* Colors */}
                <CollapsibleBox
                  id="color-collapsible"
                  boxName={t("reviewWidgets.Collapsible.Color")}
                >
                  {setting == null ? (
                    <Spinner accessibilityLabel="Loading colors" size="large" />
                  ) : (
                    setting?.color?.map((color) => {
                      const crrColor = getHexCode(color.type);
                      return (
                        <Box key={color.type} padding="200">
                          <InlineStack>
                            <ColorPickerCircle
                              hexCodeColor={crrColor}
                              type={color.type}
                              saveBarId={SAVE_BAR_ID}
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

                {/* Visibility toggles */}
                <CollapsibleBox
                  id="visibility-collapsible"
                  boxName={t("reviewWidgets.Collapsible.Visibility", "Visibility")}
                >
                  {setting == null ? (
                    <Spinner
                      accessibilityLabel="Loading visibility"
                      size="large"
                    />
                  ) : (
                    setting?.theme?.map((theme) => {
                      return (
                        <Box key={theme.settingName} gap="400">
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
                                checked={!!toggles[theme.settingName]}
                                onChange={handleToggleChange}
                                id={theme.settingName}
                              />
                            </Box>
                          </InlineStack>
                        </Box>
                      );
                    })
                  )}
                </CollapsibleBox>

                {/* Texts */}
                <CollapsibleBox
                  id="text-collapsible"
                  boxName={t("reviewWidgets.Collapsible.Text")}
                >
                  <Box gap="400">
                    {setting == null ? (
                      <Spinner accessibilityLabel="Loading texts" size="large" />
                    ) : (
                      setting?.text?.map((text) => {
                        const titelValue = text.settingName;
                        return (
                          text.type == "text" && (
                            <Box
                              key={text.settingName}
                              borderStyle="solid"
                              borderBlockStartWidth="025"
                              padding="200"
                              borderColor="border-brand"
                              gap="200"
                              width="100%"
                            >
                              <TextField
                                label={text.settingName}
                                value={String(state[titelValue] ?? "")}
                                id={text.settingName}
                                onChange={handleTextChnge}
                                autoComplete="off"
                                placeholder={t(
                                  "reviewWidgets.Placeholder.TextField",
                                )}
                                helpText={
                                  titelValue === "Review count text"
                                    ? "{count} = number of reviews"
                                    : undefined
                                }
                              />
                            </Box>
                          )
                        );
                      })
                    )}
                  </Box>
                </CollapsibleBox>

                {/* Layout */}
                <CollapsibleBox
                  id="layout-collapsible"
                  boxName={t("reviewWidgets.Collapsible.Layout", "Layout")}
                >
                  <Box gap="400">
                    {setting == null ? (
                      <Spinner
                        accessibilityLabel="Loading layout"
                        size="large"
                      />
                    ) : (
                      setting?.layout?.map((item) => {
                        const control = LAYOUT_CONTROLS[item.type];
                        if (!control) return null;
                        const currentValue =
                          layout?.[item.type] ?? item.isvalue;

                        return (
                          <Box
                            key={item.type}
                            borderStyle="solid"
                            borderBlockStartWidth="025"
                            padding="200"
                            borderColor="border-brand"
                            gap="200"
                            width="100%"
                          >
                            {control.control === "range" ? (
                              <RangeSlider
                                label={item.settingName}
                                min={control.min}
                                max={control.max}
                                step={control.step}
                                value={Number(currentValue)}
                                onChange={handleLayoutChange(item.type)}
                                output
                                suffix={
                                  <Text as="span" variant="bodySm">
                                    {currentValue}
                                    {control.suffix}
                                  </Text>
                                }
                              />
                            ) : (
                              <Select
                                label={item.settingName}
                                options={control.options}
                                value={String(currentValue)}
                                onChange={handleLayoutChange(item.type)}
                              />
                            )}
                          </Box>
                        );
                      })
                    )}
                  </Box>
                </CollapsibleBox>
              </BlockStack>
            </Box>

            {/* ---------------- live preview ---------------- */}

            <Box borderColor="border-brand" borderInlineStartWidth="025">
              <Box
                padding="200"
                borderColor="border-brand"
                borderBlockEndWidth="025"
              >
                <InlineStack blockAlign="center" align="end" gap={200}>
                  <Text>{t("reviewWidgets.Preview")}</Text>
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
                          style={{ cursor: "pointer", padding: "0 0 4px 0" }}
                          onClick={() => {
                            setReview(reviews);
                            setRattingSummary(rattingArray.reviews);
                            setTotalReview(rattingArray.totalReview);
                            setAvgStarRating(rattingArray.avgRating);
                            setBtnText("Sample Data");
                          }}
                        >
                          {t("reviewWidgets.SampleData")}
                        </Box>
                        <Box
                          style={{ cursor: "pointer", padding: "0 0 4px 0" }}
                          onClick={() => {
                            handleRealData({ limit: limit, page: page });
                            setBtnText("Real Data");
                          }}
                        >
                          {t("reviewWidgets.RealData")}
                        </Box>
                        <Box
                          style={{ cursor: "pointer", padding: "0 0 4px 0" }}
                          onClick={() => {
                            setReview([]);
                            setBtnText("No Review");
                            setTotalReview(0);
                            setRattingSummary([]);
                          }}
                        >
                          {t("reviewWidgets.NoReview")}
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
                <div
                  style={{
                    maxWidth: `${widgetWidth}px`,
                    margin: "0 auto",
                    background: widgetBg,
                    padding: "16px",
                    textAlign: alignment,
                  }}
                >
                  {/* title */}
                  {toggles["show widget title"] && (
                    <h2
                      style={{
                        color: headingColor,
                        fontSize: `${titleSize}px`,
                        fontWeight: 700,
                        margin: "0 0 12px 0",
                      }}
                    >
                      {state["Widget title"]}
                    </h2>
                  )}

                  {/* average rating */}
                  {toggles["show average rating"] && (
                    <InlineStack
                      as="div"
                      align={justifyMap[alignment]}
                      blockAlign="center"
                      gap="200"
                    >
                      <Ratting
                        rating={review.length == 0 ? 0 : avgStarRating}
                        color={starColor}
                        emptyColor={emptyStarColor}
                        width={starSize}
                        height={starSize}
                      />
                      {review.length !== 0 && (
                        <span
                          style={{
                            color: textColor,
                            fontSize: `${textSize}px`,
                          }}
                        >
                          {avgStarRating} {state["Rating suffix text"]}
                        </span>
                      )}
                    </InlineStack>
                  )}

                  {/* review count */}
                  {toggles["show review count"] && (
                    <div
                      style={{
                        color: secondaryTextColor,
                        fontSize: `${textSize}px`,
                        marginTop: "6px",
                      }}
                    >
                      {countText}
                    </div>
                  )}

                  {/* rating breakdown */}
                  {toggles["show rating breakdown"] &&
                    rattingSummary.length !== 0 && (
                      <Box padding="400">
                        {!loding ? (
                          rattingSummary.map((v) => {
                            const ratingNumber =
                              totalReview > 0
                                ? (v.pepole / totalReview) * 100
                                : 0;
                            return (
                              <InlineStack
                                blockAlign="center"
                                direction="row"
                                as="div"
                                align={justifyMap[alignment]}
                                gap="100"
                                key={v.rating}
                              >
                                <Ratting
                                  rating={v.rating}
                                  color={starColor}
                                  emptyColor={emptyStarColor}
                                  width={starSize}
                                  height={starSize}
                                />
                                <CustomProgressBar
                                  progress={ratingNumber}
                                  color={starColor}
                                  height={progressHeight}
                                  radius={progressRadius}
                                  trackColor={progressTrack}
                                />
                                <span style={{ color: secondaryTextColor }}>
                                  {v.pepole}
                                </span>
                              </InlineStack>
                            );
                          })
                        ) : (
                          <Loding />
                        )}
                      </Box>
                    )}

                  {/* write review button */}
                  {toggles["show write review button"] && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: flexAlign[alignment],
                      }}
                    >
                      <div
                        onClick={() => {
                          nevigate("/app/writeReview");
                        }}
                        style={{
                          background: buttonColor,
                          textAlign: "center",
                          padding: "10px",
                          margin: "10px 0",
                          fontSize: "17px",
                          fontWeight: "bold",
                          color: buttonTextColor,
                          cursor: "pointer",
                          borderRadius: `${buttonRadius}px`,
                          width: `${buttonWidth}%`,
                        }}
                      >
                        {state["Button Text"]}
                      </div>
                    </div>
                  )}

                  {/* sort options */}
                  {toggles["show sort options"] && (
                    <Popover
                      active={active === "popover1"}
                      preferredAlignment="right"
                      activator={
                        <Button
                          variant="plain"
                          icon={ChevronDownIcon}
                          onClick={toggleActive("popover1")}
                          accessibilityLabel="Other save actions"
                        >
                          {t("reviewWidgets.Popover.MostRecent")}
                        </Button>
                      }
                      autofocusTarget="first-node"
                      onClose={toggleActive("popover1")}
                    >
                      <ActionList
                        actionRole="menuitem"
                        items={[
                          {
                            content: t("reviewWidgets.Popover.MostRecent"),
                            onAction: () => {
                              handleRealData({ filterType: "mostRecent" });
                            },
                          },
                          {
                            content: t("reviewWidgets.Popover.HighestRating"),
                            onAction: () => {
                              handleRealData({ filterType: "highestRating" });
                            },
                          },
                          {
                            content: t("reviewWidgets.Popover.LowestRating"),
                            onAction: () => {
                              handleRealData({ filterType: "lowestRating" });
                            },
                          },
                        ]}
                      />
                    </Popover>
                  )}

                  {/* empty state */}
                  {review.length === 0 && !loding && (
                    <div
                      style={{
                        color: secondaryTextColor,
                        fontSize: `${textSize}px`,
                        margin: "14px 0",
                      }}
                    >
                      {state["Empty state text"]}
                    </div>
                  )}

                  {/* review list */}
                  <Box minHeight="400px">
                    {!loding ? (
                      review.length !== 0 &&
                      review.map((v) => {
                        const formattedDate = v.updatedAt.split("T")[0];
                        const avatarLetter = (v.name || "?")
                          .trim()
                          .charAt(0)
                          .toUpperCase();

                        return (
                          <div
                            key={v._id}
                            style={{
                              display: "flex",
                              gap: "14px",
                              padding: "16px",
                              textAlign: "left",
                              background: cardBg,
                              borderRadius: `${cardRadius}px`,
                              marginBottom: `${cardGap}px`,
                              boxShadow: toggles["show card shadow"]
                                ? "0 2px 8px rgba(0,0,0,0.08)"
                                : "none",
                            }}
                          >
                            {toggles["show reviewer avatar"] && (
                              <div
                                style={{
                                  background: avatarBg,
                                  color: starColor,
                                  width: "40px",
                                  height: "40px",
                                  minWidth: "40px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "10%",
                                  fontWeight: 600,
                                  fontSize: "20px",
                                }}
                              >
                                {avatarLetter}
                              </div>
                            )}

                            <div style={{ flex: 1 }}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <Ratting
                                  color={starColor}
                                  emptyColor={emptyStarColor}
                                  rating={v.rating ?? v.Rating}
                                  width={starSize}
                                  height={starSize}
                                />
                                {toggles["show date"] && (
                                  <span
                                    style={{
                                      color: secondaryTextColor,
                                      fontSize: `${Math.max(
                                        textSize - 2,
                                        11,
                                      )}px`,
                                    }}
                                  >
                                    {formattedDate}
                                  </span>
                                )}
                              </div>

                              {toggles["show reviewer name"] && (
                                <div
                                  style={{
                                    color: textColor,
                                    fontWeight: 600,
                                    fontSize: `${textSize}px`,
                                    margin: "4px 0",
                                  }}
                                >
                                  {v.name}
                                </div>
                              )}

                              <p
                                style={{
                                  color: textColor,
                                  fontSize: `${textSize}px`,
                                  margin: 0,
                                }}
                              >
                                {v.description}
                              </p>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <Loding />
                    )}

                    {total > limit && btnText == "Real Data" && !loding && (
                      <Card>
                        <InlineStack
                          gap="800"
                          align="center"
                          blockAlign="center"
                        >
                          <Box
                            style={{
                              border: "2px solid #ccc",
                              padding: "4px 8px 0 8px",
                            }}
                            onClick={() => {
                              if (page > 1) {
                                setPage((prev) => prev - 1);
                                handleRealData({
                                  limit: limit,
                                  page: page - 1,
                                });
                              }
                            }}
                          >
                            <Button variant="plain" icon={ChevronLeftIcon} />
                          </Box>
                          <Box as="span" style={{ color: "#535353ff" }}>
                            Showing page {page} to {review.length} out of{" "}
                            {total}
                          </Box>
                          <Box
                            style={{
                              border: "2px solid #ccc",
                              padding: "4px 8px 0 8px",
                            }}
                            onClick={() => {
                              if (page < total / limit) {
                                setPage((prev) => prev + 1);
                                handleRealData({
                                  limit: limit,
                                  page: page + 1,
                                });
                              }
                            }}
                          >
                            <Button variant="plain" icon={ChevronRightIcon} />
                          </Box>
                        </InlineStack>
                      </Card>
                    )}
                  </Box>
                </div>
              </Box>
            </Box>
          </InlineGrid>
        </Card>
      </Box>
    </AppProvider>
  );
}
