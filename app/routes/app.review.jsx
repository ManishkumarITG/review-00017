// import React, { useCallback, useState } from 'react'

// import Polaris, { AppProvider } from '@shopify/polaris';
// const {  Tabs,  Button, Text,  Badge, InlineStack, LegacyCard } = Polaris;

// // import InlineStack from "@shopify/polaris";
// import "@shopify/polaris/build/esm/styles.css";
// import AllReaviews from '../components/AllReaviews';


// export default function Coordinator() {
//     const [selected, setSelected] = useState(0);

//     const handleTabChange = useCallback((selectedTabIndex) => {
//         setSelected(selectedTabIndex);
//     }, []); 


//     const tabs = [
//         {
//             id: 'all-customers-4',
//             content: 'All Reviews',
//             accessibilityLabel: 'All customers',
//             panelID: 'all-customers-content-4',
//         },
//         {
//             id: 'accepts-marketing-4',
//             content: 'Product Reviews',
//             panelID: 'accepts-marketing-content-4',
//         },
//         {
//             id: 'repeat-customers-4',
//             content: 'Store Reviews',
//             panelID: 'repeat-customers-content-4',
//         },
//         {
//             id: 'prospects-4',
//             content: 'Spam  ',
//             panelID: 'prospects-content-4',
//         },
//         {
//             id: 'prospects-5',
//             content: 'Archivs',
//             panelID: 'prospects-content-4',
//         },
//     ];


//     const renderTabContent = () => {
//         switch (selected) {
//             case 0:
//                 return <AllReaviews />;
//             case 1:
//                 return <Text>Yet to build 2 </Text>;
//             case 2:
//                 return <Text>Yet to build 3</Text>;
//             case 3:
//                 return <Text>Yet to build 4</Text>;
//             default:
//                 return null;
//         }
//     };

//     // return (
//     //     <>
//     //     <AppProvider>

//     //         <InlineStack alignment="space-between" align="space-between" padding="400">
//     //             <InlineStack gap="200">
//     //                 <Text variant="headingLg" as="h2">Reviews</Text>
//     //                 <Badge tone="success" variant="outline" spacing="tight" progress="complete">
//     //                     Auto Publish
//     //                 </Badge>
//     //             </InlineStack>
//     //             <InlineStack gap="200">
//     //                 <Button>
//     //                     Import
//     //                 </Button>
//     //                 <Button>
//     //                     Publish an Mordarate
//     //                 </Button>
//     //                 <Button>
//     //                     Edit product review  group
//     //                 </Button>
//     //                 <Button>
//     //                     Export
//     //                 </Button>
//     //             </InlineStack  >

//     //         </InlineStack  >

//     //         <LegacyCard>
//     //             <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
//     //                 <LegacyCard.Section title={tabs[selected].content}>
//     //                     {renderTabContent()}
//     //                 </LegacyCard.Section>
//     //             </Tabs>
//     //         </LegacyCard>
//     //     </AppProvider>
//     //     </>
//     // )
//   return (
//     <AppProvider>
//       <Page fullWidth={true}>
//         <Card padding="50">
//           <LegacyTabs
//             tabs={tabs}
//             selected={selected}
//             onSelect={handleTabChange}
//           ></LegacyTabs>
//         </Card>


//       </Page>
//     </AppProvider>
//   );
// }


import React from 'react'
import ReviewDetailsPage from '../components/ReviewDetails.jsx'
import ReviewsPage from "../components/ReviewsPage.jsx"
import { AppProvider } from '@shopify/polaris'
import { Route, Router, Routes } from 'react-router';
function Review() {
  const reviews = [
    { id: "R123", date: "2025-11-19", rating: 4.5, description: "Great product!", salesItems: ["Payouts"] },
    { id: "R124", date: "2025-11-18", rating: 3.8, description: "Good quality!", salesItems: ["Total Sales"] },
    { id: "R125", date: "2025-11-17", rating: 5, description: "Excellent!", salesItems: ["Payouts", "Total Sales"] },
  ];
  return (
    <AppProvider>
      hello review
      {/* <Router> */}
      {/* <Routes>
          <Route path="/" element={<ReviewsPage reviews={reviews} />} />
          <Route path="/review/:id" element={<ReviewDetailsPage reviews={reviews} />} />
        </Routes>
      </Router> */}
      <ReviewsPage reviews={reviews} />
      <ReviewDetailsPage reviews={reviews} />
    </AppProvider>
  )
}

export default Review
