
// import {
//   Page,
//   Card,
//   AppProvider,
//   InlineGrid,
//   Box,
//   Text,
//   InlineStack,
//   BlockStack,
//   Button,
//   Checkbox,
//   TextField,
//   LegacyTabs,
//   Banner,
//   Icon,
//   Form,
//   FormLayout,
// } from "@shopify/polaris";
// import "@shopify/polaris/build/esm/styles.css";
// import { useColorTheme } from "./ColorContext";
// import { useCallback, useReducer, useState } from "react";
// import {
//   ArrowLeftIcon,
//   StarFilledIcon,
//   StarIcon,
// } from "@shopify/polaris-icons";
// import ColorPickerCircle from "./components/ColorPicker.jsx";
// import CollapsibleBox from "./components/Collapsible.jsx";
// import DropZoneWithImageFileUpload from "./components/ImageDrop.jsx";
// import { useNavigate } from "react-router";

// const initialState = {
//   Widget_title: "Costomer review",
//   Average_rating_text: 4.07,
//   button_text: "Write a review",
// };

// const colorInitialState = {
//   defaultColor: true,
//   customColor: false,
// };

// function reducer(state, action) {
//   return {
//     ...state,
//     [action.field]: action.value,
//   };
// }

// const colorReducer = (state, action) => {
//   switch (action.type) {
//     case "defaultColor":
//       return {
//         ...state,
//         defaultColor: true,
//         customColor: false,
//       };

//     case "customColor":
//       return {
//         ...state,
//         defaultColor: false,
//         customColor: true,
//       };

//     default:
//       return state;
//   }
// };

// export default function ReviewWidgets() {
//   // usenevigate for back to setting page

//   const nevigate = useNavigate();

//   // import color context
//   const { getHexCode, isChange } = useColorTheme();

//   // import all hex code
//   const starColor = getHexCode("star");
//   const textColor = getHexCode("text");
//   const formBackgroundColor = getHexCode("formBackgroundColor");
//   const buttonColor = getHexCode("button");
//   const buttonTextColor = getHexCode("buttonTextColor");
//   const overlayColor = getHexCode("overlayColor");

//   const [state, dispatch] = useReducer(reducer, initialState);
//   const [dateChecked, setDateChecked] = useState(false);
//   const [selected, setSelected] = useState(0);
//   const [rating, setRating] = useState(0);
//   const [isFromOpen, setIsFromOpen] = useState(false);
//   const [userReview, setUserReview] = useState("");
//   const [reqData, setReqData] = useState(false);
//   const [isImageFrom, setIsImageFrom] = useState(false);
//   const [showThankYouPage, setShowThankYouPage] = useState(false);

//   const handleSubmit = () => {
//     if (userReview.trim().length == 0) {
//       return setReqData(true);
//     }

//     setReqData(false);
//     console.log(userReview);
//     setUserReview("");
//     if (!isImageFrom) {
//       setIsImageFrom(true);

//     }
//   };

//   const handleReviewChange = useCallback((value) => setUserReview(value), []);

//   const handleRating = (index) => {
//     setRating(index + 1);
//     setIsFromOpen(true);
//   };

//   const [colorChangeState, colorDispatch] = useReducer(
//     colorReducer,
//     colorInitialState,
//   );

//   const handleOpen = (newChecked, id) => {
//     colorDispatch({
//       type: id,
//     });
//   };

//   const handleTextChnge = useCallback((newValue, id) => {
//     dispatch({
//       field: id,
//       value: newValue,
//     });
//   }, []);

//   const handleChange = useCallback(
//     (newChecked) => setDateChecked(newChecked),
//     [],
//   );

//   const handlePageChange = async () => {
//     if (isChange) {
//       shopify.saveBar.leaveConfirmation();
//     } else {
//       nevigate("/app/mySettingPage");
//     }
//   };

//   const handleTabChange = useCallback((selectedTabIndex) => {
//     setSelected(selectedTabIndex);
//   }, []);

//   const tabs = [
//     {
//       id: "from-1",
//       content: "In-store from",
//       panelID: "all-customers-content-1",
//     },
//     {
//       id: "from-2",
//       content: "External from",
//       panelID: "accepts-marketing-content-1",
//     },
//   ];

//   return (
//     <AppProvider>
//       <Page>
//         <Card title="Credit card" sectioned>
//           <InlineGrid
//             gap="400"
//             columns={{ sm: 1, md: ["oneThird", "twoThirds"] }}
//           >
//             {/* reviews settiing */}

//             <Box
//               padding="100"
//               borderColor="border-brand"
//               borderInlineEndWidth="025"
//             >
//               <BlockStack gap="300">
//                 <InlineStack align="start" gap="200">
//                   <Button icon={ArrowLeftIcon} onClick={handlePageChange} />
//                   <Text variant="headingLg">Write a review flow</Text>
//                 </InlineStack>

//                 <Box padding="300">
//                   <BlockStack gap="100">
//                     <Checkbox
//                       label="Default colors (from your brand settings)"
//                       checked={colorChangeState.defaultColor}
//                       id="defaultColor"
//                       onChange={handleOpen}
//                     />
//                     <Checkbox
//                       label="Custom colors"
//                       checked={colorChangeState.customColor}
//                       id="customColor"
//                       onChange={handleOpen}
//                     />
//                   </BlockStack>

