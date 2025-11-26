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
  Form,
  FormLayout,
  TextField,
  // s-stack,
  Banner,
} from "@shopify/polaris";
// import "@shopify/polaris/build/esm/styles.css";
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
  const formBackground = getHexCode("formBackground");
  const rattingArray = [
    { rating: 5, pepole: 8 },
    { rating: 4, pepole: 3 },
    { rating: 3, pepole: 1 },
    { rating: 2, pepole: 3 },
    { rating: 1, pepole: 0 },
  ];
  const [selectedStars, setSelectedStars] = useState(0);

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const [dateChecked, setDateChecked] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = useCallback(
    (newChecked) => setDateChecked(newChecked),
    [],
  );

  const toggleActive = (id) => () => {
    setActive((activeId) => (activeId !== id ? id : null));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmitting(true);

    // Simulate form submission delay
    const formData = {
      firstName,
      email,
      message,
      rating: selectedStars // <-- include star rating here
    };

    console.log("Form Data Submitted:", formData);

    // Simulate async API call
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);

      // Reset form if you want
      setFirstName("");
      setEmail("");
      setMessage("");
      setSelectedStars(0);
    }, 1000);
  };


  function Star({ value, selectedStars, onSelect, color }) {
    return (
      <span
        style={{
          cursor: "pointer",
          fontSize: "28px",
          color: value <= selectedStars ? color : "#ccc",
          transition: "0.2s ease",
          userSelect: "none",
        }}
        onClick={() => onSelect(value)}
      >
        <span class="Polaris-Icon Polaris-Icon--colorInherit Polaris-Icon--isColored" style={{ height: "20px", width: "20px", display: "inline-block", fill: "currentColor", stroke: "currentColor", strokeWidth: "0" }}>
          <svg viewBox="1 1 18 18" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M11.128 4.123c-.453-.95-1.803-.95-2.256 0l-1.39 2.912-3.199.421c-1.042.138-1.46 1.422-.697 2.146l2.34 2.222-.587 3.172c-.192 1.034.901 1.828 1.825 1.327l2.836-1.54 2.836 1.54c.924.501 2.017-.293 1.825-1.327l-.587-3.172 2.34-2.222c.762-.724.345-2.008-.697-2.146l-3.2-.421-1.389-2.912Z"></path></svg>
        </span>
      </span>
    );
  }

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
                      Button Text Color
                    </Text>
                    <Text variant="headingsm" as="p">
                      {buttonTextColor}
                    </Text>
                  </Box>
                </InlineStack>
              </Box>

              <Divider borderWidth="050" />
              <Box padding="200">
                <InlineStack>
                  <ColorPickerCircle type="formBackground" />
                  <Box gap="400">
                    <Text variant="headingMd" as="p">
                      Form Background Color
                    </Text>
                    <Text variant="headingSm" as="p">
                      {formBackground}
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
                  <InlineStack as="Box" align="center">
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
                      as="Box"
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
                onClick={() => setOpen(!open)}
              >
                Write A Review
              </Box>
              {open && (
                <Page title="Review " narrowWidth>
                  <Card sectioned>
                    <Box style={{ background: formBackground, padding: "20px", borderColor: buttonColor, borderWidth: "2px", borderStyle: "solid", borderRadius: "8px" }}>

                      <Form onSubmit={handleSubmit} >
                        <FormLayout>
                          {success && (
                            <Banner title="Submitted" status="success">
                              <p>Your form was submitted successfully.</p>
                            </Banner>
                          )}
                          {/* --------------------------------------stars-------------------------------------- */}
                          <Box align="center" >
                            <Text variation="strong">Star Rating </Text>

                            <InlineStack gap="200" align="center">
                              {[1, 2, 3, 4, 5].map((v) => (
                                <Star
                                  key={v}
                                  value={v}
                                  selectedStars={selectedStars}
                                  onSelect={setSelectedStars}
                                  color={starColor}  // dynamic theme color
                                />
                              ))}
                            </InlineStack>
                          </Box>
                          {/* --------------------------------------stars-------------------------------------- */}


                          <BlockStack gap="400">
                            <Box>
                              <Text variation="strong">Display name</Text>
                              <TextField
                                id="fname"
                                name="fname"
                                value={firstName}
                                onChange={setFirstName}
                                placeholder="Enter first name"
                                autoComplete="given-name"
                              />
                            </Box>

                            <Box>
                              <Text variation="strong">Email</Text>
                              <TextField
                                id="email"
                                name="email"
                                value={email}
                                onChange={setEmail}
                                placeholder="Enter email"
                                autoComplete="email"
                              />
                            </Box>

                            <Box>
                              <Text variation="strong">Description</Text>
                              <TextField
                                id="message"
                                name="message"
                                value={message}
                                onChange={setMessage}
                                placeholder="Write your message"
                                multiline={6}
                              />
                            </Box>

                            <Box>
                              <Button type="submit" primary
                              onClick={handleSubmit}
                              >
                                Submit
                              </Button>
                            </Box>

                            {/* <Box>
                              <Button
                                type="submit"
                                primary
                                disabled={submitting}
                                loading={submitting}
                                style={{
                                  background: buttonColor,
                                  color: buttonTextColor,
                                  borderColor: buttonColor,
                                }}
                              >
                                Submit
                              </Button>
                            </Box> */}
                          </BlockStack>
                        </FormLayout>
                      </Form>
                    </Box>

                  </Card>
                </Page>
              )}
              <Popover
                active={active === "popover2"}
                preferredAlignment="right"
                activator={
                  <Button
                    variant="plain"
                    icon={ChevronDownIcon}
                    onClick={toggleActive("popover2")}
                    accessibilityLabel="Other save actions"
                    style={{ color: textColor }}
                  >
                    Most Recent
                  </Button>
                }
                onClose={toggleActive("popover2")} // ✅ uncommented
              >
                <ActionList
                  actionRole="menuitem"
                  items={[
                    { content: "Most Recent" },
                    { content: "Highest Recent" },
                    { content: "Lowest Recent" },
                    { content: "Only Pictures" },
                  ]}
                />
              </Popover>
              <Divider />

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
