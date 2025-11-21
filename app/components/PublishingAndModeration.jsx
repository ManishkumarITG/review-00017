import React, { useState, useCallback } from 'react';
import "@shopify/polaris/build/esm/styles.css";
import {
    Card,
    Page,
    AppProvider,
    Select,
    RadioButton,
    Text,
    BlockStack,
    InlineStack, 
} from "@shopify/polaris";
import { CaretDownIcon } from "@shopify/polaris-icons";
import "@shopify/polaris/build/esm/styles.css";

const options = [
    { label: 'Today', value: 'today' },
    { label: 'Last 7 days', value: 'last_7_days' },
    { label: 'Last 30 days', value: 'last_30_days' },
];

export default function PublishingAndModeration() {
    // 1. RadioButton के लिए State
    const [autoPublish, setAutoPublish] = useState('automatic');

    // 2. Select कंपोनेंट के लिए State
    const [selected, setSelected] = useState(options[0].value);

    // RadioButton के लिए Handler
    const handleAutoPublishChange = useCallback(
        (newCheckedValue) => setAutoPublish(newCheckedValue),
        [],
    );

    // Select कंपोनेंट के लिए Handler
    const handleSelectChange = useCallback(
        (newValue) => setSelected(newValue),
        [],
    );

    return (
        <AppProvider>
            <Page
                title="Publishing and moderation"
                fullWidth={true}
                prefix={<CaretDownIcon />}

                primaryAction={
                    <Select
                        options={options}
                        onChange={handleSelectChange}
                        value={selected}
                    />
                }
            >
                <Card>

                    <BlockStack sectioned>
                        <Text variant="headingMd" as="h2">Auto publish reviews</Text>


                        <RadioButton
                            label="Publish new reviews automatically"
                            checked={autoPublish === 'automatic'}
                            id="automatic"
                            name="autoPublish"
                            onChange={() => handleAutoPublishChange('automatic')}
                        />

                        <RadioButton
                            label="Publish reviews manually"
                            checked={autoPublish === 'manual'}
                            id="manual"
                            name="autoPublish"
                            onChange={() => handleAutoPublishChange('manual')}
                        />

                    </BlockStack>
                </Card>
            </Page>
        </AppProvider>
    );
}