//                   {colorChangeState.customColor && (
//                     <>
//                       {" "}
//                       <Box padding="200">
//                         <InlineStack>
//                           <ColorPickerCircle type="star" />
//                           <Box gap="400">
//                             <Text variant="headingMd" as="p">
//                               Star Color
//                             </Text>
//                             <Text variant="headingsm" as="p">
//                               {starColor}
//                             </Text>
//                           </Box>
//                         </InlineStack>
//                       </Box>
//                       <Box padding="200">
//                         <InlineStack>
//                           <ColorPickerCircle type="text" />
//                           <Box gap="400">
//                             <Text variant="headingMd" as="p">
//                               Text Color
//                             </Text>
//                             <Text variant="headingsm" as="p">
//                               {textColor}
//                             </Text>
//                           </Box>
//                         </InlineStack>
//                       </Box>
//                       <Box padding="200">
//                         <InlineStack>
//                           <ColorPickerCircle type="formBackgroundColor" />
//                           <Box gap="400">
//                             <Text variant="headingMd" as="p">
//                               Form background color
//                             </Text>
//                             <Text variant="headingsm" as="p">
//                               {formBackgroundColor}
//                             </Text>
//                           </Box>
//                         </InlineStack>
//                       </Box>
//                       <Box padding="200">
//                         <InlineStack>
//                           <ColorPickerCircle type="button" />
//                           <Box gap="400">
//                             <Text variant="headingMd" as="p">
//                               Button Color
//                             </Text>
//                             <Text variant="headingsm" as="p">
//                               {buttonColor}
//                             </Text>
//                           </Box>
//                         </InlineStack>
//                       </Box>
//                       <Box padding="200">
//                         <InlineStack>
//                           <ColorPickerCircle type="buttonTextColor" />
//                           <Box gap="400" padding="200">
//                             <Text variant="headingMd" as="p">
//                               Butoon Text Color
//                             </Text>
//                             <Text variant="headingsm" as="p">
//                               {buttonTextColor}
//                             </Text>
//                           </Box>
//                         </InlineStack>
//                       </Box>
//                       <Box padding="200">
//                         <InlineStack>
//                           <ColorPickerCircle type="overlayColor" />
//                           <Box gap="400" padding="200">
//                             <Text variant="headingMd" as="p">
//                               In-store page overlay color
//                             </Text>
//                             <Text variant="headingsm" as="p">
//                               {overlayColor}
//                             </Text>
//                           </Box>
//                         </InlineStack>
//                       </Box>{" "}
//                     </>
//                   )}
//                 </Box>

//                 <CollapsibleBox id="theme-collapsible" boxName="Theme">
//                   {" "}
//                   <Box gap="400">
//                     <InlineStack>
//                       <Box
//                         borderStyle="solid"
//                         borderBlockStartWidth="025"
//                         padding="200"
//                         borderColor="border-brand"
//                         gap="200"
//                         width="100%"
//                       >
//                         <Checkbox
//                           label="show date"
//                           checked={dateChecked}
//                           onChange={handleChange}
//                         />
//                       </Box>
//                     </InlineStack>
//                   </Box>{" "}
//                 </CollapsibleBox>

//                 <CollapsibleBox id="text-collapsible" boxName="Text">
//                   {" "}
//                   <Box gap="400">
//                     <InlineStack>
//                       <Box
//                         borderStyle="solid"
//                         borderBlockStartWidth="025"
//                         padding="200"
//                         borderColor="border-brand"
//                         gap="200"
//                         width="100%"
//                       >
//                         <TextField
//                           label="Widget title"
//                           value={state.Widget_title}
//                           id="Widget_title"
//                           onChange={handleTextChnge}
//                           autoComplete="off"
//                           placeholder="Customer Reviews"
//                         />
//                       </Box>

//                       <Box
//                         borderStyle="solid"
//                         borderBlockStartWidth="025"
//                         padding="200"
//                         borderColor="border-brand"
//                         gap="200"
//                         width="100%"
//                       >
//                         <TextField
//                           label="Average rating text"
//                           value={state.Average_rating_text}
//                           id="Average_rating_text"
//                           onChange={handleTextChnge}
//                           autoComplete="off"
//                           type="number"
//                           placeholder="{{ average_rating }} out of 5"
//                           min="0"
//                           max="5"
//                         />
//                       </Box>

//                       <Box
//                         borderStyle="solid"
//                         borderBlockStartWidth="025"
//                         padding="200"
//                         borderColor="border-brand"
//                         gap="200"
//                         width="100%"
//                       >
//                         <TextField
//                           label="Button Text"
//                           value={state.button_text}
//                           id="button_text"
//                           onChange={handleTextChnge}
//                           autoComplete="off"
//                           placeholder="Write a review"
//                         />
//                       </Box>
//                     </InlineStack>
//                   </Box>{" "}
//                 </CollapsibleBox>
//               </BlockStack>
//             </Box>

//             {/* reviews data */}

//             <Box
//               minHeight="100vh"
//               borderColor="border-brand"
//               borderInlineStartWidth="025"
//             >
//               <LegacyTabs
//                 tabs={tabs}
//                 selected={selected}
//                 onSelect={handleTabChange}
//               ></LegacyTabs>

//               {selected == 0 ? (
//                 <Box
//                   style={{
//                     background: buttonColor,
//                     textAlign: "center",
//                     padding: "10px",
//                     margin: "10px",
//                     fontSize: "20px",
//                     fontWeight: "bold",
//                     color: buttonTextColor || "#ffffff",
//                     cursor: "pointer",
//                   }}
//                 >
//                   {state.button_text}
//                 </Box>
//               ) : (
//                 <BlockStack gap="400">
//                   <Box paddingBlockStart="400" paddingInline="200">
//                     <Banner title="This is a sample preview. Reviews submitted won't be saved." />
//                   </Box>

