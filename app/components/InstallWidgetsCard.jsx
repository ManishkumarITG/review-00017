import {
    Box,
    Text,
    Button,
    InlineStack,
    ChoiceList,
    BlockStack,
} from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import React from "react";

function InstallWidgetsCard({
    title,
    description,
    buttons = [],
    pannelId,
    isOpen,
    onToggle,
}) {
    return (
        <Box>
            <ChoiceList
                choices={[
                    {
                        label: title,
                        value: pannelId,
                    },
                ]}
                selected={isOpen ? [pannelId] : []}
                onChange={() => onToggle(pannelId)}
            />

            {isOpen && (
                <Box paddingBlockStart="300">
                    <BlockStack gap="300">
                        <Text>{description}</Text>

                        <InlineStack gap="300">
                            {buttons.map((btn, index) => (
                                <Button
                                    key={index}
                                    variant={btn.variant || "primary"}
                                    tone={btn.tone || "base"}
                                    onClick={btn.onClick || (() => { })}
                                >
                                    {btn.label}
                                </Button>
                            ))}
                        </InlineStack>
                    </BlockStack>
                </Box>
            )}
        </Box>
    );
}

export default InstallWidgetsCard;


