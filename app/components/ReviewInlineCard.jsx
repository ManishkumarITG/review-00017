import { InlineGrid, Text, Box, Image, Card, Button } from '@shopify/polaris'
import "./style.css"
import { useNavigate } from 'react-router'

function ReviewInlineCard({ card }) {
    const navigate = useNavigate()
    return (
        <InlineGrid gap="600" width="100%" borderBottom="solid">
            <Text as="h2" variant="headingMd" padding="200">
                {card.title}
            </Text>
            <Card roundedAbove="sm" fullWidth align="center" padding="2000"  >

                <Box align="center" padding="200">
                    <Image
                        src={card.imageurl}
                        alt="No data available"
                        width="30%"
                    />
                </Box>
                <Box align="center" padding="200">
                    <Text>{card.textcontent}</Text>
                </Box>
                <Box align="center" padding="200">
                    <Button onClick={() => {
                        if (card.buttontext == "View all reviews") {
                            navigate("/app/reveiwpage?table=All+Reviews")
                        } else if (card.buttontext == "Request reviews") {
                            navigate("/app/reveiwpage?table=Product+Reviews")
                        }
                    }}>{card.buttontext}</Button>
                </Box>
            </Card>
        </InlineGrid>)
}

export default ReviewInlineCard