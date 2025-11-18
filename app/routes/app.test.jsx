import React, { useState } from "react";
import {
  AppProvider,
  Card,
  InlineGrid,
  Tabs,
  Text,
  Box,
  Button,
  BlockStack,
  Page,
} from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import en from "@shopify/polaris/locales/en.json";

export default function ReviewAppSettings() {
  const [selected, setSelected] = useState(0);

  const tabs = [
    { id: "branding", content: "Branding", panelID: "branding-panel" },
    { id: "widgets", content: "Widgets", panelID: "widgets-panel" },
  ];

  return (
    <AppProvider i18n={en}>
      <Page title="Review App Dashboard">
        <InlineGrid columns={['1fr', '3fr']} gap="400">
          
          {/* LEFT PANEL — Tabs */}
          <Card>
            <Card.Header
              title="Settings"
            />
            <Card.Section>
              <Tabs
                tabs={tabs}
                selected={selected}
                onSelect={setSelected}
                fitted
              />
            </Card.Section>
          </Card>

          {/* RIGHT PANEL — Content changes based on selected tab */}
          <BlockStack gap="400">
            <Card>
              <Card.Header title={tabs[selected].content} />
              <Card.Section>
                {selected === 0 && (
                  <>
                    <Text variant="bodyLg" tone="subdued">
                      Customize your branding vibes 🌈
                    </Text>
                    <br />
                    <Button variant="primary">Save Branding</Button>
                  </>
                )}

                {selected === 1 && (
                  <>
                    <Text variant="bodyLg" tone="subdued">
                      Widgets configuration & layout 🔧
                    </Text>
                    <br />
                    <Button variant="primary">Save Widgets</Button>
                  </>
                )}
              </Card.Section>
            </Card>
          </BlockStack>

        </InlineGrid>
      </Page>
    </AppProvider>
  );
}
