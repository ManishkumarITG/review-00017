import {
  Box,
  Text,
  Button,
  InlineStack,
  ChoiceList,
  BlockStack,
  Link,
} from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import React, { useCallback, useState } from "react";

function InstallWidgetsCard({
  title,
  description,
  buttons = [],
  pannelId,
}) {
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const handleChange = useCallback((value) => {
    setSelected(value)
    setOpen(prev => !prev);
  }, []);

  return (
    <Box>
      <ChoiceList
        allowMultiple
        choices={[
          {
            label: title,
            value: pannelId,
          },
        ]}
        selected={selected}
        onChange={handleChange}
      />

      {open && (
        <Box paddingBlockStart="300">
          <BlockStack gap="300">
            <Text>{description}</Text>
            
            <InlineStack gap="300">
              {buttons.map((btn, index) => (
                btn.tone === "plain" ? (
                  <Link key={index} onClick={btn.onClick}>
                    {btn.label}
                  </Link>
                ) : (
                  <Button
                    key={index}
                    variant={btn.variant}
                    tone={btn.tone}
                    onClick={btn.onClick || (() => { })}
                  >
                    {btn.label}
                  </Button>
                )
              ))}
            </InlineStack>
          </BlockStack>
        </Box>
      )}
    </Box >
  );
}

export default InstallWidgetsCard;
