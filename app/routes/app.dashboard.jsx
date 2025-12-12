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
import { useTranslation } from "react-i18next";



export default function Deshboard() {
  const [topProduct, setTopProduct] = useState([]);
  const [allreviews, setReviews] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const nevigate = useNavigate();

  const { getHexCode } = useColorTheme();

  const { t } = useTranslation()

  const starColor = getHexCode("star");

  const getAllReviewsData = async () => {
    try {
      setLoading(true);
      const allReviewData = await getAllReviews();
      setReviews(allReviewData.data.items);
      const productReviews = await getReviewsByType("product");
      setTopProduct(productReviews.items);
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
      title: t("Dashboard.PromoCard.Title"),
      imageurl: "https://assets.judge.me/core/cover/awesome-2025.webp",
      buttontext: t("Dashboard.PromoCard.Button"),
      textcontent:
        t("Dashboard.PromoCard.Description"),
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
                columns={{ xs: "1fr", sm: "1fr", md: "1fr 1fr" }}
                gap={{ xs: "200", md: "600" }}
                align="start"
              >
                {/* --- Top Products Card --- */}
                <Box minHeight="400px">
                  <Box paddingBlockEnd="400">
                    <Text variant="headingLg" as="h2" paddingBlockEnd="400">
                      {t("Dashboard.TopProducts")}
                    </Text>
                  </Box>
                  <Card padding={0}>

                    {isLoading ? (
                      <Box style={{ minHeight: "400px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Loding />
                      </Box>
                    ) : (
                      <>
                        <Box padding="400" minHeight="400px">
                          {topProduct.length === 0 ? (
                            <InlineGrid
                              columns={{ xs: "1fr", sm: "1fr", md: "1fr" }}
                              gap="600"
                              width="100%"
                              borderBottom="solid"
                            >

                              <Box align="center" padding="200">
                                <Image
                                  src="https://pub-images.judge.me/judgeme/empty-product"
                                  alt={t("Dashboard.NoData")}
                                  style={{ maxWidth: "160px", width: "100%" }}
                                />
                              </Box>
                              <Box align="center" padding="200">
                                <Text>
                                  {t("Dashboard.TopProductsEmptyMessage")}
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
                                  {t("Dashboard.TopProductsButton")}
                                </Button>
                              </Box>
                            </InlineGrid>
                          ) : (
                            <>
                              <Box style={{ overflowX: "auto" }}>

                                <DataTable
                                  columnContentTypes={[
                                    t("Dashboard.Table.Product"),
                                    t("Dashboard.Table.Reviews"),
                                    t("Dashboard.Table.Rating"),
                                  ]}
                                  headings={["Product", "Reviews", "Rating"]}
                                  rows={topProductRows}
                                />
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
                      {t("Dashboard.ReviewActivity")}
                    </Text>
                  </Box>
                  <Card padding={0}>
                    <Box minHeight="400px">


                      {isLoading ? (
                        <Box style={{ minHeight: "400px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Loding />
                        </Box>
                      ) : (
                        <>
                          <Box
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              minHeight: "400px",
                              padding: "0px 10px",
                              gap: "16px",
                              justifyContent: "space-between",
                            }}

                          >
                            {allreviews.length === 0 ? (
                              <InlineGrid
                                columns={{ xs: "1fr" }}
                                gap="600"
                                width="100%"
                                borderBottom="solid"
                              >

                                <Box align="center" padding="200">
                                  <Image
                                    src="https://pub-images.judge.me/judgeme/empty-review"
                                    alt={t("Dashboard.NoData")}
                                    width="30%"
                                  />
                                </Box>
                                <Box align="center" padding="200">
                                  <Text>
                                    {t("Dashboard.ReviewActivityEmptyMessage")}
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
                                    {t("Dashboard.ReviewActivityButton")}
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
                                        content: t("Dashboard.LastReviews"),
                                      },
                                    ]}
                                    selected={0}
                                  />
                                  <Divider />
                                  {allreviews.map((review) => (
                                    <Box key={review._id} paddingBlockEnd="300">
                                      <InlineGrid
                                        alignItems="start"
                                        gap={{ xs: "200", md: "300" }}
                                        columns={{ xs: "1fr", sm: "1fr", md: "auto 1fr" }}
                                      >
                                        <InlineStack align="start" gap="200">
                                          <StarRating
                                            rating={review.rating}
                                            color={starColor}
                                          />

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
                                    <Link>{t("Dashboard.ViewAllReviewsDashboard")}</Link>
                                  </Box>
                                </Box>
                              </>
                            )}
                          </Box>
                        </>
                      )}
                    </Box>
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
      </AppProvider >
    </>
  );
}
