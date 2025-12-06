import { Box } from "@shopify/polaris";

export default function CustomProgressBar({ progress, color }) {
  return (
    <Box
      style={{
        margin: "4px 0 0 0",
        width: "150px",
        height: "14px",
        background: "#E5E7EB",
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
