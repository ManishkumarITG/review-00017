import { InlineGrid, Text, Box, Image, Card, Button } from '@shopify/polaris'
import React from 'react'
import "./style.css"

function ReviewInlineCard({ title, imageurl, buttontext, textcontent }) {
    return (
        <InlineGrid gap="600" width="100%" borderBottom="solid" >

            <Text as="h2" variant="headingMd" padding="200">
                {title}
            </Text>
            <Card roundedAbove="sm" fullWidth align="center" padding="2000"  >

                <Box align="center" padding="200">
                    <Image
                        src={imageurl}
                        alt="No data available"
                        width="30%"
                    />
                </Box>
                <Box align="center" padding="200">
                    <Text>{textcontent}</Text>
                </Box>
                <Box align="center" padding="200">
                    <Button>{buttontext}</Button>
                </Box>
            </Card>
        </InlineGrid>)
}

export default ReviewInlineCard