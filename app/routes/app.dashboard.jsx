import React, { useEffect, useState } from "react";
import {
  Page,
  InlineGrid,
  InlineStack,
  Box,
  Text,
  Spinner,
} from "@shopify/polaris";

import { AppProvider } from "@shopify/polaris";
import en from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/build/esm/styles.css";
import DeshboardGuidense from "./components/DeshboardGuidense";
import DeshboardimageWithText from "./components/DeshboardImageWithText";
import DeshboardHeader from "./components/DeshboardHeader";
import { getAllReviews } from "./services/api";
import StarRating from "./components/Ratting.jsx";

// const { getHexCode } = useColorTheme();

export default function Deshboard() {
  // const navigate = useNavigate();
  const [carddata, setCardData] = useState([]);
  const [allreviews, setReviews] = useState([]);
  // const starColor = getHexCode("star");

  function Loding() {
    return (
      <>
        <InlineStack align="center" gap="100" type="center">
          <Spinner size="large" accessibilityLabel="Loading content" />
        </InlineStack>
      </>
    );
  }

  useEffect(() => {
    getAllReviews().then((res) => {
      console.log("data res", res);
      setReviews(res.items);
      console.log("all review for the server", res);
    }).catch(() => shopify.toast.show(massage, {
      duration: duration,
    }));
  }, []);

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
        <DeshboardHeader />
        <Page>
          <DeshboardGuidense />
        </Page>

        <Page>
          <Box padding="300">
            <InlineGrid
              gap="400"
              columns={{
                xs: "1fr",
                sm: "1fr",
                md: "auto auto",
              }}
            >
              <Box>sdighjwegjhsgduyags</Box>

              <Box>
                {allreviews?.length === 0 ? (
                  <>No reviews yet…</>
                ) : (
                  allreviews?.data.map((review) => {
                    console.log("review →", review);
                    return (
                      <Box key={review.id} padding="200">
                        <InlineStack
                          columns={{
                            xs: "1fr",
                            sm: "1fr",
                            md: "auto auto",
                          }}
                        >
                          <InlineStack align="center" gap="100">
                            <StarRating rating={review.rating} />
                            <Text>{review.createdAt.split("T")[0]}</Text>
                          </InlineStack>
                          <Box>
                            <Text as="p" variant="bodyMd">
                              {review.description}
                            </Text>
                          </Box>
                        </InlineStack>
                      </Box>
                    );
                  })
                )}
              </Box>
            </InlineGrid>
          </Box>
        </Page>

        <Page>
          {deshboardImages?.map((element, index) => (
            <DeshboardimageWithText key={index} card={element} />
          ))}
        </Page>
      </AppProvider>
    </>
  );
}
