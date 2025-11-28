import { Box } from "@shopify/polaris";
import React from "react";

function ThumbnailSkeleton({ width, height }) {
  return (
    <Box
      style={{
        width: width,
        height: height,
        background: "#f7f7f7",
      }}
    />
  );
}

export default ThumbnailSkeleton;
