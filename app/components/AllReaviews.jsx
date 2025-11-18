import React from 'react'
import { Card, Tabs, Page, Button, Text, Box, InlineStack, IndexTable, BlockStack } from "@shopify/polaris";
import {
    HeartIcon,
    PinIcon
} from '@shopify/polaris-icons';

export default function AllReaviews() {

    const reviews = [
        { userName: "Manish", item: "Bag", time: "2 days", Rating: 4.3, comment: "Great!", tag: "test" },
        { userName: "Amit", item: "Shoes", time: "1 day ago", Rating: 4.8, comment: "Excellent", tag: "verified" },
        { userName: "Rahul", item: "Watch", time: "3 days", Rating: 4.1, comment: "Good quality", tag: "hot" },
        { userName: "Suresh", item: "T-Shirt", time: "5 days", Rating: 3.9, comment: "Decent", tag: "new" },
        { userName: "Vikas", item: "Laptop", time: "12 hours", Rating: 4.9, comment: "Amazing!", tag: "pro" },
        { userName: "Neha", item: "Mobile", time: "4 days", Rating: 4.5, comment: "Very smooth", tag: "verified" },
        { userName: "Priya", item: "Headphones", time: "6 hours", Rating: 3.8, comment: "Okay product", tag: "test" },
        { userName: "Rohit", item: "Bag", time: "7 days", Rating: 4.0, comment: "Nice build", tag: "sale" },
        { userName: "Aman", item: "Shoes", time: "2 hours", Rating: 4.7, comment: "Fits well", tag: "verified" },
        { userName: "Deepak", item: "Keyboard", time: "3 days ago", Rating: 4.2, comment: "Smooth typing", tag: "hot" },
        { userName: "Mohan", item: "Mouse", time: "9 hours", Rating: 3.6, comment: "Average", tag: "test" },
        { userName: "Nitin", item: "Monitor", time: "1 week", Rating: 4.4, comment: "Crisp display", tag: "pro" },
        { userName: "Kunal", item: "Charger", time: "13 hours", Rating: 3.9, comment: "Works fine", tag: "new" },
        { userName: "Sneha", item: "Powerbank", time: "8 days", Rating: 4.6, comment: "Long backup", tag: "verified" },
        { userName: "Harshit", item: "Speaker", time: "11 hours", Rating: 4.1, comment: "Good sound", tag: "hot" },
    ];


    const resourceName = {
        singular: 'review',
        plural: 'reviews',
    };


    const { selectedResources, allResourcesSelected, handleSelectionChange } =
        useIndexResourceState(reviews);

    const rowMarkup = reviews.map(
        ({ userName, item, time, Rating, comment, tag }, index) => (
            <IndexTable.Row
                id={userName}
                key={userName}
                selected={selectedResources.includes(userName)}
                position={index}>

                <IndexTable.Cell>
                    <BlockStack>
                        <Text>
                            {userName}
                        </Text>
                        <Text>
                            {item}
                        </Text>
                        <Text>
                            Via Web
                        </Text>
                        <InlineStack>
                            <Button>
                                <Icon
                                    source={HeartIcon}
                                    tone="base"
                                />
                                

                            </Button>
                            <Button>
                                <Icon
                                    source={PinIcon}
                                    tone="base"
                                />
                            </Button>
                        </InlineStack>
                    </BlockStack>
                </IndexTable.Cell>
            </IndexTable.Row>
        ))


    return (
        <>
        </>
    )
}
