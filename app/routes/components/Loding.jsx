import { InlineStack, Spinner } from "@shopify/polaris";

function Loding() {
  return (
    <InlineStack
      blockAlign="cemter"
      direction="row"
      as="div"
      align="center"
      gap="200"
    >
      <Spinner accessibilityLabel="Spinner example" size="large" />
    </InlineStack>
  );
}

export default Loding;
