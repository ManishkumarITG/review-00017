import React from 'react'
import { Card, EmptyState, Text } from '@shopify/polaris';
export default function EmptyState({ Title, Description }) {
    return (
        <Card sectioned>
            <EmptyState
                heading="Upload a file to get started"
                action={{ content: 'Upload files' }}
                image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                fullWidth
            >
                <Text as="h2">{Title}</Text>
                <Text as="p">{Description}</Text>
            </EmptyState>
        </Card>
    );

}
