import { useCallback, useEffect, useState } from "react";
import {
  Card,
  BlockStack,
  InlineGrid,
  Text,
  Button,
  Banner,
  Box,
} from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router";

// import widget Card component from InstallWidgetsCard
import InstallWidgetsCard from "./InstallWidgetsCard";
import { useAppBridge } from "@shopify/app-bridge-react";
import { getSetupStatus } from "../services/api";

// Setup guide is compulsory: steps are verified against the shop (theme
// files + saved settings) instead of self-checked, and there is no dismiss.
function DashboardGuidance({ onStatusChange }) {
  const [expanded, setExpanded] = useState(true);
  const [shopDomin, setShopDomain] = useState("");
  const [status, setStatus] = useState(null);
  const [verifying, setVerifying] = useState(false);
  const shopify = useAppBridge();

  const { t } = useTranslation();

  const embedId = "03fdd7d0352cc3b1184544f7e2c783be";
  const navigate = useNavigate();

  const verify = useCallback(async () => {
    setVerifying(true);
    try {
      const data = await getSetupStatus();
      if (data) {
        setStatus(data);
        onStatusChange?.(data);
      }
    } finally {
      setVerifying(false);
    }
  }, [onStatusChange]);

  useEffect(() => {
    const shopDomin = shopify.config.shop.split(".")[0];
    setShopDomain(shopDomin);
  }, []);

  useEffect(() => {
    verify();
  }, []);

  // Re-verify when the merchant comes back from the theme editor tab.
  useEffect(() => {
    window.addEventListener("focus", verify);
    return () => window.removeEventListener("focus", verify);
  }, [verify]);

  const widgetCards = [
    {
      completed: status?.widgetInstalled === true,
      title: t("DashboardGuidance.WidgetCards.InstallReviewWidget.Title"),
      description: t(
        "DashboardGuidance.WidgetCards.InstallReviewWidget.Description",
      ),
      buttons: [
        {
          label: t(
            "DashboardGuidance.WidgetCards.InstallReviewWidget.Buttons.ReviewWidget",
          ),
          variant: "primary",
          tone: "base",
          onClick: () =>
            window.open(
              `https://admin.shopify.com/store/${shopDomin}/themes/current/editor?template=page&addAppBlockId=${embedId}/review-widget`,
              "_blank",
            ),
        },
        {
          label: t(
            "DashboardGuidance.WidgetCards.InstallReviewWidget.Buttons.StarRatingBadge",
          ),
          onClick: () =>
            window.open(
              `https://admin.shopify.com/store/${shopDomin}/themes/current/editor?context=apps&activateAppId=${embedId}/Product_review`,
              "_blank",
            ),
        },
      ],
    },

    {
      completed: status?.widgetCustomized === true,
      title: t("DashboardGuidance.WidgetCards.CustomizeWidget.Title"),
      description: t(
        "DashboardGuidance.WidgetCards.CustomizeWidget.Description",
      ),
      buttons: [
        {
          label: t(
            "DashboardGuidance.WidgetCards.CustomizeWidget.Buttons.GoToSettings",
          ),
          variant: "primary",
          tone: "base",
          onClick: () => navigate("/app/reviewWidgets"),
        },
      ],
    },
  ];

  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        {/* Top row: progress + verify + expand toggle */}
        <InlineGrid
          columns="1fr auto"
          padding="@container(inline-size >500px) large-400,small"
        >
          <Text as="span" variant="bodySm">
            {t("DashboardGuidance.TaskProgress", {
              completed: status?.completedCount ?? 0,
              total: status?.total ?? 2,
            })}
          </Text>

          <InlineGrid columns="auto auto" gap="100">
            <Button onClick={verify} loading={verifying}>
              {t("DashboardGuidance.VerifyButton")}
            </Button>

            <Button
              disclosure={expanded ? "up" : "down"}
              onClick={() => setExpanded(!expanded)}
            />
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

        {status && !status.completed && (
          <Banner tone="warning">
            {t("DashboardGuidance.RequiredBanner")}
          </Banner>
        )}
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
