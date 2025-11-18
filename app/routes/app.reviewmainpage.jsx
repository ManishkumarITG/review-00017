import { AppProvider} from "@shopify/polaris";
import React from 'react'
import Coordinator from "../components/Coordinator"
export default function AppReviewmainpage() {
  return (
    <AppProvider>
        <Coordinator />
    </AppProvider>
  )
}
