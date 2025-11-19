import React, { useState, useCallback } from "react";
import {
  AppProvider,
  Card,
  Tabs,
  Page,
  Box,
  Text,
  LegacyCard,
  LegacyTabs,
} from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import {
  EmailIcon,
  SearchIcon,
  StarFilledIcon,
  StarIcon,
} from "@shopify/polaris-icons";
import ReviewRequest from "../components/ReviewRequest";
export default function AppReview() {
  const [selected, setSelected] = useState(0);

  const tabs = [
    {
      id: "all-customers-1",
      content: (
        <Box style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <StarFilledIcon width="18" /> Rewiew
        </Box>
      ),
      accessibilityLabel: "All customers",
      panelID: "all-customers-content-1",
    },
    {
      id: "accepts-marketing-1",
      content: (
        <Box style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <EmailIcon width="18" /> Reviewe Requested
        </Box>
      ),
      panelID: "accepts-marketing-content-1",
    },
    {
      id: "repeat-customers-1",
      content: (
        <Box style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <SearchIcon width="18" /> Costomers Question
        </Box>
      ),
      panelID: "repeat-customers-content-1",
    },
  ];

  const handleTabChange = (selectedTabIndex) => {
    setSelected(selectedTabIndex);
    console.log(selectedTabIndex);

  };

  return (
    <AppProvider>
      <Page fullWidth={true}>
        <Card padding="50">
          <LegacyTabs
            tabs={tabs}
            selected={selected}
            onSelect={handleTabChange}
          ></LegacyTabs>
        </Card>

        <Page fullWidth={true} >
          {
            tabs[selected].id === "all-customers-1" && (
              <Card padding="500">

                <Text as="p">Review Content</Text>
              </Card>
            )
          }
          {
            tabs[selected].id === "accepts-marketing-1" && (
              <ReviewRequest />
            )
          }
          {
            tabs[selected].id === "repeat-customers-1" && (
              <Card padding="500">
                <Text as="p" >Customer Question </Text>
              </Card>
            )
          }
        </Page>




      </Page>
    </AppProvider>
  );
}