//                   {!isImageFrom ? (
//                     <BlockStack gap="400">
//                       {" "}
//                       <Text alignment="center" variant="heading2xl">
//                         How would you rate this product?
//                       </Text>
//                       <Text alignment="center" variant="headingMd" tone="base">
//                         We would love it if you would share a bit about your
//                         experience.
//                       </Text>
//                       <Text alignment="center" variant="headingLg">
//                         Yellow Snowboard
//                       </Text>
//                       <InlineStack gap="050" align="center">
//                         {[...Array(5)].map((_, index) => (
//                           <Box
//                             key={index}
//                             as="span"
//                             style={{
//                               color: starColor,
//                               height: "100px",
//                               cursor: "pointer",
//                             }}
//                             onClick={() => handleRating(index)}
//                           >
//                             {index < rating ? (
//                               <Icon source={StarFilledIcon} />
//                             ) : (
//                               <Icon source={StarIcon} />
//                             )}
//                           </Box>
//                         ))}
//                       </InlineStack>
//                     </BlockStack>
//                   ) : (
//                     <BlockStack>
//                       <Text alignment="center" variant="headingLg" tone="base">
//                         Share a picture
//                       </Text>
//                       <Text alignment="center" variant="headingsm">
//                         Upload a photo to support your review.
//                       </Text>
//                     </BlockStack>
//                   )}

//                   {showThankYouPage && (

//                     <BlockStack gap="400" alignment="center">
//                       <Icon
//                         source="https://cdn-icons-png.flaticon.com/512/845/845646.png"
//                         color="base"
//                         backdrop={false}
//                         style={{ width: "100px", height: "100px" }}
//                       />
//                       <Text alignment="center" variant="headingLg">
//                         Thank you for your review!
//                       </Text>
//                       <Text alignment="center" variant="headingMd" tone="base">
//                         We appreciate you taking the time to provide feedback.
//                       </Text>
//                     </BlockStack>
//                   )}


//                   <Box padding="400">
//                     {isFromOpen && (
//                       <Form>
//                         <FormLayout>
//                           {!isImageFrom ? (
//                             <TextField
//                               value={userReview}
//                               onChange={handleReviewChange}
//                               label="Review content"
//                               type="text"
//                               multiline={4}
//                               error={reqData && "data is requird"}
//                               autoComplete="email"
//                               helpText={
//                                 <Text alignment="center" as="span">
//                                   We’ll only contact you about your review if
//                                   necessary. By submitting your review, you
//                                   agree to our terms and conditions and privacy
//                                   policy.
//                                 </Text>
//                               }
//                             />
//                           ) : (
//                             <DropZoneWithImageFileUpload />
//                           )}

//                           <Box
//                             onClick={handleSubmit}
//                             style={{
//                               background: buttonColor,
//                               textAlign: "center",
//                               padding: "10px",
//                               margin: "10px",
//                               fontSize: "20px",
//                               color: buttonTextColor || "#ffffff",
//                               cursor: "pointer",
//                               width: "100%",
//                             }}
//                           >
//                             Next
//                           </Box>
//                         </FormLayout>
//                       </Form>
//                     )}
//                   </Box>
//                 </BlockStack>
//               )}
//             </Box>
//           </InlineGrid>
//         </Card>
//       </Page>
//     </AppProvider>
//   );
// }



// import {
//   Page,
//   Card,
//   AppProvider,
//   InlineGrid,
//   Box,
//   Text,
//   InlineStack,
//   BlockStack,
//   Button,
//   Checkbox,
//   TextField,
//   LegacyTabs,
//   Banner,
//   Icon,
//   Form,
//   FormLayout,
// } from "@shopify/polaris";
// import "@shopify/polaris/build/esm/styles.css";
// import { useColorTheme } from "./ColorContext";
// import { useCallback, useReducer, useState } from "react";
// import {
//   ArrowLeftIcon,
//   StarFilledIcon,
//   StarIcon,
// } from "@shopify/polaris-icons";
// import ColorPickerCircle from "./components/ColorPicker.jsx";
// import CollapsibleBox from "./components/Collapsible.jsx";
// import DropZoneWithImageFileUpload from "./components/ImageDrop.jsx";
// import { useNavigate } from "react-router";

// const initialState = {
//   Widget_title: "Costomer review",
//   Average_rating_text: 4.07,
//   button_text: "Write a review",
// };

// const colorInitialState = {
//   defaultColor: true,
//   customColor: false,
// };

// function reducer(state, action) {
//   return {
//     ...state,
//     [action.field]: action.value,
//   };
// }

// const colorReducer = (state, action) => {
//   switch (action.type) {
//     case "defaultColor":
//       return {
//         ...state,
//         defaultColor: true,
//         customColor: false,
//       };

//     case "customColor":
//       return {
//         ...state,
//         defaultColor: false,
//         customColor: true,
//       };

//     default:
//       return state;
//   }
// };

// export default function ReviewWidgets() {
//   // usenevigate for back to setting page

//   const nevigate = useNavigate();

//   // import color context
//   const { getHexCode, isChange } = useColorTheme();

//   // import all hex code
//   const starColor = getHexCode("star");
//   const textColor = getHexCode("text");
//   const formBackgroundColor = getHexCode("formBackgroundColor");
//   const buttonColor = getHexCode("button");
//   const buttonTextColor = getHexCode("buttonTextColor");
//   const overlayColor = getHexCode("overlayColor");

//   const [state, dispatch] = useReducer(reducer, initialState);
//   const [dateChecked, setDateChecked] = useState(false);
//   const [selected, setSelected] = useState(0);
//   const [rating, setRating] = useState(0);
//   const [isFromOpen, setIsFromOpen] = useState(false);
//   const [userReview, setUserReview] = useState("");
//   const [reqData, setReqData] = useState(false);
//   const [isImageFrom, setIsImageFrom] = useState(false);
//   const [showThankYouPage, setShowThankYouPage] = useState(false);

//   // const handleSubmit = () => {
//   //   if (userReview.trim().length == 0) {
//   //     return setReqData(true);
//   //   }

//   //   setReqData(false);
//   //   console.log(userReview);
//   //   setUserReview("");
//   //   if (!isImageFrom) {
//   //     setIsImageFrom(true);

//   //   }
//   // };

