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
} from "@shopify/polaris";
import { AppProvider } from "@shopify/shopify-app-react-router/react";
import "@shopify/polaris/build/esm/styles.css";
import { PaintBrushRoundIcon, StarIcon } from "@shopify/polaris-icons";
// import { Outlet } from "react-router";
// import Widget from "../components/Widget.jsx";
import Branding from "../components/Branding.jsx";

function MySettingPage() {
  // const sortOptions = [
  //   { label: "Order", value: "order asc", directionLabel: "Ascending" },
  // ];
  return (
    <AppProvider>
      <Page fullWidth={true}>
        <InlineGrid
          gap={{ xs: "100", sm: "200", md: "300", lg: "400", xl: "500" }}
          columns={["oneThird", "twoThirds"]}
        >
          <Card>
            <s-search-field
              label="Search"
              labelAccessibilityVisibility="exclusive"
              placeholder="Search items"
            />
            <div
              style={{
                borderBottom: "1px solid #DFE3E8",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "1rem",
                width: "100%",
              }}
            >
              <Text as="p">REVIEW DISPLAY</Text>
              <Link removeUnderline={true} url="/my-setting/widgets">
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    cursor: "pointer",
                  }}
                >
                  <StarIcon width="20" />
                  <Text variant="headingMd" as="h1" tone="base">
                    Widgets
                  </Text>

                  {/* <Link url="#" removeUnderline={true} >
                <PaintBrushRoundIcon width="20" />
                <Text variant="headingMd" as="span" tone="base">
                  Branding
                </Text>
              </Link> */}
                </Box>
              </Link>
            </div>

            <div
              style={{
                borderBottom: "1px solid #DFE3E8",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "1rem",
                width: "100%",
              }}
            >
              <Text as="p">GENERAL</Text>
              <Link removeUnderline={true} url="/my-setting/branding">
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    cursor: "pointer",
                  }}
                >
                  <PaintBrushRoundIcon width="20" />
                  <Text variant="headingMd" as="span" tone="base">
                    Branding
                  </Text>
                </Box>
              </Link>
            </div>
          </Card>{" "}
          {/* <Widget /> */}
          <Branding />
        </InlineGrid>
      </Page>
    </AppProvider>
  );
}

export default MySettingPage;
