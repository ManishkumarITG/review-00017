import {
  Box,
  Text,
  Button,
  InlineStack,
  BlockStack,
  Link,
  Badge,
  Icon,
} from "@shopify/polaris";
import { CheckCircleIcon } from "@shopify/polaris-icons";
import "@shopify/polaris/build/esm/styles.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// One step of the setup guide. Completion is verified by the backend and
// passed in via `completed` — the merchant can no longer tick it manually.
function InstallWidgetsCard({ title, description, buttons = [], completed = false }) {
  const [open, setOpen] = useState(!completed);

  const { t } = useTranslation();

  // Collapse the step once verification marks it complete, expand it while
  // it is still pending.
  useEffect(() => {
    setOpen(!completed);
  }, [completed]);

  return (
    <Box paddingBlockEnd="300">
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setOpen((prev) => !prev);
        }}
        style={{ cursor: "pointer" }}
      >
        <InlineStack gap="200" blockAlign="center" wrap={false}>
          {completed ? (
            <Icon source={CheckCircleIcon} tone="success" />
          ) : (
            <Badge tone="attention">{t("DashboardGuidance.StepPending")}</Badge>
          )}
          <Text
            as="span"
            variant="bodyMd"
            fontWeight={completed ? "regular" : "semibold"}
          >
            {title}
          </Text>
        </InlineStack>
      </div>

      {open && !completed && (
        <Box paddingBlockStart="300" paddingInlineStart="300">
          <BlockStack gap="300">
            <Text>{description}</Text>

            <Text tone="subdued" variant="bodySm">
              {t("DashboardGuidance.VerifyHint")}
            </Text>

            <InlineStack gap="300">
              {buttons.map((btn, index) =>
                btn.tone === "plain" ? (
                  <Link key={index} onClick={btn.onClick}>
                    {btn.label}
                  </Link>
                ) : (
                  <Button
                    key={index}
                    variant={btn.variant}
                    tone={btn.tone}
                    onClick={btn.onClick || (() => {})}
                  >
                    {btn.label}
                  </Button>
                ),
              )}
            </InlineStack>
          </BlockStack>
        </Box>
      )}
    </Box>
  );
}

export default InstallWidgetsCard;
