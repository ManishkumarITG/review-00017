import React from "react";
import { Card, BlockStack, Text } from "@shopify/polaris";
import { useNavigate } from "react-router";
// import { useNavigate } from "react-router-dom";

export default function ReviewsPage({ reviews }) {
    const navigate = useNavigate();

    return (
        <div>
            {reviews.map((review) => (
                <Card key={review.id} sectioned>
                    <BlockStack
                        gap="200"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(`/review/${review.id}`)}
                    >
                        <Text as="h3" variant="headingMd">
                            Review {review.id}
                        </Text>
                        <Text variant="bodyMd">{review.description}</Text>
                    </BlockStack>
                </Card>
            ))}
        </div>
    );
}
