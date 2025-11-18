import React from "react";
import { AppProvider, Card, Tabs } from "@shopify/polaris";
import { useState, useCallback } from "react";
import "@shopify/polaris/build/esm/styles.css";

function AppReview() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: "all-customers-1",
      content: "All",
      accessibilityLabel: "All customers",
      panelID: "all-customers-content-1",
    },
    {
      id: "accepts-marketing-1",
      content: "Accepts marketing",
      panelID: "accepts-marketing-content-1",
    },
    {
      id: "repeat-customers-1",
      content: "Repeat customers",
      panelID: "repeat-customers-content-1",
    },
    {
      id: "prospects-1",
      content: "Prospects",
      panelID: "prospects-content-1",
    },
  ];

  return (
    <AppProvider>
      <Card>
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}></Tabs>
      </Card>
    </AppProvider>
  );
}

export default AppReview;
