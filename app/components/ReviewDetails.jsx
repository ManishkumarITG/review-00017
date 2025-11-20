// import React, { useState } from "react";
// import {
//     Card,
//     BlockStack,
//     InlineGrid,
//     Text,
//     Button,
//     ButtonGroup,
//     InlineStack,
//     Bleed,
//     Box,
//     List,
//     Icon,
// } from "@shopify/polaris";
// import { ExportIcon } from "@shopify/polaris-icons";
// import "@shopify/polaris/build/esm/styles.css";
// import {
//     XIcon
// } from '@shopify/polaris-icons';
// export default function ReviewDetailsPage() {
//     const [selectedReview, setSelectedReview] = useState(null);

//     const reviews = [
//         {
//             id: "R123",
//             date: "2025-11-19",
//             rating: 4.5,
//             description: "Great product, fast shipping!",
//             salesItems: ["Payouts", "Total Sales By Channel"],
//         },
//         {
//             id: "R124",
//             date: "2025-11-18",
//             rating: 3.8,
//             description: "Good quality, but slow delivery.",
//             salesItems: ["Payouts", "Total Sales By Channel"],
//         },
//     ];

//     const findid = reviews.map((element) => {
//         if (element.id === "R124") {

//             return element
//         }
//     })
//     console.log(findid);

//     return (
//         <BlockStack gap="400">
//             {reviews.map((review) => (
//                 <Button
//                     key={review.id}
//                     onClick={() => setSelectedReview(review)}
//                 >

//                     Show Details for {review.id}
//                 </Button>
//             ))}

//             {selectedReview && (
//                 <Card roundedAbove="sm">
//                     <BlockStack gap="400">
//                         <InlineGrid columns="1fr auto" align="center">
//                             <Text as="h2" variant="headingLg">
//                                 Product Reviews Details {selectedReview.date}
//                             </Text>
//                             <ButtonGroup>
//                                 <Button icon={XIcon} onClick={() => setSelectedReview(null)} />
//                             </ButtonGroup>
//                         </InlineGrid>

//                         <BlockStack gap="200">
//                             <Text as="p" variant="bodyMd">
//                                 {selectedReview.description}
//                                 <br />
//                                 <strong>Date:</strong> {selectedReview.date}
//                             </Text>
//                             <Text as="h3" variant="headingSm" fontWeight="medium">
//                                 Review ID: {selectedReview.id}
//                             </Text>
//                         </BlockStack>

//                         <Bleed marginInline="400">
//                             <Box background="bg-surface-secondary" padding="400" borderRadius="200">
//                                 <BlockStack gap="200">
//                                     <Text as="h3" variant="headingSm" fontWeight="medium">
//                                         Rating: {selectedReview.rating}
//                                     </Text>
//                                     <List>
//                                         {selectedReview.salesItems.map((item) => (
//                                             <List.Item key={item}>{item}</List.Item>
//                                         ))}
//                                     </List>
//                                 </BlockStack>
//                             </Box>
//                         </Bleed>

//                         <BlockStack gap="200">
//                             <Text as="h3" variant="headingSm" fontWeight="medium">
//                                 Note
//                             </Text>
//                             <Text as="p" variant="bodyMd">
//                                 Sales reports are available only for merchants on the Shopify plan or higher.
//                             </Text>
//                             <InlineStack align="end">
//                                 <ButtonGroup>
//                                     <Button variant="primary" tone="success">Buy Now</Button>
//                                 </ButtonGroup>
//                             </InlineStack>
//                         </BlockStack>
//                     </BlockStack>
//                 </Card>
//             )}
//         </BlockStack>
//     );
// }

import React, { useState } from "react";
import {
    Card,
    BlockStack,
    Text,
    Button,
    ButtonGroup,
    InlineStack,
    Bleed,
    Box,
    List,
} from "@shopify/polaris";
import { XIcon } from "@shopify/polaris-icons";
import "@shopify/polaris/build/esm/styles.css";

export default function ReviewDetailsPage({ reviews }) {
    const [selectedReview, setSelectedReview] = useState(null);

    return (
        <BlockStack gap="400">
            {/* List of reviews */}
            {reviews.map((review) => (
                <Card key={review.id} sectioned>
                    <BlockStack gap="200">
                        <Text as="h3" variant="headingMd">
                            Review {review.id}
                        </Text>
                        <Text variant="bodyMd">{review.description}</Text>
                        <Button onClick={() => setSelectedReview(review)}>
                            View Details
                        </Button>
                    </BlockStack>
                </Card>
            ))}

            {/* Selected Review Details */}
            {selectedReview && (
                <Card sectioned roundedAbove="sm">
                    <BlockStack gap="400">
                        <InlineStack align="center" blockAlign="space-between">
                            <Text as="h2" variant="headingLg">
                                Product Review Details - {selectedReview.date}
                            </Text>
                            <ButtonGroup>
                                <Button icon={XIcon} onClick={() => setSelectedReview(null)} />
                            </ButtonGroup>
                        </InlineStack>

                        <BlockStack gap="200">
                            <Text as="p" variant="bodyMd">
                                {selectedReview.description}
                                <br />
                                <strong>Date:</strong> {selectedReview.date}
                            </Text>
                            <Text as="h3" variant="headingSm" fontWeight="medium">
                                Review ID: {selectedReview.id}
                            </Text>
                        </BlockStack>

                        <Bleed marginInline="400">
                            <Box background="bg-surface-secondary" padding="400" borderRadius="200">
                                <BlockStack gap="200">
                                    <Text as="h3" variant="headingSm" fontWeight="medium">
                                        Rating: {selectedReview.rating}
                                    </Text>
                                    <List>
                                        {selectedReview.salesItems.map((item) => (
                                            <List.Item key={item}>{item}</List.Item>
                                        ))}
                                    </List>
                                </BlockStack>
                            </Box>
                        </Bleed>

                        <BlockStack gap="200">
                            <Text as="h3" variant="headingSm" fontWeight="medium">
                                Note
                            </Text>
                            <Text as="p" variant="bodyMd">
                                Sales reports are available only for merchants on the Shopify plan or higher.
                            </Text>
                            <InlineStack align="end">
                                <ButtonGroup>
                                    <Button variant="primary" tone="success">Buy Now</Button>
                                </ButtonGroup>
                            </InlineStack>
                        </BlockStack>
                    </BlockStack>
                </Card>
            )}
        </BlockStack>
    );
}