//   const handleSubmit = () => {
//     // Step 1: user must type something
//     if (!userReview.trim()) {
//       setReqData(true);
//       return;
//     }

//     // Step 2: move to image upload screen
//     if (!isImageFrom) {
//       setReqData(false);
//       setIsImageFrom(true);  // show image upload UI
//       return;
//     }

//     // Step 3: After image step → show thank you
//     setShowThankYouPage(true);
//     // setIsFromOpen(false);
//   };


//   const handleReviewChange = useCallback((value) => setUserReview(value), []);

//   const handleRating = (index) => {
//     setRating(index + 1);
//     setIsFromOpen(true);
//   };

//   // function Stars() {
//   //   return (
//   //     <InlineStack gap="050" align="center">
//   //       {[...Array(5)].map((_, index) => (
//   //         <Box
//   //           key={index}
//   //           as="span"
//   //           style={{
//   //             color: starColor,
//   //             height: "100px",
//   //             cursor: "pointer",
//   //           }}
//   //           onClick={() => handleRating(index)}
//   //         >
//   //           {index < rating ? (
//   //             <Icon source={StarFilledIcon} />
//   //           ) : (
//   //             <>
//   //               <Icon source={StarIcon} />
//   //             </>

//   //           )}
//   //         </Box>
//   //       ))}
//   //     </InlineStack>
//   //   )
//   // }

//   const [colorChangeState, colorDispatch] = useReducer(
//     colorReducer,
//     colorInitialState,
//   );

//   const handleOpen = (newChecked, id) => {
//     colorDispatch({
//       type: id,
//     });
//   };

//   const handleTextChnge = useCallback((newValue, id) => {
//     dispatch({
//       field: id,
//       value: newValue,
//     });
//   }, []);

//   const handleChange = useCallback(
//     (newChecked) => setDateChecked(newChecked),
//     [],
//   );

//   const handlePageChange = async () => {
//     if (isChange) {
//       shopify.saveBar.leaveConfirmation();
//     } else {
//       nevigate("/app/mySettingPage");
//     }
//   };

//   const handleTabChange = useCallback((selectedTabIndex) => {
//     setSelected(selectedTabIndex);
//   }, []);

//   const tabs = [
//     {
//       id: "from-1",
//       content: "In-store from",
//       panelID: "all-customers-content-1",
//     },
//     {
//       id: "from-2",
//       content: "External from",
//       panelID: "accepts-marketing-content-1",
//     },
//   ];

//   return (
//     <AppProvider>
//       <Page>
//         <Card title="Credit card" sectioned>
//           <InlineGrid
//             gap="400"
//             columns={{ sm: 1, md: ["oneThird", "twoThirds"] }}
//           >
//             {/* reviews settiing */}

//             <Box
//               padding="100"
//               borderColor="border-brand"
//               borderInlineEndWidth="025"
//             >
//               <BlockStack gap="300">
//                 <InlineStack align="start" gap="200">
//                   <Button icon={ArrowLeftIcon} onClick={handlePageChange} />
//                   <Text variant="headingLg">Write a review flow</Text>
//                 </InlineStack>

//                 <Box padding="300">
//                   <BlockStack gap="100">
//                     <Checkbox
//                       label="Default colors (from your brand settings)"
//                       checked={colorChangeState.defaultColor}
//                       id="defaultColor"
//                       onChange={handleOpen}
//                     />
//                     <Checkbox
//                       label="Custom colors"
//                       checked={colorChangeState.customColor}
//                       id="customColor"
//                       onChange={handleOpen}
//                     />
//                   </BlockStack>

//                   {colorChangeState.customColor && (
//                     <>
//                       {" "}
//                       <Box padding="200">
//                         <InlineStack>
//                           <ColorPickerCircle type="star" />
//                           <Box gap="400">
//                             <Text variant="headingMd" as="p">
//                               Star Color
//                             </Text>
//                             <Text variant="headingsm" as="p">
//                               {starColor}
//                             </Text>
//                           </Box>
//                         </InlineStack>
//                       </Box>
//                       <Box padding="200">
//                         <InlineStack>
//                           <ColorPickerCircle type="text" />
//                           <Box gap="400">
//                             <Text variant="headingMd" as="p">
//                               Text Color
//                             </Text>
//                             <Text variant="headingsm" as="p">
//                               {textColor}
//                             </Text>
//                           </Box>
//                         </InlineStack>
//                       </Box>
//                       <Box padding="200">
//                         <InlineStack>
//                           <ColorPickerCircle type="formBackgroundColor" />
//                           <Box gap="400">
//                             <Text variant="headingMd" as="p">
//                               Form background color
//                             </Text>
//                             <Text variant="headingsm" as="p">
//                               {formBackgroundColor}
//                             </Text>
//                           </Box>
//                         </InlineStack>
//                       </Box>
//                       <Box padding="200">
//                         <InlineStack>
//                           <ColorPickerCircle type="button" />
//                           <Box gap="400">
//                             <Text variant="headingMd" as="p">
//                               Button Color
//                             </Text>
//                             <Text variant="headingsm" as="p">
//                               {buttonColor}
//                             </Text>
//                           </Box>
//                         </InlineStack>
//                       </Box>
//                       <Box padding="200">
//                         <InlineStack>
//                           <ColorPickerCircle type="buttonTextColor" />
//                           <Box gap="400" padding="200">
//                             <Text variant="headingMd" as="p">
//                               Butoon Text Color
//                             </Text>
//                             <Text variant="headingsm" as="p">
//                               {buttonTextColor}
//                             </Text>
//                           </Box>
//                         </InlineStack>
//                       </Box>
//                       <Box padding="200">
//                         <InlineStack>
//                           <ColorPickerCircle type="overlayColor" />
//                           <Box gap="400" padding="200">
//                             <Text variant="headingMd" as="p">
//                               In-store page overlay color
//                             </Text>
//                             <Text variant="headingsm" as="p">
//                               {overlayColor}
//                             </Text>
//                           </Box>
//                         </InlineStack>
//                       </Box>{" "}
//                     </>
//                   )}
//                 </Box>

