import {
  Page,
  InlineGrid,
  Card,
  Text,
  Box,
  Divider,
  Button,
  useBreakpoints,
  AppProvider,
} from "@shopify/polaris";
import { StarIcon } from "@shopify/polaris-icons";
import { useEffect, useState } from "react";
import Widget from "./components/Widget";
import Branding from "./components/Branding";
import { MenuIcon, PaintBrushRoundIcon } from "@shopify/polaris-icons";
import { useColorTheme } from "./ColorContext";

function MySettingPage() {
  const { isChange } = useColorTheme();
  const { mdDown } = useBreakpoints();
  const [isPage, setIsPage] = useState("widgets");
  const [showNavigation, setShowNavigation] = useState(false);

  useEffect(() => {
    setShowNavigation(mdDown);
  }, [mdDown]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("key", "widgets");
    const newUrl = window.location.pathname + "?" + params.toString();
    window.history.pushState({}, "", newUrl);
  }, []);

  const handlePageChange = (page) => {
    if (isChange) {
      console.log("is page changes", isChange);
      shopify.saveBar.leaveConfirmation();
    } else {
      const params = new URLSearchParams(window.location.search);
      params.set("key", page);
      const newUrl = window.location.pathname + "?" + params.toString();
      window.history.pushState({}, "", newUrl);
      setIsPage(page);
    }
  };
  return (
    <AppProvider>
      <Page>
        <InlineGrid
          gap={{ xs: "100", sm: "200", md: "300", lg: "400", xl: "500" }}
          columns={{
            xs: 1,
            md: ["oneThird", "twoThirds"],
            lg: ["oneThird", "twoThirds"],
            xl: ["oneThird", "twoThirds"],
          }}
        >
          {showNavigation ? (
            <Box width="400px">
              <Button
                textAlign="center"
                variant="secondary"
                onClick={() => setShowNavigation(!showNavigation)}
                icon={MenuIcon}
              />
            </Box>
          ) : (
            <Card>
              <Box
                style={{
                  height: "100vh",
                }}
              >
                <Box>
                  <Box padding="400" width="100%">
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text as="p">REVIEW DISPLAY</Text>
                      {mdDown && (
                        <Button
                          variant="primary"
                          onClick={() => setShowNavigation(true)}
                        >
                          Close
                        </Button>
                      )}
                    </Box>

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
          )}
          {isPage == "widgets" ? <Widget /> : <Branding />}
        </InlineGrid>
      </Page>
    </AppProvider>
  );
}

export default MySettingPage;
