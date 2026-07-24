import { InlineStack } from "@shopify/polaris";
import { STAR_DESIGNS } from "../data/widgetDefaults.js";
import { useColorTheme } from "../ColorContext.jsx";

// Renders stars from the shared STAR_DESIGNS definitions. The design comes
// from the widget customizer's "Star Design" layout setting (via context) so
// admin pages, the live preview and the storefront all match; a `design`
// prop can still override it.
export default function StarRating({
  rating,
  color,
  width,
  height,
  emptyColor,
  design,
}) {
  const theme = useColorTheme();
  const styleKey = design || theme?.layout?.starStyle || "rounded";
  const starDesign = STAR_DESIGNS[styleKey] || STAR_DESIGNS.rounded;

  const totalStars = 5;
  const stars = [];

  for (let i = 1; i <= totalStars; i++) {
    // Partial ratings render as a filled star, matching previous behaviour.
    const filled = i <= Math.floor(rating) || (i - rating < 1 && i - rating > 0);
    const variant = filled ? starDesign.filled : starDesign.empty;

    stars.push(
      <svg
        key={i}
        width={width ? `${width}px` : "20px"}
        height={height ? `${height}px` : "20px"}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        {filled ? (
          <path
            d={variant.d}
            transform={variant.transform}
            fill={color || "#108474"}
          />
        ) : (
          <path
            d={variant.d}
            transform={variant.transform}
            fill="none"
            stroke={emptyColor || "#D6D6D6"}
            strokeWidth={variant.strokeWidth || 1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>,
    );
  }

  return <InlineStack gap="025">{stars}</InlineStack>;
}