//                 <CollapsibleBox id="theme-collapsible" boxName="Theme">
//                   {" "}
//                   <Box gap="400">
//                     <InlineStack>
//                       <Box
//                         borderStyle="solid"
//                         borderBlockStartWidth="025"
//                         padding="200"
//                         borderColor="border-brand"
//                         gap="200"
//                         width="100%"
//                       >
//                         <Checkbox
//                           label="show date"
//                           checked={dateChecked}
//                           onChange={handleChange}
//                         />
//                       </Box>
//                     </InlineStack>
//                   </Box>{" "}
//                 </CollapsibleBox>

//                 <CollapsibleBox id="text-collapsible" boxName="Text">
//                   {" "}
//                   <Box gap="400">
//                     <InlineStack>
//                       <Box
//                         borderStyle="solid"
//                         borderBlockStartWidth="025"
//                         padding="200"
//                         borderColor="border-brand"
//                         gap="200"
//                         width="100%"
//                       >
//                         <TextField
//                           label="Widget title"
//                           value={state.Widget_title}
//                           id="Widget_title"
//                           onChange={handleTextChnge}
//                           autoComplete="off"
//                           placeholder="Customer Reviews"
//                         />
//                       </Box>

//                       <Box
//                         borderStyle="solid"
//                         borderBlockStartWidth="025"
//                         padding="200"
//                         borderColor="border-brand"
//                         gap="200"
//                         width="100%"
//                       >
//                         <TextField
//                           label="Average rating text"
//                           value={state.Average_rating_text}
//                           id="Average_rating_text"
//                           onChange={handleTextChnge}
//                           autoComplete="off"
//                           type="number"
//                           placeholder="{{ average_rating }} out of 5"
//                           min="0"
//                           max="5"
//                         />
//                       </Box>

//                       <Box
//                         borderStyle="solid"
//                         borderBlockStartWidth="025"
//                         padding="200"
//                         borderColor="border-brand"
//                         gap="200"
//                         width="100%"
//                       >
//                         <TextField
//                           label="Button Text"
//                           value={state.button_text}
//                           id="button_text"
//                           onChange={handleTextChnge}
//                           autoComplete="off"
//                           placeholder="Write a review"
//                         />
//                       </Box>
//                     </InlineStack>
//                   </Box>{" "}
//                 </CollapsibleBox>
//               </BlockStack>
//             </Box>

//             {/* reviews data */}

//             <Box
//               minHeight="100vh"
//               borderColor="border-brand"
//               borderInlineStartWidth="025"
//             >
//               <LegacyTabs
//                 tabs={tabs}
//                 selected={selected}
//                 onSelect={handleTabChange}
//               ></LegacyTabs>

//               {selected == 0 ? (
//                 <Box
//                   style={{
//                     background: buttonColor,
//                     textAlign: "center",
//                     padding: "10px",
//                     margin: "10px",
//                     fontSize: "20px",
//                     fontWeight: "bold",
//                     color: buttonTextColor || "#ffffff",
//                     cursor: "pointer",
//                   }}
//                 >
//                   {state.button_text}
//                 </Box>
//               ) : (
//                 <BlockStack gap="400">
//                   <Box paddingBlockStart="400" paddingInline="200">
//                     <Banner title="This is a sample preview. Reviews submitted won't be saved." />
//                   </Box>
//                   {/* {!showThankYouPage && ( */}

//                   {!isImageFrom ? (
//                     <BlockStack gap="400">
//                       {" "}
//                       <Text alignment="center" variant="heading2xl">
//                         How would you rate this product?
//                       </Text>
//                       <Text alignment="center" variant="headingMd" tone="base">
//                         We would love it if you would share a bit about your
//                         experience.
//                       </Text>
//                       <Text alignment="center" variant="headingLg">
//                         Yellow Snowboard
//                       </Text>
//                       {
//                         !isImageFrom && !showThankYouPage && (
//                           <InlineStack gap="050" align="center">
//                             {[...Array(5)].map((_, index) => (
//                               <Box
//                                 key={index}
//                                 as="span"
//                                 style={{
//                                   color: starColor,
//                                   height: "100px",
//                                   cursor: "pointer",
//                                 }}
//                                 onClick={() => handleRating(index)}
//                               >
//                                 {index < rating ? (
//                                   <Icon source={StarFilledIcon} />
//                                 ) : (
//                                   <>
//                                     <Icon source={StarIcon} />
//                                   </>

//                                 )}
//                               </Box>
//                             ))}
//                           </InlineStack>
//                         )
//                       }


//                       {/* <Stars /> */}

//                     </BlockStack>

//                   ) : (showThankYouPage ? (
//                     <Box padding="1000" >
//                       <BlockStack
//                         gap="600"
//                         alignment="center"
//                         padding="600"
//                         width="100%"
//                         style={{ maxWidth: "600px", margin: "0 auto" }}
//                       >
//                         <InlineGrid columns={{ sm: 1, md: 1 }} gap="600" alignment="center" style={{ padding: "500px" }}>

//                           <InlineGrid columns={{ sm: 1, md: 1 }} gap="600" alignment="center" style={{ padding: "500px" }}>

//                             {/* Top Thank You Message */}
//                             <BlockStack gap="300" align="center">
//                               <Text variant="headingLg" alignment="center" as="h2" fontWeight="600">
//                                 Thanks for your review!
//                               </Text>

//                               <Text variant="bodyMd" alignment="center" as="p" tone="subdued" style={{ fontWeight: "400" }} >
//                                 We are processing it and it will appear on the store soon.
//                                 You can{" "}
//                                 <span style={{ textDecoration: "underline", cursor: "pointer" }}>
//                                   edit review
//                                 </span>{" "}
//                                 by logging into your Judge.me profile.
//                               </Text>
//                             </BlockStack>

