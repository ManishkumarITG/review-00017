// import {
//   IndexTable,
//   LegacyCard,
//   IndexFilters,
//   useSetIndexFiltersMode,
//   useIndexResourceState,
//   Text,
//   Badge,
//   AppProvider,
//   Icon,
//   Button,
//   InlineStack,
//   BlockStack,
//   Box,
//   ButtonGroup,
//   Page,
//   Card,
//   LegacyTabs,
//   InlineGrid,
//   Popover,
//   ActionList,
// } from "@shopify/polaris";

// import React, { useState, useCallback, useRef } from "react";
// import "@shopify/polaris/build/esm/styles.css";
// import {
//   ChevronDownIcon,
//   HeartIcon,
//   MenuHorizontalIcon,
//   PinIcon,
//   UndoIcon,
// } from "@shopify/polaris-icons";
// import StarRating from "../components/Ratting.jsx";
// import { useColorTheme } from "./ColorContext.jsx";
// import "../components/style.css";
// import { reviews, tabsdata } from "../data/reviewData.js";

// function IndexFiltersDefaultExample() {
//   const { getHexCode } = useColorTheme();

//   const starColor = getHexCode("star");

//   const [filteredOrders, setFilteredOrders] = useState(reviews);
//   const [selectedData, setSelectedDta] = useState(0);
//   const [taggedWith, setTaggedWith] = useState("");
//   const [queryValue, setQueryValue] = useState("");
//   const [selectedTab, setSelectedTab] = useState(0);
//   const [selectedButtons, setSelectedButtons] = useState([]);
//   const [pinButton, setPinButton] = useState([]);
//   const [active, setActive] = useState(null);
//   const [openPopoverId, setOpenPopoverId] = useState(null);
//   const [openMenu, setOpenMenu] = useState(null);
//   const [openNevigation, setOpenNevigation] = useState(null);
//   const [currentTab, setCurrentTab] = useState(1);
//   const [itemRenderLimit, setitemRenderLimit] = useState(0);

//   //Like button

//   const toggleButton = (id) => {
//     setSelectedButtons((prev) =>
//       prev.includes(id) ? prev.filter((btnId) => btnId !== id) : [...prev, id],
//     );
//   };

//   const togglePinButton = (id) => {
//     setPinButton((prev) =>
//       prev.includes(id) ? prev.filter((btnId) => btnId !== id) : [...prev, id],
//     );
//   };

//   const togglePopover = (id) => {
//     setOpenPopoverId((prev) => (prev === id ? null : id));
//   };
//   const toggleMenu = (id) => {
//     setOpenMenu((prev) => (prev === id ? null : id));
//   };
//   const togglenavigation = (id) => {
//     setOpenNevigation((prev) => (prev === id ? null : id));
//   };

//   const handleTabChange = useCallback((selectedTabIndex) => {
//     setSelectedDta(selectedTabIndex);
//     const params = new URLSearchParams(window.location.search);
//     params.set("key", selectedTabIndex);
//     const newUrl = window.location.pathname + "?" + params.toString();
//     window.history.pushState({}, "", newUrl);
//   }, []);

//   const toggleActive = (id) => () => {
//     setActive((activeId) => (activeId !== id ? id : null));
//   };

//   const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//   const [itemStrings, setItemStrings] = useState([
//     "All Reviews",
//     "Product Reviews",
//     "Store Reviews",
//     "Spam",
//     "Arvichiv",
//   ]);

//   const buttonRefs = useRef([]);

//   const filterOrders = useCallback(
//     (query, currentTab) => {
//       let filteredByQuery = reviews;
//       const lowerCaseQuery = query ? query.toLowerCase() : "";

//       if (lowerCaseQuery) {
//         filteredByQuery = reviews.filter((order) => {
//           const matchesName = order.userName
//             .toLowerCase()
//             .includes(lowerCaseQuery);
//           const matchesId = String(order.id).includes(lowerCaseQuery);
//           const matchesTag = order.tag.toLowerCase().includes(lowerCaseQuery);

