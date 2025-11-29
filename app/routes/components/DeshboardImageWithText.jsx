import { Box,  MediaCard } from '@shopify/polaris';
import React from 'react';
import '@shopify/polaris/build/esm/styles.css';

function DeshboardImageWithText({ card }) {
    return (
        <>
            <Box padding="300">
                <MediaCard
                    title={card.title}
                    primaryAction={{
                        content: card.buttontext,
                        onAction: () => { },
                    }}
                    description={card.textcontent}
                    // popoverActions={[{ content: 'Dismiss', onAction: () => { } }]}
                    size="small"
                >
                    <img
                        alt=""
                        width="100%"
                        height="100%"
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                        }}
                        src={card.imageurl}
                    />
                </MediaCard>
            </Box>

        </>
    );
}


export default DeshboardImageWithText;