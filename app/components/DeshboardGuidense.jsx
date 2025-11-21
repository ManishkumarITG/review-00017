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
import {
  MenuHorizontalIcon,
} from "@shopify/polaris-icons";
import '@shopify/polaris/build/esm/styles.css';

import InstallWidgetsCard from "./InstallWidgetsCard";
function DashboardGuidance() {
  const [open, setOpen] = useState(false);
  const [importopen, setImportOpen] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const [importexpanded, setImportExpanded] = useState(false);

  const toggle = () => {
    setOpen(!open);
    // setImportOpen(!importopen)
  }
  const [panelState, setPanelState] = useState({
    customize_widget: false,
    add_store_logo: false,
    review_request_schedule: false,
    personalize_email: false,
    free_trial: false,
  });

  const togglePanel = (pannelId) => {
    setPanelState((prev) => ({
      ...prev,
      [pannelId]: !prev[pannelId],
    }));
  };
  const widgetCards = [
    {
      title: "Install Review Widget and Star Rating Badge",
      description:
        "Display reviews and star ratings on the product page by enabling the Judge.me widgets in your Shopify theme.",
      isOpen: panelState["customize_widget"],
      buttons: [
        {
          label: "Install Review Widget",
          variant: "primary",
          tone: "base",
          onClick: () => console.log("Upload clicked"),
        },
        {
          label: "Install Star Rating Badge",
          onClick: () => console.log("Upload clicked"),
        },
      ],
    },

    {
      pannelId: "customize_widget",
      onToggle: togglePanel,
      isOpen: panelState["customize_widget"],
      title: "Customize the review widget",
      description:
        "Change the look and feel of your review display to match your brand.",
      buttons: [
        {
          label: "Go to widget settings",
          variant: "primary",
          tone: "base",
          onClick: () => console.log("Widget settings clicked"),
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

  const ImportCards = [
    {
      title: "Install Review Widget and Star Rating Badge",
      description:
        "Display reviews and star ratings on the product page by enabling the Judge.me widgets in your Shopify theme.",
      isOpen: panelState["customize_widget"],
      buttons: [
        {
          label: "Install Review Widget",
          variant: "primary",
          tone: "base",
          onClick: () => console.log("Upload clicked"),
        },
        {
          label: "Install Star Rating Badge",
          onClick: () => console.log("Upload clicked"),
        },
      ],
    },

    {
      pannelId: "customize_widget",
      onToggle: togglePanel,
      isOpen: panelState["customize_widget"],
      title: "Customize the review widget",
      description:
        "Change the look and feel of your review display to match your brand.",
      buttons: [
        {
          label: "Go to widget settings",
          variant: "primary",
          tone: "base",
          onClick: () => console.log("Widget settings clicked"),
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
        // <Box paddingBlock="200">
        //   <InstallWidgetsCard
        //     title=" Install Review Widget and Star Rating Badge"
        //     description=" Display reviews and star ratings on the product page by enabling the Judge.me widgets in your Shopify theme."
        //     buttons={[
        //       {
        //         label: "Install Review Widget",
        //         variant: "primary",
        //         tone: "base",
        //         onClick: () => console.log("Upload clicked"),
        //       },
        //       {
        //         label: "Install Star Rating Badge",
        //         // variant: "primary",
        //         // tone: "base",
        //         onClick: () => console.log("Upload clicked"),
        //       },
        //     ]}
        //     isOpen={panelState["customize_widget"]}
        //   />
        //   <InstallWidgetsCard
        //     pannelId="customize_widget"
        //     onToggle={togglePanel}
        //     isOpen={panelState["customize_widget"]}
        //     title="Customize the review widget"
        //     description="Change the look and feel of your review display to match your brand."
        //     buttons={[
        //       {
        //         label: "Go to widget settings",
        //         variant: "primary",
        //         tone: "base",
        //         onClick: () => console.log("Widget settings clicked"),
        //       },
        //     ]}
        //   />
        //   <InstallWidgetsCard
        //     title=" Add store logo and check email styling"
        //     description="Add store logo and check email styling"
        //     buttons={[
        //       {
        //         label: "Edit email template styling",
        //         variant: "primary",
        //         tone: "base",
        //         onClick: () => console.log("Upload clicked"),
        //       },
        //     ]}
        //   />

        //   <InstallWidgetsCard
        //     title="Review request schedule"
        //     description=" Review request schedule"
        //     buttonprimary="Review  schedule"
        //     buttons={[
        //       {
        //         label: "Review  schedule",
        //         variant: "primary",
        //         tone: "base",
        //         onClick: () => console.log("Upload clicked"),
        //       },
        //     ]}
        //   />
        //   <InstallWidgetsCard
        //     title="Personalize review request email"
        //     description="Edit your subject line, header text, and more to create on-brand email requests."
        //     buttonprimary="Customize Email"
        //     buttons={[
        //       {
        //         label: "Customize Email",
        //         variant: "primary",
        //         tone: "base",
        //         onClick: () => console.log("Upload clicked"),
        //       },
        //     ]}
        //   />
        //   <InstallWidgetsCard
        //     title=" Grab your free Judge.me Awesome trial"
        //     description="Try all premium features free for 15 days - If you love it, you can keep it for just $15/month."
        //     buttons={[
        //       {
        //         label: "Start free trial",
        //         variant: "primary",
        //         tone: "base",
        //         onClick: () => console.log("Upload clicked"),
        //       },
        //       {
        //         label: "Dismiss",
        //         // variant: "primary",
        //         tone: "base",
        //         onClick: () => console.log("Upload clicked"),
        //       },
        //     ]}
        //   />
        // </Box>
        <Box>

          <Box paddingBlock="200">
            {widgetCards.map((card, index) => (
              <InstallWidgetsCard key={index} {...card} />
            ))}
            <Divider />

            <InlineGrid columns="1fr auto" padding="@container(inline-size >500px) large-400,small">
              <Text as="span" variant="bodySm">
                3 of 6 tasks complete
              </Text>

              <InlineGrid columns="auto auto" gap="100">
                <Popover
                  active={importopen}
                  activator={
                    <Button
                      variant="headingMd"
                      icon={MenuHorizontalIcon}
                    // onClick={toggle}
                    />
                  }
                // onClose={toggle}
                >
                  <ActionList items={[{ content: "Dismiss setup Guide" }]} />
                </Popover>

                <Popover
                  activator={
                    <Button
                      fullWidth
                      variant="base"
                      disclosure={expanded ? "up" : "down"}
                      onClick={() => setImportExpanded(!importexpanded)}
                      incon={importexpanded}
                    />
                  }
                ></Popover>
              </InlineGrid>
            </InlineGrid>

            <Box paddingBlock="200">
              {widgetCards.map((card, index) => (
                <InstallWidgetsCard key={index} {...card} />
              ))}

            </Box>
          </Box>

        </Box>


      )}
    </Card>
  );
}

export default DashboardGuidance;
