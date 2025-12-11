import React, { useCallback, useState } from 'react'
import { Page, Image, Box, InlineStack, Select } from "@shopify/polaris"
import '@shopify/polaris/build/esm/styles.css';
import { changeLanguage } from "../../i18n";

function DeshboardHeader() {

    const changeAppLanguage = (lang) => {
        changeLanguage(lang);
        localStorage.setItem("appLanguage", lang);
    };

    const [selected, setSelected] = useState('en');

    const handleSelectChange = useCallback(
        (value) => {
            setSelected(value);
            changeAppLanguage(value);
            console.log(value,"------------------------------");
        },
        
    );

    const options = [
        { label: 'English', value: 'en' },
        { label: 'Hindi', value: 'hi' }
    ];

    return (
        <Page>
            <Box padding="300">

                <InlineStack align='space-between'>
                    <Image src="https://assets.judge.me/core/onboarding/logo-judgeme-2025.svg" alt="Logo" />
                    {/* <Select
                        options={options}
                        onChange={handleSelectChange}
                        value={selected}
                    /> */}
                </InlineStack>
            </Box>
        </Page>)
}

export default DeshboardHeader;