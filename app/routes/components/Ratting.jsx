import { StarFilledIcon, StarIcon } from "@shopify/polaris-icons";
import { Icon, InlineStack, Box } from "@shopify/polaris";

export default function StarRating({ rating, color }) {
  const totalStars = 5;
  const stars = [];

  for (let i = 1; i <= totalStars; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(
        <Box as="span" key={i} style={{ color: color }}>
          <Icon source={StarFilledIcon} />
        </Box>,
      );
    } else if (i - rating < 1 && i - rating > 0) {
      stars.push(
        <Box as="span" key={i} style={{ color: color }}>
          <Icon source={StarFilledIcon} style={{ opacity: 0.5 }} />
        </Box>,
      );
    } else {
      stars.push(
        <Box as="span" key={i}>
          <Icon source={StarIcon} />
        </Box>,
      );
    }
  }

  return <InlineStack gap="025">{stars}</InlineStack>;
}
