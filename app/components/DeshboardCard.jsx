import { BlockStack, Text, InlineStack, Card } from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css';

// Deshboard card show report 
function DeshboardCard({ title, number, percentage }) {
    return (
        <>
            <Card>
                <BlockStack gap="200">
                    {/* Title of card */}
                    <Text as="h3" variant="headingSm">
                        {title}
                    </Text>

                    <InlineStack align="start" gap="100">
                        {/*data in number */}
                        <Text as="span" variant="headingLg" blockAlign="center">
                            {number}
                        </Text>
                        {/* data in persentages */}
                        <Text as="span" variant="bodyMd" blockAlign="center" color="success">

                            —{percentage}%
                        </Text>
                    </InlineStack>
                </BlockStack>
            </Card>
        </>


    )
}

export default DeshboardCard