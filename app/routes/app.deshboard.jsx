import React, { useState } from "react";
import { BlockStack, Button, Card, Page, InlineGrid, Text, Popover, OptionList, InlineStack, Badge, Box, Image, } from "@shopify/polaris";
import { AppProvider } from "@shopify/polaris"
import en from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/build/esm/styles.css";
import { CalendarIcon, PlusIcon, ChartVerticalIcon, } from '@shopify/polaris-icons';
import DeshboardCard from "../components/deshboardCard";
import ReviewInlineCard from "../components/ReviewInlineCard";
import DeshboardGuidense from "../components/DeshboardGuidense";
import DeshboardimageWithText from "../components/DeshboardImageWithText";
export default function Deshboard() {

    const ranges = [
        {
            title: "Last 30 days",
            alias: "Last 30 days",
            period: {
                since: "Last 30 days",
                until: "Last 30 days",
            },
        },
        {
            title: "Yesterday",
            alias: "yesterday",
            period: {
                since: "yesterday",
                until: "yesterday",
            },
        },
        {
            title: "Today",
            alias: "today",
            period: {
                since: "today",
                until: "today",
            },
        },
        {
            title: "Last 7 days",
            alias: "last7days",
            period: {
                since: "-7d",
                until: "-1d",
            },
        },
        {
            title: "Last 30 days",
            alias: "last30days",
            period: {
                since: "-30d",
                until: "-1d",
            },
        },
        {
            title: "Last 90 days",
            alias: "last90days",
            period: {
                since: "-90d",
                until: "-1d",
            },
        },
        {
            title: "Last 12 months",
            alias: "last12months",
            period: {
                since: "-12m",
                until: "-1d",
            },
        },
        {
            title: "All time",
            alias: "alltime",
            period: null,
        },
        {
            title: "Custom",
            alias: "custom",
            period: null,
        },
    ];

    const [selected, setSelected] = useState(ranges[0]);
    const [popoverActive, setPopoverActive] = useState(false);
    return (
        <AppProvider i18n={en}>
            <Page>
                <DeshboardGuidense />

            </Page>
            <Page>
                <Card roundedAbove="sm">
                    <BlockStack gap="200">
                        <InlineGrid columns="1fr auto">
                            <Text as="h2" variant="headingMd">
                                Welcome to Judge.me
                            </Text>
                            <InlineGrid columns="auto auto" gap="100" align="center">

                                <Popover
                                    autofocusTarget="none"
                                    preferredAlignment="left"
                                    preferInputActivator={false}
                                    preferredPosition="below"
                                    activator={
                                        <Button
                                            onClick={() => setPopoverActive(!popoverActive)}
                                            icon={CalendarIcon}
                                        >
                                            {selected.title}
                                        </Button>
                                    }
                                    active={popoverActive}
                                >
                                    <OptionList
                                        options={ranges.map((range) => ({
                                            value: range.alias,
                                            label: range.title,
                                        }))}
                                        selected={selected.alias}
                                        onChange={(value) => {
                                            setSelected(ranges.find((range) => range.alias === value[0]));
                                            setPopoverActive(false);
                                        }}
                                    />
                                </Popover>
                                
                                <Button icon={ChartVerticalIcon}>View Report</Button>
                            </InlineGrid>
                        </InlineGrid>
                        <InlineGrid columns="1fr 1fr 1fr 1fr 1fr " gap="200">

                            <DeshboardCard title="Reviews" number="0" percentage="0" />
                            <DeshboardCard title="Average Rating" number="0" percentage="0" />
                            <DeshboardCard title="Request Sent" number="0" percentage="0" />
                            <DeshboardCard title="Revenue form" number="$0" percentage="0" />
                            <Card>
                                <Text as="h2" variant="headingSm">
                                    Trust score
                                </Text>
                                <Text as="p" variant="small">
                                    Transparency
                                </Text>
                                <Text as="p" variant="small">
                                    Authenticity
                                </Text>
                            </Card>
                        </InlineGrid>

                        <InlineGrid columns="1fr auto" gap="200">
                            <Card>
                                <InlineStack gap="200" align="start">
                                    <Box>
                                        <Text as="h2" variant="headingMd">
                                            Widgets
                                        </Text>

                                    </Box>
                                    <InlineStack gap="100">

                                        <Badge tone="success"
                                            progress="complete"
                                            toneAndProgressLabelOverride="Status: Published. Your online store is visible."
                                        >
                                            <s-paragraph>Embed  </s-paragraph>
                                        </Badge>
                                        <Badge tone="success"
                                            progress="complete"
                                            toneAndProgressLabelOverride="Status: Published. Your online store is visible."
                                        ><s-paragraph>1 active</s-paragraph></Badge>
                                    </InlineStack>

                                </InlineStack>

                            </Card>
                            <Card>
                                <InlineGrid columns="auto auto" gap="150" align="center">

                                    <Text as="h2" variant="headingSm">
                                        Request
                                    </Text>
                                    <Badge tone="success"
                                        progress="complete"
                                        toneAndProgressLabelOverride="Status: Published. Your online store is visible."
                                    >
                                        <s-paragraph>
                                            Requests enabled
                                        </s-paragraph>
                                    </Badge>

                                </InlineGrid>
                            </Card>
                        </InlineGrid>
                    </BlockStack>

                </Card>
            </Page>
            <Page>
                <InlineGrid gap="400" align="start" columns="1fr 1fr">
                    {/* Top Products Card */}
                    <ReviewInlineCard title="Top products" imageurl="https://pub-images.judge.me/judgeme/empty-product" buttontext="View all reviews " textcontent="A list of top reviewed products will show here. " />
                    <ReviewInlineCard title="Top products" imageurl="https://pub-images.judge.me/judgeme/empty-review" buttontext="Request reviews" textcontent="You can view your recent reviews here.<" />
                </InlineGrid>
            </Page>
            <Page>
                <DeshboardimageWithText
                    title="Build trust. Grow sales. Try Awesome FREE."
                    imageurl="https://assets.judge.me/core/cover/awesome-2025.webp"
                    buttontext="Explore features"
                    textcontent="Get more reviews, build trust and grow store visits. Increase retention & referrals. FREE for 15 days and then just $15/month. Cancel anytime." />
            </Page>
        </AppProvider>
    );
}





