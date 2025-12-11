import {
  SkeletonPage,
  Layout,
  LegacyCard,
  SkeletonBodyText,
  TextContainer,
  SkeletonDisplayText,
  Card,
  InlineGrid,
  Box,
  InlineStack,
  BlockStack,
} from '@shopify/polaris';
import React from 'react';

export default function WidgetSkelleton() {
  return (
    // <SkeletonPage primaryAction>
    <Box>

      <Layout>
        {/* <Layout.Section>
          <LegacyCard sectioned>
            <SkeletonBodyText />
          </LegacyCard>
          <LegacyCard sectioned>
            <TextContainer>
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText />
              </TextContainer>
              </LegacyCard>
          <LegacyCard sectioned>
          <TextContainer>
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText />
              </TextContainer>
              </LegacyCard>
        </Layout.Section> */}
        <Layout.Section variant="oneThird">
          <InlineGrid columns={2} gap={400}>
            <Card>
              <BlockStack gap="400">
                {/* Title Skeleton */}

                {/* Image Skeleton */}
                <Box style={{
                  width: "270px",
                  height: "180px",
                  background: "#15cc8fe7",
                  borderRadius: "200"
                }}
                >

                </Box>
                <BlockStack gap="200">
                  <SkeletonDisplayText size="small" />
                  <SkeletonBodyText lines={1} />
                </BlockStack>

                {/* Actions Skeleton */}
                <InlineStack gap="300" align="start">
                  <SkeletonBodyText lines={1} />
                  <SkeletonBodyText lines={1} />
                </InlineStack>
              </BlockStack>
            </Card>
            <Card>
              <BlockStack gap="400">
                {/* Title Skeleton */}

                {/* Image Skeleton */}
                <Box style={{
                  width: "270px",
                  height: "180px",
                  background: "#15cc8fe7",
                  borderRadius: "200"
                }}
                >

                </Box>
                <BlockStack gap="200">
                  <SkeletonDisplayText size="small" />
                  <SkeletonBodyText lines={1} />
                </BlockStack>

                {/* Actions Skeleton */}
                <InlineStack gap="300" align="start">
                  <SkeletonBodyText lines={1} />
                  <SkeletonBodyText lines={1} />
                </InlineStack>
              </BlockStack>
            </Card>
            <Card>
              <BlockStack gap="400">
                {/* Title Skeleton */}

                {/* Image Skeleton */}
                <Box style={{
                  width: "270px",
                  height: "180px",
                  background: "#15cc8fe7",
                  borderRadius: "200"
                }}
                >

                </Box>

                {/* Actions Skeleton */}
                <InlineStack gap="300" align="start">
                  <SkeletonBodyText lines={1} />
                  <SkeletonBodyText lines={1} />
                </InlineStack>
                <BlockStack gap="200">
                  <SkeletonDisplayText size="small" />
                  <SkeletonBodyText lines={1} />
                </BlockStack>
              </BlockStack>
            </Card>
          </InlineGrid>
        </Layout.Section>
      </Layout>
      {/* </SkeletonPage> */}
    </Box>
  );
}