//                             {/* Second Section */}
//                             <BlockStack gap="300" align="center">
//                               <Text variant="bodyMd" alignment="center" as="h2" fontWeight="600">
//                                 Would you like to share your experience of shopping with us?
//                               </Text>

//                               <Text variant="headingMd" alignment="center" as="p" tone="subdued" style={{ fontWeight: "400" }} >
//                                 We value your feedback and use it to improve.
//                                 Please share any thoughts or suggestions you have.
//                               </Text>
//                             </BlockStack>
//                             {/* <Stars /> */}

//                           </InlineGrid>

//                           {/* Stars */}

//                         </InlineGrid>

//                       </BlockStack>
//                     </Box>
//                   ) : (
//                     <BlockStack>
//                       <Text alignment="center" variant="headingLg" tone="base">
//                         Share a picture
//                       </Text>
//                       <Text alignment="center" variant="headingsm">
//                         Upload a photo to support your review.
//                       </Text>
//                     </BlockStack>
//                   )
//                   )}
//                   {/* )} */}


//                   <>
//                     <Box padding="400">
//                       {isFromOpen && (
//                         <Form>
//                           <FormLayout>
//                             {!isImageFrom ? (
//                               <TextField
//                                 value={userReview}
//                                 onChange={handleReviewChange}
//                                 label="Review content"
//                                 type="text"
//                                 multiline={4}
//                                 error={reqData && "data is requird"}
//                                 autoComplete="email"
//                                 helpText={
//                                   <Text alignment="center" as="span">
//                                     We’ll only contact you about your review if
//                                     necessary. By submitting your review, you
//                                     agree to our terms and conditions and privacy
//                                     policy.
//                                   </Text>
//                                 }
//                               />
//                             ) : (isImageFrom && !showThankYouPage ? (

//                               <DropZoneWithImageFileUpload />
//                             ) : (
//                               // <>     <InlineStack gap="050" align="center">
//                               //   {[...Array(5)].map((_, index) => (
//                               //     <Box
//                               //       key={index}
//                               //       as="span"
//                               //       style={{
//                               //         color: starColor,
//                               //         height: "100px",
//                               //         cursor: "pointer",
//                               //       }}
//                               //       onClick={() => handleRating(index)}
//                               //     >
//                               //       {index < rating ? (
//                               //         <Icon source={StarFilledIcon} />
//                               //       ) : (
//                               //         <>
//                               //           <Icon source={StarIcon} />
//                               //         </>

//                               //       )}
//                               //     </Box>
//                               //   ))}
//                               // </InlineStack></>
//                               <>fghfghfghd</>
//                             )
//                             )}

//                             <Box
//                               onClick={handleSubmit}
//                               style={{
//                                 background: buttonColor,
//                                 textAlign: "center",
//                                 padding: "10px",
//                                 margin: "10px",
//                                 fontSize: "20px",
//                                 color: buttonTextColor || "#ffffff",
//                                 cursor: "pointer",
//                                 width: "100%",
//                               }}
//                             >
//                               Next
//                             </Box>
//                           </FormLayout>
//                         </Form>
//                       )}
//                     </Box>
//                   </>
//                   {/* )} */}

//                 </BlockStack>
//               )}
//             </Box>
//           </InlineGrid>
//         </Card>
//       </Page>
//     </AppProvider>
//   );
// }



import {
  Page,
  Card,
  AppProvider,
  InlineGrid,
  Box,
  Text,
  InlineStack,
  BlockStack,
  Button,
  Checkbox,
  TextField,
  LegacyTabs,
  Banner,
  Icon,
  Form,
  FormLayout,
} from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import { useColorTheme } from "./ColorContext";
import { useCallback, useReducer, useState } from "react";
import {
  ArrowLeftIcon,
  StarFilledIcon,
  StarIcon,
} from "@shopify/polaris-icons";
import ColorPickerCircle from "./components/ColorPicker.jsx";
import CollapsibleBox from "./components/Collapsible.jsx";
import DropZoneWithImageFileUpload from "./components/ImageDrop.jsx";
import { useNavigate } from "react-router";

const initialState = {
  Widget_title: "Costomer review",
  Average_rating_text: 4.07,
  button_text: "Write a review",
};

const colorInitialState = {
  defaultColor: true,
  customColor: false,
};

function reducer(state, action) {
  return {
    ...state,
    [action.field]: action.value,
  };
}

const colorReducer = (state, action) => {
  switch (action.type) {
    case "defaultColor":
      return {
        ...state,
        defaultColor: true,
        customColor: false,
      };

    case "customColor":
      return {
        ...state,
        defaultColor: false,
        customColor: true,
      };

    default:
      return state;
  }
};

