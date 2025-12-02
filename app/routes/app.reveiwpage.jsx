import {
  IndexTable,
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
} from "@shopify/polaris";

import { Modal, TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { useState, useCallback, useRef, useEffect } from "react";
import "@shopify/polaris/build/esm/styles.css";

import {
  ChevronDownIcon,
  HeartIcon,
  MenuHorizontalIcon,
  PinIcon,
  UndoIcon,
} from "@shopify/polaris-icons";
import StarRating from "./components/Ratting.jsx";
import { useColorTheme } from "./ColorContext.jsx";
import { reviews, tabsdata } from "./data/reviewData.js";
import EditReviewForm from "./components/EditReviewForm.jsx";

function IndexFiltersDefaultExample() {
  const shopify = useAppBridge();

  const { getHexCode } = useColorTheme();

  const starColor = getHexCode("star");

  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedData, setSelectedData] = useState(0);
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

  useEffect(() => {
    setFilteredOrders(reviews);
  }, []);

  const [itemStrings, setItemStrings] = useState([
    "All Reviews",
    "Product Reviews",
    "Store Reviews",
    "Spam",
    "Archives",
  ]);

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
      prev.includes(id) ? prev.filter((btnId) => btnId !== id) : [...prev, id],
    );
  };

  // Form toggle
  const handleActionClick = useCallback(
    (id) => (event) => {
      event.stopPropagation();
      setFormActive(!formActive);
    },
    [],
  );

  // Pin button
  const togglePinButton = (id) => {
    setPinButton((prev) =>
      prev.includes(id) ? prev.filter((btnId) => btnId !== id) : [...prev, id],
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
    setSelectedData(selectedTabIndex);
    const params = new URLSearchParams(window.location.search);
    params.set("key", selectedTabIndex);
    const newUrl = window.location.pathname + "?" + params.toString();
    window.history.pushState({}, "", newUrl);
  }, []);

  const toggleActive = (id) => () => {
    setActive((activeId) => (activeId !== id ? id : null));
  };

  const filterOrders = useCallback(
    (query, currentTab) => {
      let filteredByQuery = filteredOrders;
      console.log("1", filteredOrders, "2", reviews);
      console.log("frist data", filteredByQuery);
      const lowerCaseQuery = query ? query.toLowerCase() : "";

      if (lowerCaseQuery) {
        filteredByQuery = filteredOrders.filter((order) => {
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

      console.log("tapname", tabName, filteredByQuery, currentTab, query);

      switch (tabName) {
        case "All Reviews":
          finalFilteredOrders = filteredOrders;
          break;
        case "Product Reviews":
          setCurrentTab(1);
          setitemRenderLimit(0);
          finalFilteredOrders = filteredByQuery.filter(
            (order) => order.tag === "hot" || order.tag === "pro",
          );
          break;
        case "Store Reviews":
          setCurrentTab(1);
          setitemRenderLimit(0);
          finalFilteredOrders = filteredByQuery.filter(
            (order) => order.tag === "test" || order.tag === "sale",
          );
          break;
        case "Spam":
          setCurrentTab(1);
          setitemRenderLimit(0);
          finalFilteredOrders = filteredByQuery.filter((order) => {
            return order.isSpamed === true;
          });
          if (finalFilteredOrders.length === 0) {
            finalFilteredOrders = [];
          }
          break;
        case "Archives":
          setCurrentTab(1);
          setitemRenderLimit(0);
          finalFilteredOrders = filteredByQuery.filter((order) => {
            return order.isPin === true;
          });
          break;
        default:
          finalFilteredOrders = filteredByQuery;
      }

      setFilteredOrders(finalFilteredOrders);
    },
    [filteredOrders, itemStrings],
  );

  const allReviewsContent = ` ${"All Reviews (" + filteredOrders.length + ")"}`;

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

  const onHandleCancel = () => {};

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

  console.log(
    "--------------------------- data in reviewpage",
    splitedfilteredOrders,
  );

  const resourceName = {
    singular: "splitedfilteredOrder",
    plural: "splitedfilteredOrders",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(splitedfilteredOrders);

  const rowMarkup = splitedfilteredOrders?.map(
    ({ id, userName, item, time, Rating, comment, tag }, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <BlockStack gap={100}>
            <Text fontWeight="bold">{userName}</Text>

            <Text>{item}</Text>

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
                  togglePinButton(id);
                  splitedfilteredOrders.filter((review) => {
                    if (review.id === id) {
                      review.isPin = true;
                    }
                  });
                }}
              >
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
          <InlineStack align="end" blockAlign="center">
            <InlineStack gap="800">
              <Popover
                active={openPopoverId === id}
                fullWidth={true}
                preferredAlignment="right"
                activator={
                  <Button
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
                        });
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
                        filteredOrders.filter((review) => {
                          if (review.id === id) {
                            const index = filteredOrders.indexOf(review);
                            if (index > -1) {
                              filteredOrders.splice(index, 1);
                            }
                            setDataLength(filteredOrders.length);
                          }
                        });
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
                          shopify.modal.show("my-modal");

                          handleActionClick(id);
                          // setFormActive(!formActive);
                          HandleFormChanges(id, "elementId");
                          setOpenMenu(null);
                          // e.stopPropagation();

                          splitedfilteredOrders.filter((review) => {
                            if (review.id === id) {
                              HandleFormChanges(review.comment, "review");
                              HandleFormChanges(review.userName, "title");
                              HandleFormChanges(review.tag, "tag");
                              HandleFormChanges(review.Rating, "rating");
                              HandleFormChanges(review.item, "itemName");
                            }
                          });
                        },
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

          <Card>
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
                { title: "Rating" },
                { title: "status", alignment: "end" },
              ]}
            >
              {rowMarkup}
            </IndexTable>
          </Card>
        </InlineGrid>

        {filteredOrders.length > 10 && (
          <Card gap={200}>
            <InlineStack gap="800" align="space-between">
              <Button
                disabled={currentTab === 1}
                variant="primary"
                onClick={() => {
                  setCurrentTab((prev) => prev - 1);
                  setitemRenderLimit((pre) => pre - 10);
                }}
              >
                Previus
              </Button>
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
        <Modal id="my-modal">
          <Box style={{ padding: "20px" }}>
            <EditReviewForm
              formData={formData}
              HandleFormChanges={HandleFormChanges}
            />
          </Box>
          <TitleBar title="Review Edit">
            <button
              variant="primary"
              onClick={() => {
                setFormActive(false);
                console.log("form data", formData);
                shopify.modal.hide("my-modal");
              }}
            >
              Commit Changes
            </button>
            <button onClick={() => shopify.modal.hide("my-modal")}>
              cancel
            </button>
          </TitleBar>
        </Modal>
      </Page>
    </AppProvider>
  );
}

export default IndexFiltersDefaultExample;
