import React, { useCallback, useEffect, useState } from "react";
import {
  Page,
  Box,
  AppProvider,
  MediaCard,
  InlineGrid,
  Badge,
  Select,
  Spinner,
} from "@shopify/polaris";


import "./style.css";
import { simplifiedMediaCardData } from "../data/reviewData";
import { useNavigate } from "react-router";
import { useAppBridge } from '@shopify/app-bridge-react';
import { useColorTheme } from "../ColorContext";



export default function Widget() {
const {shop} = useColorTheme()
  const [selected, setSelected] = useState("");
  const [themeList, setThemeList] = useState([])
  const handleSelectChange = useCallback((value) => setSelected(value), []);

  const shopify = useAppBridge();
  const nevigate = useNavigate();


  useEffect(() => {
    async function getThemes() {
      const url = window.location.origin;
      console.log(url);

      try {
        const res = await fetch(`${url}/api/routes/themes/loader`, {

          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
          credentials: "include"
        });
        const data = await res.json()

        setThemeList(Object.values(data.data.data.themes.edges))
      } catch (err) {
        console.log("Error fetching themes:", err);
      }
    }
    getThemes();


  }, []);



  const options = [];
  for (const key in themeList) {
    let data = {
      label: themeList[key].node.role == "MAIN" ? themeList[key].node.name + ("   (live)") : themeList[key].node.name,
      value: themeList[key].node.id.split("/")[4]
    };
    if (themeList[key].node.role === "MAIN") {
      options.unshift(data);
      continue;
    }
    options.push(data);
  };
  useEffect(
    ()=>{
      console.log("shopify---------------------------------------------------" , shopify.app.extensions());
    },[]
  )
  

  const rediectToThemeEditor = (index) => {
    const shopDomin = shopify.config.shop.split(".")[0];
    let url = "";
    const current = selected || "current";
    const embedId = "03fdd7d0352cc3b1184544f7e2c783be";
    if (index === 0) {
      url = `https://admin.shopify.com/store/${shopDomin}/themes/${current}/editor?template=page&addAppBlockId=${embedId}/review-widget`;
    }

    else if (index === 1) {
      url = `https://admin.shopify.com/store/${shopDomin}/themes/${current}/editor?context=apps&activateAppId=${embedId}/Product_review`;
    };

    window.open(url, "_blank");
  };

  return (
    <AppProvider>
      <Page
        title="Widget"
        fullWidth={true}
        actionGroups={[
          {
            title: "Change Theme",
            actions: [
              {
                content: "Horize",
                accessibilityLabel: "Individual action label",
                onAction: () => alert("Share on Facebook action"),
              },
              {
                content: "Savor",
                accessibilityLabel: "Individual action label",
                onAction: () => alert("Share on Facebook action"),
              },
              {
                content: "Vessel",
                accessibilityLabel: "Individual action label",
                onAction: () => alert("Share on Facebook action"),
              },
            ],
          },
        ]}
        secondaryActions={
          themeList.length !== 0 ?
            <Select
              options={options}
              onChange={handleSelectChange}
              value={selected}
            /> : <Box>
              <Spinner
                accessibilityLabel="Loading form field"
                size="small"
              />
            </Box>
        }

      >
        <InlineGrid gap="400" columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
          {simplifiedMediaCardData.map((card, index) => (
            <Box maxWidth="45 0px">
              <MediaCard
                key={card.key}
                title={
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      gap: "5px",
                    }}
                  >
                    {card.title}
                    <Badge
                      tone="success"
                      progress="complete"
                      toneAndProgressLabelOverride="Status: Published. Your online store is visible."
                    >
                      install
                    </Badge>
                  </Box>
                }
                portrait={true}
                primaryAction={{
                  content: "Customize",
                  onAction: () => {
                    nevigate(card.path);
                  },
                }}
                {...(index !== 2
                  ? {
                    secondaryAction: {
                      content: "install",
                      onAction: () => { rediectToThemeEditor(index) },
                    },
                  }
                  : {})}
                description={card.description}
              >
                <img
                  alt=""
                  width="100%"
                  height="100%"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  src={card.imageSrc}
                />
              </MediaCard>
            </Box>
          ))}
        </InlineGrid>
      </Page>
    </AppProvider >
  );
}
