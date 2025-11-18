import React from 'react'
import { Card, Tabs, Page, Button, Text, Box } from "@shopify/polaris";

export default function Coordinator() {
    return (
        <Page>
            <Box>
                <Box>
                    <Text variant="headingLg" as="h2"></Text>
                    <Badge tone="success" variant="outline">
                        Auto Publish
                    </Badge>
                </Box>

            </Box>
        </Page>
    )
}
