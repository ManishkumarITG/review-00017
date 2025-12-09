import { useEffect, useState } from "react";
import {
  Page,
  InlineGrid,
  InlineStack,
  Box,
  Text,
  Divider,
  Card,
  Link,
  Tabs,
  DataTable,
  Button,
  Image,
} from "@shopify/polaris";

import { AppProvider } from "@shopify/polaris";
import en from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/build/esm/styles.css";
import DeshboardGuidense from "./components/DeshboardGuidense";
import DeshboardimageWithText from "./components/DeshboardImageWithText";
import DeshboardHeader from "./components/DeshboardHeader";
import { getAllReviews } from "./services/api";
import { getReviewsByType } from "./services/api";
import StarRating from "./components/Ratting.jsx";
import { useNavigate } from "react-router";
import Loding from "./components/Loding";

import { useColorTheme } from "./ColorContext.jsx";

export default function Deshboard() {
  const [topProduct, setTopProduct] = useState([]);
  const [allreviews, setReviews] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const nevigate = useNavigate();

  const { getHexCode } = useColorTheme();

  const starColor = getHexCode("star");

  const getAllReviewsData = async () => {
    try {
      setLoading(true);
      const allReviewData = await getAllReviews();
      setReviews(allReviewData.data.items);
      const productReviews = await getReviewsByType("product");
      setTopProduct(productReviews.data.items);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllReviewsData();
  }, []);

  const topProductRows = topProduct.map((item) => [
    item.idType || item.idType,
    item.review_count?.toString() || "0",
    item.rating?.toString() || "0",
  ]);

  const deshboardImages = [
    {
      title: "Build trust. Grow sales. Try Awesome FREE.",
      imageurl: "https://assets.judge.me/core/cover/awesome-2025.webp",
      buttontext: "Explore features",
      textcontent:
        "Get more reviews, build trust and grow store visits. Increase retention & referrals. FREE for 15 days and then just $15/month. Cancel anytime.",
    },
  ];

  return (
    <>
      <AppProvider i18n={en}>
        <Page>
          <DeshboardHeader />
          <Box>
            <DeshboardGuidense />
          </Box>

          <Box paddingBlockStart="300">
            <Box minHeight="400px">
              <InlineGrid
                columns={{ xs: "1fr", md: "1fr 1fr" }}
                gap="600"
                align="start"
              >
                {/* --- Top Products Card --- */}
                <Box minHeight="400px">
                  <Box paddingBlockEnd="400">
                    <Text variant="headingLg" as="h2" paddingBlockEnd="400">
                      Top products
                    </Text>
                  </Box>
                  <Card padding={0}>
                    {isLoading ? (
                      <Loding />
                    ) : (
                      <>
                        <Box padding="400" minHeight="400px">
                          {topProduct.length === 0 ? (
                            <InlineGrid
                              gap="600"
                              width="100%"
                              borderBottom="solid"
                            >
                              <Box align="center" padding="200">
                                <Image
                                  src="https://pub-images.judge.me/judgeme/empty-product"
                                  alt="No data available"
                                  width="30%"
                                />
                              </Box>
                              <Box align="center" padding="200">
                                <Text>
                                  A list of top reviewed products will show
                                  here.
                                </Text>
                              </Box>
                              <Box align="center" padding="200">
                                <Button
                                  onClick={() => {
                                    nevigate(
                                      "/app/reveiwpage?table=All+Reviews",
                                    );
                                  }}
                                >
                                  View all reviews
                                </Button>
                              </Box>
                            </InlineGrid>
                          ) : (
                            <>
                              <DataTable
                                columnContentTypes={[
                                  "text",
                                  "numeric",
                                  "numeric",
                                ]}
                                headings={["Product", "Reviews", "Rating"]}
                                rows={topProductRows}
                              />
                              <Box paddingBlockStart="400">
                                <InlineGrid
                                  columns="1fr auto auto"
                                  gap="200"
                                  align="center"
                                  padding="200"
                                ></InlineGrid>

                                <Divider />
                              </Box>
                            </>
                          )}
                        </Box>
                      </>
                    )}
                  </Card>
                </Box>
                {/* --- Recent Activity Card --- */}
                <Box>
                  <Box paddingBlockEnd="400">
                    <Text variant="headingLg" as="h2">
                      Review Activity
                    </Text>
                  </Box>
                  <Card padding={0}>
                    {isLoading ? (
                      <Loding />
                    ) : (
                      <>
                        <Box
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            height: "400px",
                            justifyContent: "space-between",
                            padding: "0px 10px",
                          }}
                        >
                          {allreviews.length === 0 ? (
                            <InlineGrid
                              gap="600"
                              width="100%"
                              borderBottom="solid"
                            >
                              <Box align="center" padding="200">
                                <Image
                                  src="https://pub-images.judge.me/judgeme/empty-review"
                                  alt="No data available"
                                  width="30%"
                                />
                              </Box>
                              <Box align="center" padding="200">
                                <Text>
                                  You can view your recent reviews here.
                                </Text>
                              </Box>
                              <Box align="center" padding="200">
                                <Button
                                  onClick={() => {
                                    nevigate(
                                      "/app/reveiwpage?table=All+Reviews",
                                    );
                                  }}
                                >
                                  Request reviews
                                </Button>
                              </Box>
                            </InlineGrid>
                          ) : (
                            <>
                              <Box>
                                <Tabs
                                  tabs={[
                                    {
                                      id: "last_reviews",
                                      content: "Last reviews",
                                    },
                                  ]}
                                  selected={0}
                                />
                                <Divider />
                                {allreviews.map((review) => (
                                  <Box key={review.id} paddingBlockEnd="300">
                                    <InlineGrid
                                      alignItems="start"
                                      justifyItems="start"
                                      gap="300"
                                      columns={"1fr"}
                                    >
                                      <InlineStack align="start" gap="200">
                                        <StarRating
                                          rating={review.rating}
                                          color={starColor}
                                        />
                                        {/* <Text tone="subdued">
                                          {review.createdAt.split("T")[0]}
                                        </Text> */}
                                      </InlineStack>

                                      <Box>
                                        <Text as="p" variant="bodyMd">
                                          {review.description}
                                        </Text>
                                      </Box>
                                    </InlineGrid>

                                    <Divider />
                                  </Box>
                                ))}
                              </Box>
                              <Box>
                                <Divider />
                                <Box
                                  paddingBlockEnd="300"
                                  onClick={() => nevigate("/app/reveiwpage")}
                                >
                                  <Link>View all in Reviews Dashboard</Link>
                                </Box>
                              </Box>
                            </>
                          )}
                        </Box>
                      </>
                    )}
                  </Card>
                </Box>
              </InlineGrid>
            </Box>
          </Box>
          <Box paddingBlockStart="300">
            {deshboardImages.map((element, index) => (
              <DeshboardimageWithText key={index} card={element} />
            ))}
          </Box>
        </Page>
      </AppProvider>
    </>
  );
}
