import { BlockStack, Text, InlineStack, Card } from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css';

// Deshboard card show report 
function DeshboardCard({ element }) {
    return (
        <>
            <Card>
                <BlockStack gap="200">
                    {/* Title of card */}
                    <Text as="h3" variant="headingSm">
                        {element.title}
                    </Text>

                    <InlineStack align="start" gap="100">
                        {/*data in number */}
                        <Text as="span" variant="headingLg" blockAlign="center">
                            {element.number}

                        </Text>
                        {/* data in persentages */}
                        <Text as="span" variant="bodyMd" blockAlign="center" color="success">

                            —{element.percentage}%
                        </Text>
                    </InlineStack>
                </BlockStack>
            </Card>
        </>


    )
}

export default DeshboardCard
