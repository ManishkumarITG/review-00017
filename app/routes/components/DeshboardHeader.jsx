import React, { useCallback, useState } from 'react'
import { Page, Image, Box, InlineStack, Select, Card } from "@shopify/polaris"
import '@shopify/polaris/build/esm/styles.css';
import { useTranslation } from 'react-i18next';
function DeshboardHeader() {
    const { i18n } = useTranslation();

    const [selected, setSelected] = useState('en');

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);   // 🔥 language switch here
    };

    const handleSelectChange = useCallback(
        (value) => {setSelected(value)
            changeLanguage(value)
        },

        [],
    );
    const options = [
        { label: 'English', value: 'en' },
        { label: 'hi', value: 'hi' }
    ];
    return (
        <InlineStack align='space-between' padding="300">
            <Image src="https://assets.judge.me/core/onboarding/logo-judgeme-2025.svg" alt="Logo" />
                <Select
                    options={options}
                    onChange={handleSelectChange}
                    value={selected}
                />
        </InlineStack >)
}

export default DeshboardHeader