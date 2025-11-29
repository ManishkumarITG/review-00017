import { BlockStack, Text, InlineStack, Card } from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css';

function DeshboardCard({ element }) {
    const isString = typeof element.number === "string" && typeof element.percentage === "string";

    return (
        <Card>
            <BlockStack gap="200">

                {/* Title */}
                <Text as="h3" variant="headingSm">
                    {element.title}
                </Text>

                <InlineStack align="start" gap="100">

                    {/* Dynamic render based on type */}
                    {isString ? (

                        <>
                            <Text as="p" variant="bodyMd">
                                {element.number}
                            </Text>
                            <Text as="span" variant="bodyMd" blockAlign="center" color="success">
                                {element.percentage}
                            </Text>


                        </>
                    ) : (
                        <>

                            <Text as="span" variant="headingLg" blockAlign="center">
                                {element.number}
                            </Text>
                            {/* Percentage */}
                            <Text as="span" variant="bodyMd" blockAlign="center" color="success">
                                —{element.percentage}%
                            </Text>
                        </>

                    )}



                </InlineStack>
            </BlockStack>
        </Card>
    );
}

export default DeshboardCard;
