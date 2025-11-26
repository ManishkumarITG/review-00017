import { Box, Collapsible, InlineStack, Text, Icon } from "@shopify/polaris";
import { CaretDownIcon, CaretUpIcon } from "@shopify/polaris-icons";
import { useCallback, useState } from "react";

function CollapsibleBox({ children, id, boxName }) {
  const [open, setOpen] = useState(false);

  const handleToggle = useCallback(() => setOpen((open) => !open), []);
  return (
    <>
      {" "}
      <Box
        borderStyle="solid"
        borderWidth="025"
        borderRadius="100"
        borderColor="border-brand"
      >
        <Box onClick={handleToggle} as="div" padding="500">
          <InlineStack align="space-between">
            <Text alignment="justify" as="strong">
              {boxName}
            </Text>
            <Text>
              <Icon source={open ? CaretDownIcon : CaretUpIcon} />
            </Text>
          </InlineStack>
        </Box>
        <Collapsible
          open={open}
          id={id}
          transition={{
            duration: "500ms",
            timingFunction: "ease-in-out",
          }}
          expandOnPrint
        >
          {children}
        </Collapsible>
      </Box>
    </>
  );
}

export default CollapsibleBox;
