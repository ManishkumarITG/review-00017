import React from 'react'
import { Page, Image, Box } from "@shopify/polaris"
import '@shopify/polaris/build/esm/styles.css';
function DeshboardHeader() {
    return (
        <Page >
            <Box padding="300">
            <Image src="https://assets.judge.me/core/onboarding/logo-judgeme-2025.svg" alt="Logo" />
            </Box>
        </Page>)
}

export default DeshboardHeader;