import React, { useState } from 'react'

import {
    Card,
    Tabs,
    Page,
    Button,
    Text, Box,
    InlineStack,
    IndexTable,
    BlockStack,
    Icon,
    useIndexResourceState,
    LegacyCard,
    ButtonGroup,
    EmptyState,
} from "@shopify/polaris";

import { ChevronDownIcon, MenuHorizontalIcon, UndoIcon } from '@shopify/polaris-icons';
import "../../app/app.css"
import {
    HeartIcon,
    PinIcon,
    StarFilledIcon,
    StarIcon
} from '@shopify/polaris-icons';

import "@shopify/polaris/build/esm/styles.css";
import StarRating from "./Ratting"
export default function AllReaviews() {

    const [reviews, setReviews] = useState([
        { id: 1, userName: "Manish", item: "Bag", time: "2 days", Rating: 4.3, comment: "Great!", tag: "test" },
        { id: 2, userName: "Amit", item: "Shoes", time: "1 day ago", Rating: 4.8, comment: "Excellent", tag: "verified" },
        { id: 3, userName: "Rahul", item: "Watch", time: "3 days", Rating: 4.1, comment: "Good quality", tag: "hot" },
        { id: 4, userName: "Suresh", item: "T-Shirt", time: "5 days", Rating: 3.9, comment: "Decent", tag: "new" },
        { id: 5, userName: "Vikas", item: "Laptop", time: "12 hours", Rating: 4.9, comment: "Amazing!", tag: "pro" },
        { id: 6, userName: "Neha", item: "Mobile", time: "4 days", Rating: 4.5, comment: "Very smooth", tag: "verified" },
        { id: 7, userName: "Priya", item: "Headphones", time: "6 hours", Rating: 3.8, comment: "Okay product", tag: "test" },
        { id: 8, userName: "Rohit", item: "Bag", time: "7 days", Rating: 4.0, comment: "Nice build", tag: "sale" },
        { id: 9, userName: "Aman", item: "Shoes", time: "2 hours", Rating: 4.7, comment: "Fits well", tag: "verified" },
        { id: 10, userName: "Deepak", item: "Keyboard", time: "3 days ago", Rating: 4.2, comment: "Smooth typing", tag: "hot" },
        { id: 11, userName: "Mohan", item: "Mouse", time: "9 hours", Rating: 3.6, comment: "Average", tag: "test" },
        { id: 12, userName: "Nitin", item: "Monitor", time: "1 week", Rating: 4.4, comment: "Crisp display", tag: "pro" },
        { id: 13, userName: "Kunal", item: "Charger", time: "13 hours", Rating: 3.9, comment: "Works fine", tag: "new" },
        { id: 14, userName: "Sneha", item: "Powerbank", time: "8 days", Rating: 4.6, comment: "Long backup", tag: "verified" },
        { id: 15, userName: "Harshit", item: "Speaker", time: "11 hours", Rating: 4.1, comment: "Good sound", tag: "hot" },
    ]);


    const resourceName = {
        singular: 'review',
        plural: 'reviews',
    };


    const { selectedResources, allResourcesSelected, handleSelectionChange } =
        useIndexResourceState(reviews);

    const rowMarkup = reviews.map(
        ({ id, userName, item, time, Rating, comment, tag }, index) => (

            <IndexTable.Row
                id={id.toString()}
                key={id.toString()}
                selected={true}
                position={index}
                verticalAlign="top"
            >
                <IndexTable.Cell>
                    <BlockStack gap={100}>
                        <Text fontWeight="bold" style={{ textDecoration: "underline" }}>
                            <span style={{ textDecoration: "underline" }}>{userName}</span>
                        </Text>
                        <Text>
                            <span style={{ textDecoration: "underline" }}>{item}</span>
                        </Text>
                        <Text>
                            Via Web
                        </Text>
                        <InlineStack gap={200} >
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
                        </InlineStack  >
                    </BlockStack  >
                </IndexTable.Cell>
                <IndexTable.Cell>
                    <Text>
                        {time}
                    </Text>

                </IndexTable.Cell>
                <IndexTable.Cell>
                    <BlockStack align="start" gap={100}>
                        <Box maxWidth="100px" color="red">
                            <StarRating rating={Rating} color={"#76eb6bff"} />
                        </Box>
                        <Text fontWeight="bold">
                            {comment}
                        </Text>
                        <Box>
                            {tag}
                        </Box>
                    </BlockStack  >
                </IndexTable.Cell>

                <IndexTable.Cell>
                    <InlineStack align="end" blockAlign="center" style={{ width: "100%" }}>
                        <InlineStack gap="800">

                            <Button
                                icon={ChevronDownIcon}
                                iconPosition="end"
                            >
                                Published
                            </Button>
                            <ButtonGroup>
                                <Button
                                    icon={UndoIcon}
                                    iconPosition="end"
                                >
                                </Button>
                                <Button
                                    icon={MenuHorizontalIcon}
                                    iconPosition="end"
                                >
                                </Button>
                            </ButtonGroup>
                        </InlineStack>
                    </InlineStack>
                </IndexTable.Cell>
            </IndexTable.Row>
        ))


    return (
        <LegacyCard>
            {
                reviews.length === 0 ? (
                    <EmptyState
                        heading="Your Product has no reviews"
                        action={{ content: '' }}
                        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                        fullWidth
                    >
                        <p>
                            We need atlest on revieiw to show 
                        </p>
                    </EmptyState>

                ):
                    <div className="topAlignTable">
            <IndexTable
                selectable={true}
                resourceName={resourceName}
                itemCount={reviews.length}
                selectedItemsCount={
                    allResourcesSelected ? 'All' : selectedResources.length
                }
                onSelectionChange={handleSelectionChange}
                headings={[
                    { title: 'Customer' },
                    { title: 'Create' },
                    { title: 'Rating' },
                    { title: 'Status', },
                ]}
                primaryId="id"
            >
                {rowMarkup}
            </IndexTable>
        </div>
            }
        </LegacyCard >

    )




}
