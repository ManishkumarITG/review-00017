import { Page, Button, InlineStack } from '@shopify/polaris';
import React from 'react';
import '@shopify/polaris/build/esm/styles.css';
function ReviewRequest() {
    return (
        <Page
            title="General Settings"
            titleMetadata={
                <InlineStack gap="300">
                    <Button variant="primary" onClick={() => { }}>
                        Edit request schedule
                    </Button>
                    <Button variant="primary" onClick={() => { }}>
                        Edit email template
                    </Button>
                    <Button variant="primary" onClick={() => { }}>
                        Request request
                    </Button>
                </InlineStack>
            }
        />

    );
}

export default ReviewRequest;