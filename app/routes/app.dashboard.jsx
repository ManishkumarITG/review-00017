import React, { useEffect, useState } from "react";
import {
  Page,
  InlineGrid,
  InlineStack,
  Box,
  Text,
  Spinner,
  Icon,
} from "@shopify/polaris";
import {
  StarFilledIcon, StarIcon
} from '@shopify/polaris-icons';
import { AppProvider } from "@shopify/polaris";
import en from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/build/esm/styles.css";
import ReviewInlineCard from "./components/ReviewInlineCard";
import DeshboardGuidense from "./components/DeshboardGuidense";
import DeshboardimageWithText from "./components/DeshboardImageWithText";
import DeshboardHeader from "./components/DeshboardHeader";
import { getAllReviews } from "./services/api";
import StarRating from "./components/Ratting.jsx";
import { useColorTheme } from "./ColorContext.jsx";


// const { getHexCode } = useColorTheme();

export default function Deshboard() {
  // const navigate = useNavigate();
  const [carddata, setCardData] = useState([]);
  const [allreviews, setReviews] = useState([])
  // getAllReviews
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
      setReviews(res)
      console.log("all review for the server", res);
    });
  }, []);

  const ranges = [
    {
      title: "Last 30 days",
      alias: "Last 30 days",
      period: {
        since: "Last 30 days",
        until: "Last 30 days",
      },
    },
    {
      title: "Yesterday",
      alias: "yesterday",
      period: {
        since: "yesterday",
        until: "yesterday",
      },
    },
    {
      title: "Today",
      alias: "today",
      period: {
        since: "today",
        until: "today",
      },
    },
    {
      title: "Last 7 days",
      alias: "last7days",
      period: {
        since: "-7d",
        until: "-1d",
      },
    },
    {
      title: "Last 30 days",
      alias: "last30days",
      period: {
        since: "-30d",
        until: "-1d",
      },
    },
    {
      title: "Last 90 days",
      alias: "last90days",
      period: {
        since: "-90d",
        until: "-1d",
      },
    },
    {
      title: "Last 12 months",
      alias: "last12months",
      period: {
        since: "-12m",
        until: "-1d",
      },
    },
    {
      title: "All time",
      alias: "alltime",
      period: null,
    },
    {
      title: "Custom",
      alias: "custom",
      period: null,
    },
  ];

  const ReviewInlineCardArray = [
    {
      title: "Top products",
      imageurl: "https://pub-images.judge.me/judgeme/empty-product",
      buttontext: "View all reviews",
      textcontent: "A list of top reviewed products will show here.",
    },
    {
      title: "Recent activity",
      imageurl: "https://pub-images.judge.me/judgeme/empty-review",
      buttontext: "Request reviews",
      textcontent: "You can view your recent reviews here.",
    },
  ];

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
              <Box>
                sdighjwegjhsgduyags
              </Box>

              <Box>
                {allreviews.length === 0 ? (
                  <>No reviews yet…</>
                ) : (
                  allreviews.map((review) => {
                    console.log("review →", review);
                    return (
                      <Box key={review.id} padding="200">
                        <InlineStack columns={{
                          xs: "1fr",
                          sm: "1fr",
                          md: "auto auto",
                        }}>
                          <InlineStack align="center" gap="100" >
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
          {deshboardImages.map((element, index) => (
            <DeshboardimageWithText key={index} card={element} />
          ))}
        </Page>
      </AppProvider >
    </>
  );
}
