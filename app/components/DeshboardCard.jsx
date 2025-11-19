import { BlockStack, Text, InlineStack, Card } from '@shopify/polaris'
import React from 'react'

function DeshboardCard({ title, number, percentage }) {
    return (
        <Card>

            <BlockStack gap="200">
                <Text as="h3" variant="headingSm">
                    {title}
                </Text>

                <InlineStack align="start" gap="100"> {/* Adjust gap as needed */}
                    <Text as="span" variant="headingLg" blockAlign="center">
                        {number}
                    </Text>

                    <Text as="span" variant="bodyMd" blockAlign="center" color="success">
                        —{percentage}%
                    </Text>
                </InlineStack>
            </BlockStack>

        </Card>

    )
}

export default DeshboardCard