//           return matchesName || matchesId || matchesTag;
//         });
//       }

//       const tabName = itemStrings[currentTab];
//       let finalFilteredOrders = filteredByQuery;

//       switch (tabName) {
//         case "All Reviews":
//           break;
//         case "Product Reviews":
//           finalFilteredOrders = filteredByQuery.filter(
//             (order) => order.tag === "hot" || order.tag === "pro",
//           );
//           break;
//         case "Store Reviews":
//           finalFilteredOrders = filteredByQuery.filter(
//             (order) => order.tag === "test" || order.tag === "sale",
//           );
//           break;
//         case "Spam":
//           finalFilteredOrders = filteredByQuery.filter(
//             (order) => order.isSpamed === true,
//           );
//           if (finalFilteredOrders.length === 0) {
//             finalFilteredOrders = [];
//           }
//           break;
//         case "Arvichiv":
//           finalFilteredOrders = filteredByQuery.filter(
//             (order) => order.tag === "new",
//           );
//           break;
//         default:
//           finalFilteredOrders = filteredByQuery;
//       }

//       setFilteredOrders(finalFilteredOrders);
//     },
//     [reviews, itemStrings],
//   );

//   const allReviewsContent = `All Reviews (${reviews.length})`;

//   const tabs = itemStrings.map((item, index) => ({
//     content: index === 0 ? allReviewsContent : item,
//     index,
//     onAction: () => {
//       setSelected(index);
//       setSelectedTab(index);
//       filterOrders(queryValue, index);

//       const params = new URLSearchParams(window.location.search);
//       params.set("table", item);
//       const newUrl = window.location.pathname + "?" + params.toString();
//       window.history.pushState({}, "", newUrl);
//     },
//     id: `${item}-${index}`,
//     actions: [],
//   }));

//   const [selected, setSelected] = useState(0);

//   const [sortSelected, setSortSelected] = useState(["order asc"]);
//   const { mode, setMode } = useSetIndexFiltersMode();
//   const onHandleCancel = () => {};
//   const onHandleSave = async () => {
//     await sleep(1);
//     return true;
//   };

//   const handleFiltersQueryChange = useCallback(
//     (value) => {
//       setQueryValue(value);
//       filterOrders(value, selectedTab);
//     },
//     [filterOrders, selectedTab],
//   );

//   const onQueryClear = useCallback(() => {
//     setQueryValue("");
//     filterOrders("", selectedTab);
//   }, [filterOrders, selectedTab]);

//   const handleTaggedWithRemove = useCallback(() => setTaggedWith(""), []);

//   const handleFiltersClearAll = useCallback(() => {
//     handleAccountStatusRemove();
//     handleTaggedWithRemove();
//     onQueryClear();
//   }, [onQueryClear, handleTaggedWithRemove]);

//   const splitedfilteredOrders = filteredOrders.slice(
//     itemRenderLimit,
//     itemRenderLimit + 10,
//   );

//   const { selectedResources, allResourcesSelected, handleSelectionChange } =
//     useIndexResourceState(filteredOrders);

