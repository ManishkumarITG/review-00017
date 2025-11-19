import React, { useCallback, useState } from 'react'
// import PolarisPkg from '@shopify/polaris';
// const  {InlineStack  } = PolarisPkg;
import { Card, Tabs, Page, Button, Text, Box , Badge ,InlineStack   } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import AllReaviews from "./AllReaviews"
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
                return <AllReaviews />;
            case 1:
                return <Text>Yet to build 2 </Text>;
            case 2:
                return <Text>Yet to build 3</Text>;
            case 3:
                return <Text>Yet to build 4</Text>;
            default:
                return null;
        }
    };


    return (
        <>

            <InlineStack   distribution="space-between" align="center">
                <Box>
                    <Text variant="headingLg" as="h2">sdfdf</Text>
                    <Badge tone="success" variant="outline">
                        Auto Publish
                    </Badge>
                </Box>
                <InlineStack   gap="2">
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
                </InlineStack  >

            </InlineStack  >

            <Card>
                <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                    <Card.Section title={tabs[selected].content}>
                        {renderTabContent()}
                    </Card.Section>
                </Tabs>
            </Card>
        </>
    )
}
