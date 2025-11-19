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
import "@shopify/polaris/build/esm/styles.css";
import { PaintBrushRoundIcon, StarIcon } from "@shopify/polaris-icons";
import { Outlet, useLocation, useNavigate } from "react-router";
import en from "@shopify/polaris/locales/en.json";
import { useEffect } from "react";

function MySettingPage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/app/mySettingPage/widget");
  }, []);

  const handlePageChange = (page) => {
    switch (page) {
      case "widgets":
        navigate("/app/mySettingPage/widget");
        break;
      case "branding":
        navigate("/app/mySettingPage/branding");
        break;
      default:
        break;
    }
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
              <Link
                removeUnderline={true}
                onClick={() => {
                  handlePageChange("widgets");
                }}
              >
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
                </Box>
              </Link>
            </Box>
            <Divider />
            <Box padding="400" width="100%">
              <Text as="p">GENERAL</Text>
              <Link
                removeUnderline={true}
                onClick={() => {
                  handlePageChange("branding");
                }}
              >
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
            </Box>
            <Divider />
          </Card>{" "}
          <Box key={location.key}>
            <Outlet />
          </Box>
        </InlineGrid>
      </Page>
    </AppProvider>
  );
}

export default MySettingPage;