//   const rowMarkup = splitedfilteredOrders.map(
//     (
//       { id, userName, item, time, Rating, comment, tag, isPin, isSpamed },
//       index,
//     ) => (
//       <IndexTable.Row
//         id={id}
//         key={id}
//         selected={selectedResources.includes(id)}
//         position={index}
//       >
//         <IndexTable.Cell>
//           <BlockStack gap={100}>
//             <Text fontWeight="bold" style={{ textDecoration: "underline" }}>
//               <span style={{ textDecoration: "underline" }}>{userName}</span>
//             </Text>
//             <Text>
//               <span style={{ textDecoration: "underline" }}>{item}</span>
//             </Text>
//             <Text>Via Web</Text>
//             <InlineStack gap={200}>
//               <Button
//                 variant={selectedButtons.includes(id) ? "primary" : "secondary"}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   toggleButton(id);
//                 }}
//               >
//                 <Icon source={HeartIcon} tone="base" />
//               </Button>
//               <Button
//                 variant={pinButton.includes(id) ? "primary" : "secondary"}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   togglePinButton(id);
//                 }}
//               >
//                 <Icon source={PinIcon} tone="base" />
//               </Button>
//             </InlineStack>
//           </BlockStack>
//         </IndexTable.Cell>
//         <IndexTable.Cell> {time}</IndexTable.Cell>
//         <IndexTable.Cell>
//           <BlockStack>
//             <Box>
//               <StarRating rating={Rating} color={starColor} />
//             </Box>
//             <Text fontWeight="bold">{comment}</Text>
//             <Text fontWeight="bold">{tag}</Text>
//           </BlockStack>
//         </IndexTable.Cell>
//         <IndexTable.Cell>
//           <InlineStack
//             align="end"
//             blockAlign="center"
//             style={{ width: "100%" }}
//           >
//             <InlineStack gap="800">
//               <Popover
//                 active={openPopoverId === id}
//                 fullWidth={true}
//                 preferredAlignment="right"
//                 activator={
//                   <Button
//                     ref={(el) => (buttonRefs.current[index] = el)}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleActive("popover1")();
//                       togglePopover(id);
//                       setOpenMenu(null);
//                       setOpenNevigation(null);
//                     }}
//                     icon={ChevronDownIcon}
//                     accessibilityLabel="Other save actions"
//                   >
//                     Published
//                   </Button>
//                 }
//                 autofocusTarget="first-node"
//                 onClose={() => setOpenPopoverId(null)}
//               >
//                 <ActionList
//                   actionRole="menuitem"
//                   items={[
//                     {
//                       content: "Spam",
//                       onAction: (e) => {
//                         // e.stopPropagation();
//                         console.log("action", id);
//                         isSpamed = !isSpamed;
//                       },
//                     },
//                     {
//                       content: "Froud",
//                       onAction: (e) => {
//                         e.stopPropagation();
//                       },
//                     },
//                     {
//                       content: "Delete",
//                       onAction: (e) => {
//                         e.stopPropagation();
//                       },
//                     },
//                   ]}
//                 />
//               </Popover>
//               <ButtonGroup>
//                 <Popover
//                   active={openNevigation === id}
//                   preferredAlignment="right"
//                   activator={
//                     <Button
//                       icon={UndoIcon}
//                       ref={(el) => (buttonRefs.current[index] = el)}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         toggleActive("popover1")();
//                         togglenavigation(id);
//                         setOpenMenu(null);
//                         setOpenPopoverId(null);
//                       }}
//                       accessibilityLabel="Other save actions"
//                     />
//                   }
//                   autofocusTarget="first-node"
//                   onClose={() => setOpenNevigation(null)}
//                 >
//                   <div onClick={(e) => e.stopPropagation()}>
//                     <ActionList
//                       actionRole="menuitem"
//                       items={[
//                         {
//                           content: "leave",
//                           onAction: (e) => {
//                             e.stopPropagation();
//                           },
//                         },
//                         {
//                           content: "More",
//                           onAction: (e) => {
//                             e.stopPropagation();
//                           },
//                         },
//                       ]}
//                     />
//                   </div>
//                 </Popover>
//                 <Popover
//                   active={openMenu === id}
//                   preferredAlignment="left"
//                   activator={
//                     <Button
//                       icon={MenuHorizontalIcon}
//                       ref={(el) => (buttonRefs.current[index] = el)}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         toggleActive("popover1")();
//                         toggleMenu(id);
//                         setOpenPopoverId(null);
//                         setOpenNevigation(null);
//                       }}
//                       accessibilityLabel="Other save actions"
//                     />
//                   }
//                   autofocusTarget="first-node"
//                   onClose={() => setOpenMenu(null)}
//                 >
//                   <ActionList
//                     actionRole="menuitem"
//                     items={[
//                       {
//                         content: "Edit",
//                         onAction: (e) => {
//                           e.stopPropagation();
//                         },
//                       },
//                       {
//                         content: "Share",
//                         onAction: (e) => {
//                           e.stopPropagation();
//                         },
//                       },
//                     ]}
//                   />
//                 </Popover>
//               </ButtonGroup>
//             </InlineStack>
//           </InlineStack>
//         </IndexTable.Cell>
//       </IndexTable.Row>
//     ),
//   );

