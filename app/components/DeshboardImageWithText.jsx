import { Box, Card, Image, InlineGrid, MediaCard } from '@shopify/polaris';
import React from 'react';
import '@shopify/polaris/build/esm/styles.css';

function DeshboardImageWithText({ title, imageurl, buttontext, textcontent }) {
    return (
        <>
            <Box padding="300">

                <MediaCard
                    title={title}
                    primaryAction={{
                        content: buttontext,
                        onAction: () => { },
                    }}
                    description={textcontent}
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
                        src={imageurl}
                    />
                </MediaCard>
            </Box>

        </>
    );
}


export default DeshboardImageWithText;