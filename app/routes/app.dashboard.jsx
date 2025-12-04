import React, { useEffect, useState } from "react";
import {
  BlockStack,
  Button,
  Card,
  Page,
  InlineGrid,
  Text,
  Popover,
  OptionList,
  InlineStack,
  Badge,
  Box,
  Image,
  Link,
  Spinner,
} from "@shopify/polaris";
import { AppProvider } from "@shopify/polaris";
import en from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/build/esm/styles.css";
import { CalendarIcon, ChartVerticalIcon } from "@shopify/polaris-icons";
import DeshboardCard from "./components/deshboardCard";
import ReviewInlineCard from "./components/ReviewInlineCard";
import DeshboardGuidense from "./components/DeshboardGuidense";
import DeshboardimageWithText from "./components/DeshboardImageWithText";
import { useNavigate } from "react-router";
import DeshboardHeader from "./components/DeshboardHeader";

export default function Deshboard() {
  const navigate = useNavigate();
  const [carddata, setCardData] = useState([]);

  function Loding() {
    return (
      <>
        <InlineStack align="center" gap="100" type="center">
          <Spinner size="large" accessibilityLabel="Loading content" />
        </InlineStack>
      </>
    );
  }

  async function CardData() {
    try {
      const response = await fetch("/app/getcardData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("API offline");

      const data = await response.json();
      console.log("CardData fetch successfully", data);
      return data;
    } catch (error) {
      console.log("Error in Fetching data in Deshboard Cards", error);

      const carddata = [
        {
          id: 1,
          title: "Reviews",
          number: 1284,
          percentage: 12,
          date: "yesterday",
        },
        {
          id: 6,
          title: "Average Rating",
          number: 90,
          percentage: 9,
          date: "2025-09-15",
        },

        {
          id: 3,
          title: "Request sent",
          number: 1120,
          percentage: 15,
          date: "2025-11-18",
        },
        {
          id: 4,
          title: "Revenue Form",
          number: 42,
          percentage: -3,
          date: "2025-11-10",
        },
        {
          id: 5,
          title: "Trust score",
          number: "Transparency",
          percentage: "Authenticity",
          date: "2025-11-10",
        },
      ];

      console.log("CardData", carddata);
      return carddata;
    }
  }

  useEffect(() => {
    CardData()
      .then((data) => {
        setCardData(data);
      })
      .catch((error) => {
        console.error("Error fetching card data:", error);
      });
  }, []);

  const ranges = [
    {
      title: "Last 30 days",
      alias: "Last 30 days",
      period: {
        since: "Last 30 days",
        until: "Last 30 days",
      },
    },
    {
      title: "Yesterday",
      alias: "yesterday",
      period: {
        since: "yesterday",
        until: "yesterday",
      },
    },
    {
      title: "Today",
      alias: "today",
      period: {
        since: "today",
        until: "today",
      },
    },
    {
      title: "Last 7 days",
      alias: "last7days",
      period: {
        since: "-7d",
        until: "-1d",
      },
    },
    {
      title: "Last 30 days",
      alias: "last30days",
      period: {
        since: "-30d",
        until: "-1d",
      },
    },
    {
      title: "Last 90 days",
      alias: "last90days",
      period: {
        since: "-90d",
        until: "-1d",
      },
    },
    {
      title: "Last 12 months",
      alias: "last12months",
      period: {
        since: "-12m",
        until: "-1d",
      },
    },
    {
      title: "All time",
      alias: "alltime",
      period: null,
    },
    {
      title: "Custom",
      alias: "custom",
      period: null,
    },
  ];

  const ReviewInlineCardArray = [
    {
      title: "Top products",
      imageurl: "https://pub-images.judge.me/judgeme/empty-product",
      buttontext: "View all reviews",
      textcontent: "A list of top reviewed products will show here.",
    },
    {
      title: "Recent activity",
      imageurl: "https://pub-images.judge.me/judgeme/empty-review",
      buttontext: "Request reviews",
      textcontent: "You can view your recent reviews here.",
    },
  ];

  const deshboardImages = [
    {
      title: "Build trust. Grow sales. Try Awesome FREE.",
      imageurl: "https://assets.judge.me/core/cover/awesome-2025.webp",
      buttontext: "Explore features",
      textcontent:
        "Get more reviews, build trust and grow store visits. Increase retention & referrals. FREE for 15 days and then just $15/month. Cancel anytime.",
    },
  ];

  const [selected, setSelected] = useState(ranges[0]);
  const [popoverActive, setPopoverActive] = useState(false);
  const [filteredData, setFilteredData] = useState(carddata);

  function filterresult(value) {
    const newSelected = ranges.find((range) => range.alias === value[0]);
    setSelected(newSelected);

    // Filter logic
    if (newSelected.alias === "alltime") {
      setFilteredData(carddata);
    } else if (newSelected.alias === "today") {
      setFilteredData(carddata.filter((i) => i.date === "2025-11-20"));
    } else if (newSelected.alias === "yesterday") {
      setFilteredData(carddata.filter((i) => i.date === "yesterday"));
    } else if (newSelected.alias === "last7days") {
      setFilteredData(
        carddata.filter((i) => {
          const d = new Date(i.date);
          const diff = (new Date() - d) / (1000 * 60 * 60 * 24);
          return diff <= 7;
        }),
      );
    } else if (newSelected.alias === "last30days") {
      setFilteredData(
        carddata.filter((i) => {
          const d = new Date(i.date);
          const diff = (new Date() - d) / (1000 * 60 * 60 * 24);
          return diff <= 30;
        }),
      );
    } else {
      setFilteredData(carddata);
    }

    setPopoverActive(false);
  }

  return (
    <>
      <AppProvider i18n={en}>
        <DeshboardHeader />
        <Page>
          <DeshboardGuidense />
        </Page>
        <Page>
          <Card roundedAbove="sm">
            <BlockStack gap="200">
              <InlineGrid columns="1fr auto">
                <Text as="h2" variant="headingMd">
                  Welcome to Judge.me
                </Text>
                <InlineGrid columns="auto auto" gap="100" align="center">
                  <Popover
                    onClose={() => {
                      console.log("closed");
                    }}
                    autofocusTarget="none"
                    preferredAlignment="left"
                    preferInputActivator={false}
                    preferredPosition="below"
                    activator={
                      <Button
                        onClick={() => {
                          setPopoverActive(!popoverActive);
                        }}
                        icon={CalendarIcon}
                      >
                        {selected.title}
                      </Button>
                    }
                    active={popoverActive}
                  >
                    <OptionList
                      options={ranges?.map((range) => ({
                        value: range.alias,
                        label: range.title,
                      }))}
                      selected={selected.alias}
                      onChange={(value) => {
                        filterresult(value);
                      }}
                    />
                  </Popover>

                  <Button
                    icon={ChartVerticalIcon}
                    onClick={() => navigate("/app/reveiwpage")}
                  >
                    View Report
                  </Button>
                </InlineGrid>
              </InlineGrid>

              {filteredData?.length <= 0 ? (
                <InlineGrid alignItems="center" gap="200">
                  <Loding />
                </InlineGrid>
              ) : (
                <InlineGrid
                  columns={{
                    xs: "1fr",
                    sm: "1fr 1fr",
                    md: "1fr 1fr 1fr 1fr 1fr",
                  }}
                  alignItems="center"
                  gap="200"
                >
                  {filteredData.map((element, idx) => (
                    <DeshboardCard key={idx} element={element} />
                  ))}
                </InlineGrid>
              )}
              <InlineGrid
                columns={{
                  xs: "1fr",
                  sm: "3fr  ",
                  md: "2fr auto",
                }}
                gap="200"
              >
                <Card>
                  <InlineStack gap="200" align="start">
                    <Box>
                      <Text as="h2" variant="headingMd">
                        Widgets
                      </Text>
                    </Box>
                    <InlineStack gap="100">
                      <Badge
                        tone="success"
                        progress="complete"
                        toneAndProgressLabelOverride="Status: Published. Your online store is visible."
                      >
                        <s-paragraph>Embed </s-paragraph>
                      </Badge>
                      <Badge
                        tone="success"
                        progress="complete"
                        toneAndProgressLabelOverride="Status: Published. Your online store is visible."
                      >
                        <s-paragraph>1 active</s-paragraph>
                      </Badge>
                    </InlineStack>
                  </InlineStack>
                </Card>
                <Card>
                  <InlineGrid columns="auto auto" gap="150" align="center">
                    <Text as="h2" variant="headingSm">
                      Request
                    </Text>
                    <Badge
                      tone="success"
                      progress="complete"
                      toneAndProgressLabelOverride="Status: Published. Your online store is visible."
                    >
                      <s-paragraph>Requests enabled</s-paragraph>
                    </Badge>
                  </InlineGrid>
                </Card>
              </InlineGrid>
            </BlockStack>
          </Card>
        </Page>
        <Page>
          <Box padding="300">
            <InlineGrid
              gap="400"
              columns={{
                xs: "1fr",
                sm: "1fr ",
                md: "auto auto",
              }}
            >
              {ReviewInlineCardArray.map((card, index) => (
                <ReviewInlineCard key={index} card={card} />
              ))}
            </InlineGrid>
          </Box>
        </Page>
        <Page>
          {deshboardImages.map((element, index) => (
            <DeshboardimageWithText key={index} card={element} />
          ))}
        </Page>
      </AppProvider>
    </>
  );
}