//   return (
//     <AppProvider>
//       <Page fullWidth>
//         <InlineGrid gap="400">
//           <Card padding="025">
//             <LegacyTabs
//               tabs={tabsdata}
//               selected={selectedData}
//               onSelect={handleTabChange}
//             ></LegacyTabs>
//           </Card>

//           <InlineStack gap="200">
//             <Text variant="headingLg" as="h2">
//               Reviews
//             </Text>
//             <Badge
//               tone="success"
//               variant="outline"
//               spacing="tight"
//               progress="complete"
//             >
//               Auto Publish
//             </Badge>
//           </InlineStack>

//           <LegacyCard>
//             <IndexFilters
//               sortSelected={sortSelected}
//               queryValue={queryValue}
//               queryPlaceholder="Searching in all"
//               onQueryChange={handleFiltersQueryChange}
//               onQueryClear={onQueryClear}
//               onSort={setSortSelected}
//               cancelAction={{
//                 onAction: onHandleCancel,
//                 disabled: false,
//                 loading: false,
//               }}
//               tabs={tabs}
//               filters={[]}
//               onClearAll={handleFiltersClearAll}
//               mode={mode}
//               setMode={setMode}
//               onCreateNewView={undefined}
//               canCreateNewView={false}
//             />

//             <IndexTable
//               itemCount={filteredOrders.length}
//               selectedItemsCount={
//                 allResourcesSelected ? "All" : selectedResources.length
//               }
//               onSelectionChange={handleSelectionChange}
//               headings={[
//                 { title: "Customer" },
//                 { title: "Created" },
//                 { title: "Ratting" },
//                 { title: "status", alignment: "end" },
//               ]}
//             >
//               {rowMarkup}
//             </IndexTable>
//           </LegacyCard>
//         </InlineGrid>

//         {reviews.length > 10 ? (
//           <Card gap={200} style={{ margin: "30px 0" }}>
//             <InlineStack gap={900} align="space-between">
//               <Button
//                 disabled={currentTab === 1}
//                 variant="primary"
//                 onClick={() => {
//                   setCurrentTab((prev) => prev - 1);
//                   setitemRenderLimit((pre) => pre - 10);
//                 }}
//               >
//                 Previus
//               </Button>
//               {currentTab}
//               <Button
//                 variant="primary"
//                 onClick={() => {
//                   setCurrentTab((prev) => prev + 1);
//                   setitemRenderLimit((pre) => pre + 10);
//                 }}
//                 disabled={itemRenderLimit + 10 >= reviews.length}
//               >
//                 Next
//               </Button>
//               {console.log("lengths", itemRenderLimit + 10, reviews.length)}
//             </InlineStack>
//           </Card>
//         ) : (
//           ""
//         )}
//       </Page>
//     </AppProvider>
//   );
// }

// export default IndexFiltersDefaultExample;



import {
  IndexTable,
  LegacyCard,
  IndexFilters,
  useSetIndexFiltersMode,
  useIndexResourceState,
  Text,
  Badge,
  AppProvider,
  Icon,
  Button,
  InlineStack,
  BlockStack,
  Box,
  ButtonGroup,
  Page,
  Card,
  LegacyTabs,
  InlineGrid,
  Popover,
  ActionList,
  useBreakpoints,
  FormLayout,
  TextField,
  Form,
} from "@shopify/polaris";


import { Modal, TitleBar, useAppBridge } from '@shopify/app-bridge-react';


import "../components/style.css"
import { useState, useCallback, useEffect, useRef } from "react";
import "@shopify/polaris/build/esm/styles.css";


