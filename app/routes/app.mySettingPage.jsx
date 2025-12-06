import {
  Page,
  InlineGrid,
  Card,
  Text,
  Box,
  Divider,
  Grid,
} from "@shopify/polaris";
import { AppProvider } from "@shopify/polaris";
import { PaintBrushRoundIcon, StarIcon } from "@shopify/polaris-icons";
import { useEffect, useState } from "react";
import Widget from "./components/Widget";
import Branding from "./components/Branding";

function MySettingPage() {
  const [isPage, setIsPage] = useState("widgets");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("key", "widgets");
    const newUrl = window.location.pathname + "?" + params.toString();
    window.history.pushState({}, "", newUrl);
  }, []);

  const handlePageChange = (page) => {
    const params = new URLSearchParams(window.location.search);
    params.set("key", page);
    const newUrl = window.location.pathname + "?" + params.toString();
    window.history.pushState({}, "", newUrl);
    setIsPage(page);
  };
  return (
    <AppProvider>
      <Page fullWidth>
        <InlineGrid
          gap={{ xs: "100", sm: "200", md: "300", lg: "400", xl: "500" }}
          columns={{
            xs: 2,
            sm: 2,
            md: ["oneThird", "twoThirds"],
            lg: ["oneThird", "twoThirds"],
            xl: ["oneThird", "twoThirds"],
          }}
        >
          <Card>
            <Box minHeight="100vh">
              <Box>
                <Box padding="400" width="100%">
                  <Text as="p">REVIEW DISPLAY</Text>

                  <Box
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      handlePageChange("widgets");
                    }}
                  >
                    <StarIcon width={25} />
                    <Text variant="headingMd" as="h1" tone="base">
                      Widgets
                    </Text>
                  </Box>
                </Box>
                <Divider />
              </Box>

              <Box>
                <Box padding="400" width="100%">
                  <Text as="p">GENERAL</Text>

                  <Box
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      handlePageChange("branding");
                    }}
                  >
                    <PaintBrushRoundIcon width={25} />
                    <Text variant="headingMd" as="h1" tone="base">
                      Branding
                    </Text>
                  </Box>
                </Box>
                <Divider />
              </Box>
            </Box>
          </Card>

          {isPage == "widgets" ? <Widget /> : <Branding />}
        </InlineGrid>
      </Page>
    </AppProvider>
  );
}

export default MySettingPage;
