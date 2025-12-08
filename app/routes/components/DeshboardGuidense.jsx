import React, { useState } from "react";
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

import { useNavigate } from "react-router";

// import widget Card component from InstallWidgetsCard
import InstallWidgetsCard from "./InstallWidgetsCard";
function DashboardGuidance() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [importexpanded, setImportExpanded] = useState(false);


  const shopDomin = JSON.parse(sessionStorage.getItem('app-bridge-config')).shop.split(".")[0];
  const embedId = "03fdd7d0352cc3b1184544f7e2c783be";
  const navigate = useNavigate();

  // function to toggle guidense page
  const toggle = () => {
    setOpen(!open);
  }

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
          onClick: () =>navigate("/app/reviewWidgets")
          ,
        },
      ],
    },

    {
      title: "Add store logo and check email styling",
      description: "Add store logo and check email styling",
      buttons: [
        {
          label: "Edit email template styling",
          variant: "primary",
          tone: "base",
          onClick: () => console.log("Upload clicked"),
        },
      ],
    },

    {
      title: "Review request schedule",
      description: "Review request schedule",
      buttons: [
        {
          label: "Review schedule",
          variant: "primary",
          tone: "base",
          onClick: () => console.log("Upload clicked"),
        },
      ],
    },

    {
      title: "Personalize review request email",
      description:
        "Edit your subject line, header text, and more to create on-brand email requests.",
      buttons: [
        {
          label: "Customize Email",
          variant: "primary",
          tone: "base",
          onClick: () => console.log("Upload clicked"),
        },
      ],
    },

    {
      title: "Grab your free Judge.me Awesome trial",
      description:
        "Try all premium features free for 15 days - If you love it, you can keep it for just $15/month.",
      buttons: [
        {
          label: "Start free trial",
          variant: "primary",
          tone: "base",
          onClick: () => console.log("Upload clicked"),
        },
        {
          label: "Dismiss",
          tone: "plain",
          onClick: () => console.log("Upload clicked"),
        },
      ],
    },
  ];
  // temparery array to show import reviews options

  const ImportCards = [
    {
      title: "Import reviews from your previous reviews app",
      description: "Bring your existing reviews over from apps like Loox, Stamped, or Yotpo.",
      buttons: [
        {
          label: "Get Start",
          variant: "primary",
          tone: "base",
          onClick: () => console.log("Upload clicked"),
        }
      ],
    },

    {
      title: "Import reviews from  shapreadsheet or previous store",
      description: "uplode a spreadsheet file in bulk import reviews.",
      buttons: [
        {
          label: "Get start",
          variant: "primary",
          tone: "base",
          onClick: () => console.log("Widget settings clicked"),
        },
      ],
    },

    {
      title: "Import Amozone reviews",
      description: "Import reviews for your products from Amazon.",
      buttons: [
        {
          label: "Get start",
          variant: "primary",
          tone: "base",
          onClick: () => console.log("Upload clicked"),
        },
      ],
    },

    {
      title: "Import AliExpress reviews",
      description: "Import reviews for your products from AliExpress.",
      buttons: [
        {
          label: "Get start",
          variant: "primary",
          tone: "base",
          onClick: () => console.log("Upload clicked"),
        },
      ],
    },

    {
      title: "Import Etsy reviews",
      description: "Display your Etsy reviews in your Shopify store with Judge.me.",
      buttons: [
        {
          label: "Get start",
          variant: "primary",
          tone: "base",
          onClick: () => console.log("Upload clicked"),
        },
      ],
    },

    {
      title: "Import Google Business reviews",
      description: "Add social proof from your Google Business profile directly to your Judge.me widgets.",
      buttons: [
        {
          label: "Get start",
          variant: "primary",
          tone: "base",
          onClick: () => console.log("Upload clicked"),
        }
      ],
    },
  ];

  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        {/* Top row: progress + menu */}
        <InlineGrid columns="1fr auto" padding="@container(inline-size >500px) large-400,small">
          <Text as="span" variant="bodySm">
            3 of 6 tasks complete
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
      <Box paddingBlockStart="300">
        <Divider borderColor="border" />
      </Box>
      {expanded && (
        <Box>

          <Box paddingBlock="200">
            {widgetCards.map((card, index) => (
              <InstallWidgetsCard key={index} {...card} />
            ))}

            <Divider />

            <Box marginBlockStart="2000" paddingBlockStart="200">

              <InlineGrid columns="1fr auto" padding="@container(inline-size >500px) large-400,small" alignItems="center">
                <Text as="h2" variant="headingMd" >
                  Import Reviews
                </Text>

                <InlineGrid columns="auto auto" gap="100">
                  <Popover
                    activator={
                      <Button
                        fullWidth
                        variant="base"
                        disclosure={importexpanded ? "up" : "down"}
                        onClick={() => setImportExpanded(!importexpanded)}
                        incon={importexpanded}
                      />
                    }
                  ></Popover>
                </InlineGrid>
              </InlineGrid>
            </Box>

            {importexpanded && (

              <Box paddingBlock="200">
                {ImportCards.map((card, index) => (
                  <InstallWidgetsCard key={index} {...card} />
                ))}

              </Box>
            )}
          </Box>
        </Box>
      )}
    </Card>
  );
}

export default DashboardGuidance;