import {
  ChevronDownIcon,
  HeartIcon,
  MenuHorizontalIcon,
  PinIcon,
  UndoIcon,
} from "@shopify/polaris-icons";
import StarRating from "../components/Ratting.jsx";
import { useColorTheme } from "./ColorContext.jsx";
import "../components/style.css";
import { reviews, tabsdata } from "../data/reviewData.js";
import EditReviewForm from "../components/EditReviewForm.jsx";

function IndexFiltersDefaultExample() {


  // function FormData({ formData, HandleFormChanges }) {
  //   return (
  //     <>
  //       <Form>
  //         <FormLayout>
  //           <TextField
  //             label="Review"
  //             placeholder="Enter Review"
  //             onChange={(value) => HandleFormChanges(value, "review")}
  //             value={formData.review}
  //             name="review"
  //           />
  //           <TextField
  //             label="Title"
  //             placeholder="Enter Title"
  //             value={formData.title}
  //             onChange={(value) => { HandleFormChanges(value, "title") }}
  //             name="title"
  //           />
  //           <TextField
  //             label="Tag"
  //             placeholder="Enter Tag"
  //             value={formData.tag}
  //             onChange={(value) => HandleFormChanges(value, "tag")}
  //             name="tag"
  //           />
  //           <TextField
  //             label="Rating"
  //             placeholder="Enter Rating"
  //             value={formData.rating}
  //             onChange={(value) => HandleFormChanges(value, "rating")}
  //             name="rating"
  //           />
  //           <TextField
  //             label="Item Name"
  //             placeholder="Enter Item Name"
  //             value={formData.itemName}
  //             onChange={(value) => HandleFormChanges(value, "itemName")}
  //             name="itemName"
  //           />
  //         </FormLayout>
  //       </Form>
  //     </>
  //   )
  // }
  const shopify = useAppBridge();


  const { getHexCode } = useColorTheme();


  const starColor = getHexCode("star");
  const [filteredOrders, setFilteredOrders] = useState(reviews);
  const [selectedData, setSelectedDta] = useState(0);
  const [_taggedWith, setTaggedWith] = useState("");
  const [queryValue, setQueryValue] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [pinButton, setPinButton] = useState([]);
  const [_active, setActive] = useState(null);
  const [openPopoverId, setOpenPopoverId] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [openNevigation, setOpenNevigation] = useState(null);
  const [currentTab, setCurrentTab] = useState(1);
  const [itemRenderLimit, setitemRenderLimit] = useState(0);
  const [_selected, setSelected] = useState(0);
  const [formData, setFormData] = useState({});
  const [formActive, setFormActive] = useState(false);
  const [sortSelected, setSortSelected] = useState(["order asc"]);
  const { mode, setMode } = useSetIndexFiltersMode();
  const [dataLength, setDataLength] = useState(reviews.length);




  //form changes
  const HandleFormChanges = (value, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };




  //Like button
  const toggleButton = (id) => {
    setSelectedButtons((prev) =>
      prev.includes(id)
        ? prev.filter((btnId) => btnId !== id)
        : [...prev, id]
    );
  };


  // Form toggle
  const handleActionClick = useCallback((id) => (event) => {
    event.stopPropagation();
    setFormActive(!formActive);
  }, []);


  // Pin button
  const togglePinButton = (id) => {
    setPinButton((prev) =>
      prev.includes(id)
        ? prev.filter((btnId) => btnId !== id)
        : [...prev, id]
    );
  };


  // Popover toggles
  const togglePopover = (id) => {
    setOpenPopoverId((prev) => (prev === id ? null : id));
  };
  const toggleMenu = (id) => {
    setOpenMenu((prev) => (prev === id ? null : id));
  };
  const togglenavigation = (id) => {
    setOpenNevigation((prev) => (prev === id ? null : id));
  };



  const handleTabChange = useCallback((selectedTabIndex) => {
    setSelectedDta(selectedTabIndex);
    const params = new URLSearchParams(window.location.search);
    params.set("key", selectedTabIndex);
    const newUrl = window.location.pathname + "?" + params.toString();
    window.history.pushState({}, "", newUrl);


  }, []);


  const toggleActive = (id) => () => {
    setActive((activeId) => (activeId !== id ? id : null));
  };


  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


  const [itemStrings, setItemStrings] = useState([
    "All Reviews",
    "Product Reviews",
    "Store Reviews",
    "Spam",
    "Arvichiv",
  ]);


  const buttonRefs = useRef([]);


  const filterOrders = useCallback(
    (query, currentTab) => {
      let filteredByQuery = filteredOrders;
      const lowerCaseQuery = query ? query.toLowerCase() : "";


      if (lowerCaseQuery) {
        filteredByQuery = reviews.filter((order) => {
          const matchesName = order.userName
            .toLowerCase()
            .includes(lowerCaseQuery);
          const matchesId = String(order.id).includes(lowerCaseQuery);
          const matchesTag = order.tag.toLowerCase().includes(lowerCaseQuery);


          return matchesName || matchesId || matchesTag;
        });
      }


      const tabName = itemStrings[currentTab];
      let finalFilteredOrders = filteredByQuery;


      switch (tabName) {
        case "All Reviews":
          break;
        case "Product Reviews":
          finalFilteredOrders = filteredByQuery.filter(
            (order) => order.tag === "hot" || order.tag === "pro",
          );
          break;
        case "Store Reviews":
          finalFilteredOrders = filteredByQuery.filter(
            (order) => order.tag === "test" || order.tag === "sale",
          );
          break;
        case "Spam":
          finalFilteredOrders = filteredByQuery.filter((order) => {
            return order.isSpamed === true
          }


          );
          if (finalFilteredOrders.length === 0) {
            finalFilteredOrders = [];
          }
          break;
        case "Arvichiv":
          finalFilteredOrders = filteredByQuery.filter(
            (order) => {
              return order.isPin === true
            }
          );
          break;
        default:
          finalFilteredOrders = filteredByQuery;
      }


      setFilteredOrders(finalFilteredOrders);
    },
    [reviews, itemStrings],
  );


  const allReviewsContent = `All Reviews (${dataLength})`;


  const tabs = itemStrings.map((item, index) => ({
    content: index === 0 ? allReviewsContent : item,
    index,
    onAction: () => {
      setSelected(index);
      setSelectedTab(index);
      filterOrders(queryValue, index);


      const params = new URLSearchParams(window.location.search);
      params.set("table", item);
      const newUrl = window.location.pathname + "?" + params.toString();
      window.history.pushState({}, "", newUrl);
    },
    id: `${item}-${index}`,
    actions: [],
  }));




  const onHandleCancel = () => { };




  const handleFiltersQueryChange = useCallback(
    (value) => {
      setQueryValue(value);
      filterOrders(value, selectedTab);
    },
    [filterOrders, selectedTab],
  );


  const onQueryClear = useCallback(() => {
    setQueryValue("");
    filterOrders("", selectedTab);
  }, [filterOrders, selectedTab]);


  const handleTaggedWithRemove = useCallback(() => setTaggedWith(""), []);


  const handleFiltersClearAll = useCallback(() => {
    handleAccountStatusRemove();
    handleTaggedWithRemove();
    onQueryClear();
  }, [onQueryClear, handleTaggedWithRemove]);


  const splitedfilteredOrders = filteredOrders.slice(
    itemRenderLimit,
    itemRenderLimit + 10,
  );


  const resourceName = {
    singular: 'splitedfilteredOrder',
    plural: 'splitedfilteredOrders',
  };


  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(splitedfilteredOrders);


  const rowMarkup = splitedfilteredOrders.map(
    (
      { id, userName, item, time, Rating, comment, tag },
      index,
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <BlockStack gap={100}>
            <Box fontWeight="bold" >
              <Text >{userName}</Text>
            </Box>
            <Box>
              <Text>{item}</Text>
            </Box>
            <Text>Via Web</Text>
            <InlineStack gap={200}>
              <Button
                variant={selectedButtons.includes(id) ? "primary" : "secondary"}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleButton(id);
                }}
              >
                <Icon source={HeartIcon} tone="base" />
              </Button>
              <Button
                variant={pinButton.includes(id) ? "primary" : "secondary"}
                onClick={(e) => {
                  e.stopPropagation();
                  togglePinButton(id)
                  splitedfilteredOrders.filter((review) => {
                    if (review.id === id) {
                      review.isPin = true;
                      // setPinList((prev) => [...prev, review]);
                    }


                  })


                }}>
                <Icon source={PinIcon} tone="base" />
              </Button>
            </InlineStack>
          </BlockStack>
        </IndexTable.Cell>
        <IndexTable.Cell> {time}</IndexTable.Cell>
        <IndexTable.Cell>
          <BlockStack>
            <Box>
              <StarRating rating={Rating} color={starColor} />
            </Box>
            <Text fontWeight="bold">{comment}</Text>
            <Text fontWeight="bold">{tag}</Text>
          </BlockStack>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <InlineStack
            align="end"
            blockAlign="center"
            style={{ width: "100%" }}
          >
            <InlineStack gap="800">
              <Popover
                active={openPopoverId === id}
                fullWidth={true}
                preferredAlignment="right"
                activator={
                  <Button
                    ref={(el) => (buttonRefs.current[index] = el)}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleActive("popover1")();
                      togglePopover(id);
                      setOpenMenu(null);
                      setOpenNevigation(null);
                    }}
                    icon={ChevronDownIcon}
                    accessibilityLabel="Other save actions"
                  >
                    Published
                  </Button>
                }
                autofocusTarget="first-node"
                onClose={() => setOpenPopoverId(null)}
              >
                <ActionList
                  actionRole="menuitem"
                  items={[
                    {
                      content: "Spam",
                      onAction: (e) => {
                        if (e) {
                          e.stopPropagation();
                        }
                        splitedfilteredOrders.filter((review) => {
                          if (review.id === id) {
                            review.isSpamed = true;
                          }
                        })
                      },
                    },
                    {
                      content: "Froud",
                      onAction: (e) => {
                        e.stopPropagation();
                      },
                    },
                    {
                      content: "Delete",
                      onAction: () => {
                        reviews.filter((review) => {
                          if (review.id === id) {
                            const index = reviews.indexOf(review);
                            if (index > -1) {
                              reviews.splice(index, 1);
                            }
                            setDataLength(reviews.length);
                          }
                        })
                      },
                    },
                  ]}
                />
              </Popover>
              <ButtonGroup>
                <Popover
                  active={openNevigation === id}
                  preferredAlignment="right"
                  activator={
                    <Button
                      icon={UndoIcon}


                      onClick={(e) => {
                        e.stopPropagation();
                        toggleActive("popover1")();
                        togglenavigation(id);
                        setOpenMenu(null);
                        setOpenPopoverId(null);
                      }}
                      accessibilityLabel="Other save actions"
                    />
                  }
                  autofocusTarget="first-node"
                  onClose={() => setOpenNevigation(null)}
                >
                  <Box onClick={(e) => e.stopPropagation()}>
                    <ActionList
                      actionRole="menuitem"
                      items={[
                        {
                          content: "leave",
                          onAction: (e) => {
                            e.stopPropagation();
                          },
                        },
                        {
                          content: "More",
                          onAction: (e) => {
                            e.stopPropagation();
                          },
                        },
                      ]}
                    />
                  </Box>
                </Popover>
                <Popover
                  active={openMenu === id}
                  preferredAlignment="left"
                  activator={
                    <Button
                      icon={MenuHorizontalIcon}


                      onClick={(e) => {
                        e.stopPropagation();
                        toggleActive("popover1")();
                        toggleMenu(id);
                        setOpenPopoverId(null);
                        setOpenNevigation(null);
                      }}
                      accessibilityLabel="Other save actions"
                    />
                  }
                  autofocusTarget="first-node"
                  onClose={() => setOpenMenu(null)}
                  ariaHaspopup={false}
                  sectioned
                >
                  <ActionList
                    actionRole="menuitem"
                    items={[
                      {
                        content: "Edit Review",
                        onAction: () => {
                          shopify.modal.show('my-modal')


                          handleActionClick(id);
                          // setFormActive(!formActive);
                          HandleFormChanges(id, "elementId")
                          setOpenMenu(null);
                          // e.stopPropagation();


                          splitedfilteredOrders.filter((review) => {
                            if (review.id === id) {
                              HandleFormChanges(review.comment, "review")
                              HandleFormChanges(review.userName, "title")
                              HandleFormChanges(review.tag, "tag")
                              HandleFormChanges(review.Rating, "rating")
                              HandleFormChanges(review.item, "itemName")
                            }
                          })


                        }
                      },
                      {
                        content: "Send a Response",
                        onAction: (e) => {
                          e.stopPropagation();
                        },
                      },
                    ]}
                  />
                </Popover>
              </ButtonGroup>
            </InlineStack>
          </InlineStack>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );


  return (
    <AppProvider>
      <Page fullWidth>
        <InlineGrid gap="400">
          <Card padding="025">
            <LegacyTabs
              tabs={tabsdata}
              selected={selectedData}
              onSelect={handleTabChange}
            ></LegacyTabs>
          </Card>


          <InlineStack gap="200">
            <Text variant="headingLg" as="h2">
              Reviews
            </Text>
            <Badge
              tone="success"
              variant="outline"
              spacing="tight"
              progress="complete"
            >
              Auto Publish
            </Badge>
          </InlineStack>


          <LegacyCard>
            <IndexFilters
              sortSelected={sortSelected}
              queryValue={queryValue}
              queryPlaceholder="Searching in all"
              onQueryChange={handleFiltersQueryChange}
              onQueryClear={onQueryClear}
              onSort={setSortSelected}
              cancelAction={{
                onAction: onHandleCancel,
                disabled: false,
                loading: false,
              }}
              tabs={tabs}
              filters={[]}
              onClearAll={handleFiltersClearAll}
              mode={mode}
              setMode={setMode}
              onCreateNewView={undefined}
              canCreateNewView={false}
            />


            <IndexTable
              condensed={useBreakpoints().smDown}
              itemCount={splitedfilteredOrders.length}
              resourceName={resourceName}
              hasSelection
              selectedItemsCount={
                allResourcesSelected ? "All" : selectedResources.length
              }
              onSelectionChange={handleSelectionChange}
              headings={[
                { title: "Customer" },
                { title: "Created" },
                { title: "Ratting" },
                { title: "status", alignment: "end" },
              ]}
            >
              {rowMarkup}
            </IndexTable>
          </LegacyCard>
        </InlineGrid>


        {reviews.length > 10 && (
          <Card gap={200} >
            <InlineStack gap="800" align="space-between">
              <Button
                disabled={currentTab === 1}
                variant="primary"
                onClick={() => {
                  setCurrentTab(((prev) => prev - 1))
                  setitemRenderLimit((pre) => pre - 10)
                }
                }
              >Previus</Button>
              {currentTab}
              <Button
                variant="primary"
                onClick={() => {
                  setCurrentTab((prev) => prev + 1);
                  setitemRenderLimit((pre) => pre + 10);
                }}
                disabled={itemRenderLimit + 10 >= filteredOrders.length}
              >
                Next
              </Button>
            </InlineStack>
          </Card>
        )}
        <Modal id="my-modal" >

          <Box style={{ padding: "20px" }}>
          
            <EditReviewForm formData={formData} HandleFormChanges={HandleFormChanges} />
          </Box>
          <TitleBar title="Review Edit" >
            <button variant="primary" onClick={() => {
              setFormActive(false);
              console.log("form data", formData);
              shopify.modal.hide('my-modal')
            }} >Commit Changes</button>
            <button onClick={() => shopify.modal.hide('my-modal')}>cancel</button>
          </TitleBar>
        </Modal>
      </Page>
    </AppProvider>
  );
}


export default IndexFiltersDefaultExample;


