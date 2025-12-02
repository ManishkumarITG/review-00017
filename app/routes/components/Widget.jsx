import {
  Page,
  Box,
  AppProvider,
  MediaCard,
  InlineGrid,
  Badge,
} from "@shopify/polaris";
import "./style.css";
import { simplifiedMediaCardData } from "../data/reviewData";
import { useNavigate } from "react-router";

export default function Widget() {
  const nevigate = useNavigate();
  return (
    <AppProvider>
      <Page title="Widget" fullWidth={true}>
        <InlineGrid gap="400" columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}>
          {simplifiedMediaCardData.map((card) => (
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
          ))}
        </InlineGrid>
      </Page>
    </AppProvider>
  );
}
