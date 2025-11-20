import React from "react";


import { StarFilledIcon, StarIcon } from "@shopify/polaris-icons";
import { Icon , InlineStack } from "@shopify/polaris";

export default function StarRating({ rating , color}) {
    const totalStars = 5;
    const stars = []


    for (let i = 1; i <= totalStars; i++) {
        if (i <= Math.floor(rating)) {
            stars.push(<span key={i} style={{ color: color }}>
                <Icon source={StarFilledIcon} />
            </span>
            );
        } else if (i - rating < 1 && i - rating > 0) {
            stars.push(
                <span key={i} style={{ color: color }}>
                    <Icon source={StarFilledIcon}  style={{opacity: 0.5}}/>
                </span>
            );
        } else {
            stars.push(<span><Icon key={i} source={StarIcon} /></span>);
        }
    }

    return <InlineStack style={{ maxWidth: '200px' }} gap="1">{stars}</InlineStack>;
}
