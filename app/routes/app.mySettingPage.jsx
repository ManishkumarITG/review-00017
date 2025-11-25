import {
  Page,
  InlineGrid,
  Card,
  Text,
  InlineStack,
  IndexFilters,
  Box,
  Icon,
  Link,
  Button,
  Divider,
} from "@shopify/polaris";
import { AppProvider } from "@shopify/shopify-app-react-router/react";
import { PaintBrushRoundIcon, StarIcon } from "@shopify/polaris-icons";
import { Outlet, useLocation, useNavigate } from "react-router";
import en from "@shopify/polaris/locales/en.json";
import { useEffect, useState } from "react";
import Widget from "../components/Widget";
import Branding from "../components/Branding";

function MySettingPage() {
  const location = useLocation();
  const navigate = useNavigate();
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
    <AppProvider i18n={en}>
      <Page fullWidth={{ xm: false, md: true }}>
        <InlineGrid
          gap={{ xs: "100", sm: "200", md: "300", lg: "400", xl: "500" }}
          columns={{
            xs: 1,
            md: ["oneThird", "twoThirds"],
            lg: ["oneThird", "twoThirds"],
          }}
        >
          <Card>
            <s-search-field
              label="Search"
              labelAccessibilityVisibility="exclusive"
              placeholder="Search items"
            />

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
                  <StarIcon width="20" />
                  <Text variant="headingMd" as="h1" tone="base">
                    Widgets
                  </Text>
                </Box>
              
            </Box>
            <Divider />
            <Box padding="400" width="100%">
              <Text as="p">GENERAL</Text>
            
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    cursor: "pointer",
                  }}
                  as="div"
                  outlineWidth="0"
                   onClick={() => {
                  handlePageChange("branding");
                }}
                >
                  <PaintBrushRoundIcon width="20" />
                  <Text variant="headingMd" as="span" tone="base">
                    Branding
                  </Text>
                </Box>
              
            </Box>
            <Divider />
          </Card>{" "}
          <Box key={location.key}>
            {isPage == "widgets" ? <Widget /> : <Branding />}
          </Box>
        </InlineGrid>
      </Page>
    </AppProvider>
  );
}

export default MySettingPage;
