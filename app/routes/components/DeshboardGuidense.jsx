import React, { useEffect, useState } from "react";
import {
  Card,
  BlockStack,
  InlineGrid,
  Text,
  Popover,
  ActionList,
  Button,
  Box,
} from "@shopify/polaris";
// import icon from @shopify/polarise-icons
import {
  MenuHorizontalIcon,
} from "@shopify/polaris-icons";
import { useTranslation } from "react-i18next";
import '@shopify/polaris/build/esm/styles.css';

import { useNavigate } from "react-router";

// import widget Card component from InstallWidgetsCard
import InstallWidgetsCard from "./InstallWidgetsCard";
import { useAppBridge } from "@shopify/app-bridge-react";
function DashboardGuidance() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [importexpanded, setImportExpanded] = useState(false);
  const [shopDomin, setShopDomain] = useState("")
  const shopify = useAppBridge()

  const {t} = useTranslation()
  const embedId = "03fdd7d0352cc3b1184544f7e2c783be";
  const navigate = useNavigate();

  // function to toggle guidense page
  const toggle = () => {
    setOpen(!open);
  }

  useEffect(() => {
    const shopDomin = shopify.config.shop.split(".")[0];
    setShopDomain(shopDomin);
  }, []);

  // temparery array to show guidense options
  const widgetCards = [
    {
      title: "Install Review Widget and Star Rating Badge",
      description:
        "Display reviews and star ratings on the product page by enabling the Judge.me widgets in your Shopify theme.",
      buttons: [
        {
          label: "Install Review Widget",
          variant: "primary",
          tone: "base",
          onClick: () => window.open(`https://admin.shopify.com/store/${shopDomin}/themes/current/editor?template=page&addAppBlockId=${embedId}/review-widget`, "_blank"),
        },
        {
          label: "Install Star Rating Badge",
          onClick: () => window.open(`https://admin.shopify.com/store/${shopDomin}/themes/current/editor?context=apps&activateAppId=${embedId}/Product_review`, "_blank"),
        },
      ],
    },

    {
      pannelId: "customize_widget",
      title: "Customize the review widget",
      description:
        "Change the look and feel of your review display to match your brand.",
      buttons: [
        {
          label: "Go to widget settings",
          variant: "primary",
          tone: "base",
          onClick: () => navigate("/app/reviewWidgets")
          ,
        },
      ],
    },
  ];

  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        {/* Top row: progress + menu */}
        <InlineGrid columns="1fr auto" padding="@container(inline-size >500px) large-400,small">
          <Text as="span" variant="bodySm">
            {t("Dashboard.Task_progress")}
          </Text>

          <InlineGrid columns="auto auto" gap="100">
            <Popover
              active={open}
              activator={
                <Button
                  variant="headingMd"
                  icon={MenuHorizontalIcon}
                  onClick={toggle}
                />
              }
              onClose={toggle}
            >
              <ActionList items={[{ content: "Dismiss setup Guide" }]} />
            </Popover>

            <Popover
              activator={
                <Button
                  fullWidth
                  variant="base"
                  disclosure={expanded ? "up" : "down"}
                  onClick={() => setExpanded(!expanded)}
                  incon={expanded}
                />
              }
            ></Popover>
          </InlineGrid>
        </InlineGrid>

        {/* Title */}
        <Text as="h2" variant="headingSm">
          Setup guide
        </Text>

        {/* Description */}
        <Text as="p" variant="bodyMd" tone="subdued">
          We'll guide you through importing your reviews and show you how to
          transfer them to your preferred review app.
        </Text>
      </BlockStack>
      {expanded && (
        <Box>

          <Box paddingBlock="200">
            {widgetCards.map((card, index) => (
              <InstallWidgetsCard key={index} {...card} />
            ))}
          </Box>
        </Box>
      )}
    </Card>
  );
}

export default DashboardGuidance;
