import React, { useCallback, useState } from 'react'
import { Card, Tabs, Page, Button, Text, Box, InlineStack, Badge } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
export default function Coordinator() {
    const [selected, setSelected] = useState(0);


    const handleTabChange = useCallback((selectedTabIndex) => {
        setSelected(selectedTabIndex);
    }, []);


    const tabs = [
        {
            id: 'all-customers-4',
            content: 'All',
            accessibilityLabel: 'All customers',
            panelID: 'all-customers-content-4',
        },
        {
            id: 'accepts-marketing-4',
            content: 'Accepts marketing',
            panelID: 'accepts-marketing-content-4',
        },
        {
            id: 'repeat-customers-4',
            content: 'Repeat customers',
            panelID: 'repeat-customers-content-4',
        },
        {
            id: 'prospects-4',
            content: 'Prospects',
            panelID: 'prospects-content-4',
        },
    ];


    const renderTabContent = () => {
        switch (selected) {
            case 0:
                return <AllCustomers />;
            case 1:
                return <AcceptsMarketing />;
            case 2:
                return <RepeatCustomers />;
            case 3:
                return <Prospects />;
            default:
                return null;
        }
    };


    return (
        <Page>
            <style>{`
        .Polaris-Tabs__Tab--selected {
          background: #d1f7d6 !important;   /* light green */
          border-radius: 6px;
        }
        .Polaris-Tabs__Tab {
          transition: 0.2s;
        }
           `}</style>

            <InlineStack distribution="space-between" align="center">
                <Box>
                    <Text variant="headingLg" as="h2"></Text>
                    <Badge tone="success" variant="outline">
                        Auto Publish
                    </Badge>
                </Box>
                <Box>
                    <Button>
                        Import
                    </Button>
                    <Button>
                        Publish an Mordarate
                    </Button>
                    <Button>
                        Edit product review  group
                    </Button>
                    <Button>
                        Export
                    </Button>
                </Box>

            </InlineStack>
            <LegacyCard>
                <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                    <LegacyCard.Section title={tabs[selected].content}>
                        {renderTabContent()}
                    </LegacyCard.Section>
                </Tabs>
            </LegacyCard>


        </Page>
    )
}
