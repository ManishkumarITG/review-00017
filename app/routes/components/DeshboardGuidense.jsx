import React, { useEffect, useState } from "react";
import {
  Card,
  BlockStack,
  InlineGrid,
  Text,
  Popover,
  ActionList,
  Button,
  Divider,
  Box,
} from "@shopify/polaris";
// import icon from @shopify/polarise-icons
import {
  MenuHorizontalIcon,
} from "@shopify/polaris-icons";
import '@shopify/polaris/build/esm/styles.css';
import { useTranslation } from "react-i18next";


import { useNavigate } from "react-router";

// import widget Card component from InstallWidgetsCard
import InstallWidgetsCard from "./InstallWidgetsCard";
import { useAppBridge } from "@shopify/app-bridge-react";
function DashboardGuidance() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [shopDomin, setShopDomain] = useState("")
  const [taskCompleted, settaskCompleted] = useState([])
  const shopify = useAppBridge()

  const { t } = useTranslation()

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
      pannelId: "Star Rating Badge",
      title: t("DashboardGuidance.WidgetCards.InstallReviewWidget.Title"),
      description:
        t("DashboardGuidance.WidgetCards.InstallReviewWidget.Description"),
      buttons: [
        {
          label: t("DashboardGuidance.WidgetCards.InstallReviewWidget.Buttons.ReviewWidget"),
          variant: "primary",
          tone: "base",
          onClick: () => window.open(`https://admin.shopify.com/store/${shopDomin}/themes/current/editor?template=page&addAppBlockId=${embedId}/review-widget`, "_blank"),
        },
        {
          label: t(
            "DashboardGuidance.WidgetCards.InstallReviewWidget.Buttons.StarRatingBadge"
          ),
          onClick: () => window.open(`https://admin.shopify.com/store/${shopDomin}/themes/current/editor?context=apps&activateAppId=${embedId}/Product_review`, "_blank"),
        },
      ],
    },

    {
      pannelId: "customize_widget",
      title: t("DashboardGuidance.WidgetCards.CustomizeWidget.Title"),
      description: t(
        "DashboardGuidance.WidgetCards.CustomizeWidget.Description"
      ),
      buttons: [
        {
          label: t("DashboardGuidance.TaskProgress", { completed: 1, total: 6 }),
          variant: "primary",
          tone: "base",
          onClick: () => navigate("/app/reviewWidgets")
          ,
        },
      ],
    },
  ];


  const SaveCheckBoxData = (data) => {
    settaskCompleted((prev) => {
      if (prev.includes(data)) {
        return prev.filter((item) => item !== data);
      };
        return [...prev, data];
    });
  }

  const CheckboxCountFromInstallPage = (data) => {
    SaveCheckBoxData(data)
  };



  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        {/* Top row: progress + menu */}
        <InlineGrid columns="1fr auto" padding="@container(inline-size >500px) large-400,small">
          <Text as="span" variant="bodySm">
            {taskCompleted.length} of 2 tasks complete
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
              <ActionList items={[{ content: t("DashboardGuidance.DismissGuide") }]} />
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
          {t("DashboardGuidance.SetupGuideTitle")}
        </Text>

        {/* Description */}
        <Text as="p" variant="bodyMd" tone="subdued">
          {t("DashboardGuidance.SetupGuideDescription")}
        </Text>
      </BlockStack>
      {expanded && (
        <Box>

          <Box paddingBlock="200">
            {widgetCards.map((card, index) => (
              <InstallWidgetsCard key={index} {...card} sendData={CheckboxCountFromInstallPage} />
            ))}
          </Box>
        </Box>
      )}
    </Card>
  );
}

export default DashboardGuidance;
