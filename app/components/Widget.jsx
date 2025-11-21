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
import "./style.css";
import { simplifiedMediaCardData } from "../data/reviewData";

export default function Widget() {
  const [selected, setSelected] = useState("today");

  const handleSelectChange = useCallback((value) => setSelected(value), []);

  const options = [
    { label: "Change theme", value: "Change theme" },
    { label: "Horizon", value: "Horizon <live>" },
    { label: "Horizon", value: "Horizon" },
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
