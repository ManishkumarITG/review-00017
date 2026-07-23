import { Box } from "@shopify/polaris";

export default function CustomProgressBar({
  progress,
  color,
  height = 14,
  radius = 0,
  trackColor = "#E5E7EB",
}) {
  return (
    <Box
      style={{
        margin: "4px 0 0 0",
        width: "150px",
        height: `${height}px`,
        background: trackColor,
        borderRadius: `${radius}px`,
        overflow: "hidden",
      }}
    >
      <Box
        style={{
          width: `${progress}%`,
          height: "100%",
          background: color,
          transition: "width 0.3s ease",
        }}
      ></Box>
    </Box>
  );
}