export default function ReviewWidgets() {
  // usenevigate for back to setting page

  const nevigate = useNavigate();

  // import color context
  const { getHexCode, isChange } = useColorTheme();

  // import all hex code
  const starColor = getHexCode("star");
  const textColor = getHexCode("text");
  const formBackgroundColor = getHexCode("formBackgroundColor");
  const buttonColor = getHexCode("button");
  const buttonTextColor = getHexCode("buttonTextColor");
  const overlayColor = getHexCode("overlayColor");

  const [state, dispatch] = useReducer(reducer, initialState);
  const [dateChecked, setDateChecked] = useState(false);
  const [selected, setSelected] = useState(0);
  const [rating, setRating] = useState(0);
  const [isFromOpen, setIsFromOpen] = useState(false);
  const [userReview, setUserReview] = useState("");
  const [reqData, setReqData] = useState(false);
  const [isImageFrom, setIsImageFrom] = useState(false);
  const [showThankYouPage, setShowThankYouPage] = useState(false);

  const handleSubmit = () => {
    if (!isImageFrom) {

      if (userReview.trim().length == 0) {
        return setReqData(true);
      }

      // setReqData(false);
      console.log(userReview);
      setUserReview("");
      setReqData(false)
      setIsImageFrom(true);
      return
    }
    setShowThankYouPage(true)
  };

  const handleReviewChange = useCallback((value) => setUserReview(value), []);

  const handleRating = (index) => {
    setRating(index + 1);
    setIsFromOpen(true);
  };

  const [colorChangeState, colorDispatch] = useReducer(
    colorReducer,
    colorInitialState,
  );

  const handleOpen = (newChecked, id) => {
    colorDispatch({
      type: id,
    });
  };

  const handleTextChnge = useCallback((newValue, id) => {
    dispatch({
      field: id,
      value: newValue,
    });
  }, []);

  const handleChange = useCallback(
    (newChecked) => setDateChecked(newChecked),
    [],
  );

  const handlePageChange = async () => {
    if (isChange) {
      shopify.saveBar.leaveConfirmation();
    } else {
      nevigate("/app/mySettingPage");
    }
  };

  const handleTabChange = useCallback((selectedTabIndex) => {
    setSelected(selectedTabIndex);
  }, []);

  const tabs = [
    {
      id: "from-1",
      content: "In-store from",
      panelID: "all-customers-content-1",
    },
    {
      id: "from-2",
      content: "External from",
      panelID: "accepts-marketing-content-1",
    },
  ];

  return (
    <AppProvider>
      <Page>
        <Card title="Credit card" sectioned>
          <InlineGrid
            gap="400"
            columns={{ sm: 1, md: ["oneThird", "twoThirds"] }}
          >
            {/* reviews settiing */}

            <Box
              padding="100"
              borderColor="border-brand"
              borderInlineEndWidth="025"
            >
              <BlockStack gap="300">
                <InlineStack align="start" gap="200">
                  <Button icon={ArrowLeftIcon} onClick={handlePageChange} />
                  <Text variant="headingLg">Write a review flow</Text>
                </InlineStack>

                <Box padding="300">
                  <BlockStack gap="100">
                    <Checkbox
                      label="Default colors (from your brand settings)"
                      checked={colorChangeState.defaultColor}
                      id="defaultColor"
                      onChange={handleOpen}
                    />
                    <Checkbox
                      label="Custom colors"
                      checked={colorChangeState.customColor}
                      id="customColor"
                      onChange={handleOpen}
                    />
                  </BlockStack>

                  {colorChangeState.customColor && (
                    <>
                      {" "}
                      <Box padding="200">
                        <InlineStack>
                          <ColorPickerCircle type="star" />
                          <Box gap="400">
                            <Text variant="headingMd" as="p">
                              Star Color
                            </Text>
                            <Text variant="headingsm" as="p">
                              {starColor}
                            </Text>
                          </Box>
                        </InlineStack>
                      </Box>
                      <Box padding="200">
                        <InlineStack>
                          <ColorPickerCircle type="text" />
                          <Box gap="400">
                            <Text variant="headingMd" as="p">
                              Text Color
                            </Text>
                            <Text variant="headingsm" as="p">
                              {textColor}
                            </Text>
                          </Box>
                        </InlineStack>
                      </Box>
                      <Box padding="200">
                        <InlineStack>
                          <ColorPickerCircle type="formBackgroundColor" />
                          <Box gap="400">
                            <Text variant="headingMd" as="p">
                              Form background color
                            </Text>
                            <Text variant="headingsm" as="p">
                              {formBackgroundColor}
                            </Text>
                          </Box>
                        </InlineStack>
                      </Box>
                      <Box padding="200">
                        <InlineStack>
                          <ColorPickerCircle type="button" />
                          <Box gap="400">
                            <Text variant="headingMd" as="p">
                              Button Color
                            </Text>
                            <Text variant="headingsm" as="p">
                              {buttonColor}
                            </Text>
                          </Box>
                        </InlineStack>
                      </Box>
                      <Box padding="200">
                        <InlineStack>
                          <ColorPickerCircle type="buttonTextColor" />
                          <Box gap="400" padding="200">
                            <Text variant="headingMd" as="p">
                              Butoon Text Color
                            </Text>
                            <Text variant="headingsm" as="p">
                              {buttonTextColor}
                            </Text>
                          </Box>
                        </InlineStack>
                      </Box>
                      <Box padding="200">
                        <InlineStack>
                          <ColorPickerCircle type="overlayColor" />
                          <Box gap="400" padding="200">
                            <Text variant="headingMd" as="p">
                              In-store page overlay color
                            </Text>
                            <Text variant="headingsm" as="p">
                              {overlayColor}
                            </Text>
                          </Box>
                        </InlineStack>
                      </Box>{" "}
                    </>
                  )}
                </Box>

                <CollapsibleBox id="theme-collapsible" boxName="Theme">
                  {" "}
                  <Box gap="400">
                    <InlineStack>
                      <Box
                        borderStyle="solid"
                        borderBlockStartWidth="025"
                        padding="200"
                        borderColor="border-brand"
                        gap="200"
                        width="100%"
                      >
                        <Checkbox
                          label="show date"
                          checked={dateChecked}
                          onChange={handleChange}
                        />
                      </Box>
                    </InlineStack>
                  </Box>{" "}
                </CollapsibleBox>

                <CollapsibleBox id="text-collapsible" boxName="Text">
                  {" "}
                  <Box gap="400">
                    <InlineStack>
                      <Box
                        borderStyle="solid"
                        borderBlockStartWidth="025"
                        padding="200"
                        borderColor="border-brand"
                        gap="200"
                        width="100%"
                      >
                        <TextField
                          label="Widget title"
                          value={state.Widget_title}
                          id="Widget_title"
                          onChange={handleTextChnge}
                          autoComplete="off"
                          placeholder="Customer Reviews"
                        />
                      </Box>

                      <Box
                        borderStyle="solid"
                        borderBlockStartWidth="025"
                        padding="200"
                        borderColor="border-brand"
                        gap="200"
                        width="100%"
                      >
                        <TextField
                          label="Average rating text"
                          value={state.Average_rating_text}
                          id="Average_rating_text"
                          onChange={handleTextChnge}
                          autoComplete="off"
                          type="number"
                          placeholder="{{ average_rating }} out of 5"
                          min="0"
                          max="5"
                        />
                      </Box>

                      <Box
                        borderStyle="solid"
                        borderBlockStartWidth="025"
                        padding="200"
                        borderColor="border-brand"
                        gap="200"
                        width="100%"
                      >
                        <TextField
                          label="Button Text"
                          value={state.button_text}
                          id="button_text"
                          onChange={handleTextChnge}
                          autoComplete="off"
                          placeholder="Write a review"
                        />
                      </Box>
                    </InlineStack>
                  </Box>{" "}
                </CollapsibleBox>
              </BlockStack>
            </Box>

            {/* reviews data */}

            <Box
              minHeight="100vh"
              borderColor="border-brand"
              borderInlineStartWidth="025"
            >
              <LegacyTabs
                tabs={tabs}
                selected={selected}
                onSelect={handleTabChange}
              ></LegacyTabs>

              {selected == 0 ? (
                <Box
                  style={{
                    background: buttonColor,
                    textAlign: "center",
                    padding: "10px",
                    margin: "10px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: buttonTextColor || "#ffffff",
                    cursor: "pointer",
                  }}
                >
                  {state.button_text}
                </Box>
              ) : (
                <BlockStack gap="400">
                  <Box paddingBlockStart="400" paddingInline="200">
                    <Banner title="This is a sample preview. Reviews submitted won't be saved." />
                  </Box>

                  {!isImageFrom ? (
                    <BlockStack gap="400">
                      {" "}
                      <Text alignment="center" variant="heading2xl">
                        How would you rate this product?
                      </Text>
                      <Text alignment="center" variant="headingMd" tone="base">
                        We would love it if you would share a bit about your
                        experience.
                      </Text>
                      <Text alignment="center" variant="headingLg">
                        Yellow Snowboard
                      </Text>
                      <InlineStack gap="050" align="center">
                        {[...Array(5)].map((_, index) => (
                          <Box
                            key={index}
                            as="span"
                            style={{
                              color: starColor,
                              height: "100px",
                              cursor: "pointer",
                            }}
                            onClick={() => handleRating(index)}
                          >
                            {index < rating ? (
                              <Icon source={StarFilledIcon} />
                            ) : (
                              <Icon source={StarIcon} />
                            )}
                          </Box>
                        ))}
                      </InlineStack>
                    </BlockStack>
                  ) : showThankYouPage ? (
                    <BlockStack gap="400" alignment="center">
                      <Icon
                        source="https://cdn-icons-png.flaticon.com/512/845/845646.png"
                        color="base"
                        backdrop={false}
                        style={{ width: "100px", height: "100px" }}
                      />
                      <Text alignment="center" variant="headingLg">
                        Thank you for your review!
                      </Text>
                      <Text alignment="center" variant="headingMd" tone="base">
                        We appreciate you taking the time to provide feedback.
                      </Text>
                    </BlockStack>) : (
                    <BlockStack>
                      <Text alignment="center" variant="headingLg" tone="base">
                        Share a picture
                      </Text>
                      <Text alignment="center" variant="headingsm">
                        Upload a photo to support your review.
                      </Text>
                    </BlockStack>
                  )}
                  {/* // <BlockStack>
                    //   <Text alignment="center" variant="headingLg" tone="base">
                    //     Share a picture
                    //   </Text>
                    //   <Text alignment="center" variant="headingsm">
                    //     Upload a photo to support your review.
                    //   </Text>
                    // </BlockStack> */}


                  {/* {!isImageFrom && showThankYouPage && (

                    <BlockStack gap="400" alignment="center">
                      <Icon
                        source="https://cdn-icons-png.flaticon.com/512/845/845646.png"
                        color="base"
                        backdrop={false}
                        style={{ width: "100px", height: "100px" }}
                      />
                      <Text alignment="center" variant="headingLg">
                        Thank you for your review!
                      </Text>
                      <Text alignment="center" variant="headingMd" tone="base">
                        We appreciate you taking the time to provide feedback.
                      </Text>
                    </BlockStack>
                  )} */}


                  <Box padding="400">
                    {isFromOpen && (
                      <Form>
                        <FormLayout>
                          {!isImageFrom ? (
                            <TextField
                              value={userReview}
                              onChange={handleReviewChange}
                              label="Review content"
                              type="text"
                              multiline={4}
                              error={reqData && "data is requird"}
                              autoComplete="email"
                              helpText={
                                <Text alignment="center" as="span">
                                  We’ll only contact you about your review if
                                  necessary. By submitting your review, you
                                  agree to our terms and conditions and privacy
                                  policy.
                                </Text>
                              }
                            />
                          ) : (
                            <DropZoneWithImageFileUpload />
                          )}

                          <Box
                            onClick={handleSubmit}
                            style={{
                              background: buttonColor,
                              textAlign: "center",
                              padding: "10px",
                              margin: "10px",
                              fontSize: "20px",
                              color: buttonTextColor || "#ffffff",
                              cursor: "pointer",
                              width: "100%",
                            }}
                          >
                            Next
                          </Box>
                        </FormLayout>
                      </Form>
                    )}
                  </Box>
                </BlockStack>
              )}
            </Box>
          </InlineGrid>
        </Card>
      </Page>
    </AppProvider>
  );
}

