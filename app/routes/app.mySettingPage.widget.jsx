import React, { useCallback, useState } from "react";
import {
  Card,
  Tabs,
  Page,
  Button,
  Text,
  Box,
  AppProvider,
  Select,
  MediaCard,
  InlineGrid,
  Badge,
} from "@shopify/polaris";

import { CaretDownIcon } from "@shopify/polaris-icons";
import "../components/style.css";

export default function Widget() {
  const [selected, setSelected] = useState("today");

  const handleSelectChange = useCallback((value) => setSelected(value), []);

  const options = [
    { label: "Change theme", value: "Change theme" },
    { label: "Horizon", value: "Horizon <live>" },
    { label: "Horizon", value: "Horizon" },
  ];

  const simplifiedMediaCardData = [
    {
      title: "Review Widget",
      description: "Collect and display product reviews on your product pages.",
      imageSrc: "https://pub-images.judge.me/judgeme/review-widget-2025",
      key: 1,
    },
    {
      title: "Photo & Video Reviews",
      description: "Boost conversion with rich media reviews from customers.",
      imageSrc: "https://pub-images.judge.me/judgeme/photo-video-reviews",
      key: 2,
    },
    {
      title: "Carousel & Badges",
      description:
        "Showcase your best reviews on your homepage using carousels.",
      imageSrc: "https://pub-images.judge.me/judgeme/carousel-badges",
      key: 3,
    },
    {
      title: "Q&A (Questions & Answers)",
      description:
        "Allow customers to ask and answer questions directly on the product page.",
      imageSrc: "https://pub-images.judge.me/judgeme/qna-widget",
      key: 4,
    },
    {
      title: "Google Shopping Feed",
      description:
        "Synchronize review stars with your Google Shopping listings.",
      imageSrc: "https://pub-images.judge.me/judgeme/google-shopping",
      key: 5,
    },
    {
      title: "Product Sharing",
      description:
        "Encourage customers to share their great reviews on social media.",
      imageSrc: "https://pub-images.judge.me/judgeme/social-sharing",
      key: 6,
    },
    {
      title: "All Reviews Page",
      description:
        "Display all collected reviews in a dedicated, searchable page.",
      imageSrc: "https://pub-images.judge.me/judgeme/all-reviews-page",
      key: 7,
    },
    {
      title: "All Reviews Page",
      description:
        "Display all collected reviews in a dedicated, searchable page.",
      imageSrc: "https://pub-images.judge.me/judgeme/all-reviews-page",
      key: 8,
    },
  ];
  return (
    <AppProvider>
      <Page
        title="Widgets"
        fullWidth={true}
        prefix={<CaretDownIcon />}
        padding="0"
        primaryAction={
          <Select
            options={options}
            onChange={handleSelectChange}
            value={selected}
          />
        }
      >
        <InlineGrid gap="400" columns={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 3 }}>
          {simplifiedMediaCardData.map((card) => (
            <MediaCard
              key={card.key}
              title={
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "5px",
                  }}
                >
                  {card.title}
                  <Badge
                    tone="success"
                    progress="complete"
                    toneAndProgressLabelOverride="Status: Published. Your online store is visible."
                  >
                    install
                  </Badge>
                </Box>
              }
              portrait={true}
              primaryAction={{
                content: "Customize",
                onAction: () => {},
              }}
              description={card.description}
            >
              <img
                alt=""
                width="100%"
                height="100%"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                src="https://pub-images.judge.me/judgeme/review-widget-2025"
              />
            </MediaCard>
          ))}
        </InlineGrid>
      </Page>
    </AppProvider>
  );
}
