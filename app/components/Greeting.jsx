import { Box, Text } from "@shopify/polaris";
import React from "react";

function Greeting() {
  return (
    <Box gap="400">
      <Text tone="base" alignment="center" variant="headingLg">
        Thanks for your review!
      </Text>

      <Text alignment="center" variant="headingMd" tone="base">
        We are processing it and it will appear on the store soon. You can edit
        review by logging into your Judge.me profile.
      </Text>

      <Text tone="base" alignment="center" variant="headingLg">
        Would you like to share your experience of shopping with us?
      </Text>

      <Text alignment="center" variant="headingMd" tone="base">
        We value your feedback and use it to improve. Please share any thoughts
        or suggestions you have.
      </Text>
    </Box>
  );
}

export default Greeting;
