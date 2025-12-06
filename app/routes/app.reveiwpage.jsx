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
  SkeletonBodyText,
  EmptyState,
} from "@shopify/polaris";

import { Modal, TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { useState, useCallback, useEffect, useMemo } from "react";
import "@shopify/polaris/build/esm/styles.css";

import {
  ChevronDownIcon,
  MenuHorizontalIcon,
  PinIcon,
  UndoIcon,
  PinFilledIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@shopify/polaris-icons";
import { HeartUnFillIcon, HeartfillIcon } from "./icons/icon.jsx";
import StarRating from "./components/Ratting.jsx";
import { useColorTheme } from "./ColorContext.jsx";
import { tabsdata, itemStrings } from "./data/reviewData.js";
import EditReviewForm from "./components/EditReviewForm.jsx";
import {
  getAllReviews,
  getReviewsByType,
  getSearchResult,
  updatedReview,
} from "./services/api.js";
import pkg from "lodash";

function IndexFiltersDefaultExample() {
  const shopify = useAppBridge();
  const { debounce } = pkg;

  const { getHexCode } = useColorTheme();

  const starColor = getHexCode("star");

  const [reviews, setReviews] = useState([]);
  const [selectedData, setSelectedData] = useState(0);
  const [_taggedWith, setTaggedWith] = useState("");
  const [queryValue, setQueryValue] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const [_active, setActive] = useState(null);
  const [openPopoverId, setOpenPopoverId] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [openNevigation, setOpenNevigation] = useState(null);
  const [_selected, setSelected] = useState(0);
  const [formData, setFormData] = useState({});
  const [formActive, setFormActive] = useState(false);
  const [sortSelected, setSortSelected] = useState(["order asc"]);
  const [loding, setLoding] = useState(true);
  const { mode, setMode } = useSetIndexFiltersMode();
  const [refreshReviews, setRefreshReviews] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const limit = 5;
  const onQueryClear = useCallback(() => {
    setQueryValue("");
    console.log("hello query");
  }, [selectedTab]);

  const fetchResults = async (value) => {
    if (value.trim() === "") {
      setReviews([]);
      setRefreshReviews((prev) => !prev);
      return;
    }

    console.log(`Searching for: ${value}`);
    try {
      setLoding(true);
      const searchData = await getSearchResult(value);
      setReviews(searchData.data);
      console.log("Search Results:", searchData);
    } catch (error) {
      console.error("Search API Error:", error);
    } finally {
      setLoding(false);
    }
  };

  const handleUpdate = async (data) => {
    try {
      setLoding(true);
      const updateData = await updatedReview(data);
      console.log(updateData);
      const reviews = await getAllReviews(page, limit);
      setReviews(reviews.data.items);
      setTotal(reviews.data.total)
      console.log(reviews.data.total);

      setRefreshReviews((prev) => !prev);
    } catch (error) {
      console.log(error);
    } finally {
      setLoding(false);
    }
  };

  useEffect(() => {
    const getReviews = async () => {
      try {
        setLoding(true);
        const resopanse = await getAllReviews(page, limit);
        console.log(resopanse);
        setTotal(resopanse.data.total)
        setReviews(resopanse.data.items)
        console.log(resopanse.data.total)
      } catch (error) {
        console.log(error);
      } finally {
        setLoding(false);
      }
    };
    console.log("hello query changes");
    getReviews();
  }, [refreshReviews, page]);

  //form changes
  const HandleFormChanges = (value, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Form toggle
  const handleActionClick = useCallback(
    (id) => (event) => {
      event.stopPropagation();
      setFormActive(!formActive);
    },
    [],
  );

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

  const handleTapChange = useCallback(
    async (index) => {
      try {
        setLoding(true);
        const tabName = itemStrings[index];
        const splitTapName = tabName.split(" ")[0];
        const lowerCaseTapName = splitTapName.toLowerCase();
        if (lowerCaseTapName == "all") {
          setRefreshReviews((prev) => !prev);
          return;
        }
        console.log(lowerCaseTapName);

        const filterData = await getReviewsByType(lowerCaseTapName);
        console.log("filter Data", filterData);
        setReviews(filterData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoding(false);
      }
    },
    [selectedTab, setSelectedTab],
  );



  const tabs = itemStrings.map((item, index) => ({
    content: index == selectedTab ? loding ? `${item} ...` : `${item} ${reviews?.length}` : item,
    index,
    onAction: () => {
      setSelected(index);
      setSelectedTab(index);
      const params = new URLSearchParams(window.location.search);
      params.set("table", item);
      const newUrl = window.location.pathname + "?" + params.toString();
      window.history.pushState({}, "", newUrl);
      handleTapChange(index);
    },
    id: `${item}-${index}`,
    actions: [],
  }));

  const debouncedFetchResults = useMemo(() => {
    const debounced = debounce(fetchResults, 300);
    return debounced;
  }, [selectedTab]);

  const handleFiltersQueryChange = (value) => {
    setQueryValue(value);
    debouncedFetchResults(value);
  };

  useEffect(() => {
    return () => {
      debouncedFetchResults.cancel();
    };
  }, [debouncedFetchResults]);

  const handleTaggedWithRemove = useCallback(() => setTaggedWith(""), []);

  const handleFiltersClearAll = useCallback(() => {
    handleAccountStatusRemove();
    handleTaggedWithRemove();
  }, [handleTaggedWithRemove]);


  const resourceName = {
    singular: "splitedfilteredOrder",
    plural: "splitedfilteredOrders",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(reviews);

  let obj = { length: 14 };

  const skeletonMarkup = [...Array.from(obj)].map((_, i) => {
    return (
      <IndexTable.Row
        id={i}
        key={i}
        selected={selectedResources.includes(i)}
        position={i}
      >
        <IndexTable.Cell>
          <BlockStack>
            <SkeletonBodyText lines={1} />
          </BlockStack>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <SkeletonBodyText lines={1} />
        </IndexTable.Cell>
        <IndexTable.Cell>
          <SkeletonBodyText lines={1} />
        </IndexTable.Cell>
        <IndexTable.Cell>
          <SkeletonBodyText lines={1} />
        </IndexTable.Cell>
      </IndexTable.Row>
    );
  });

  const rowMarkup = reviews.map(
    (
      { _id, name, item, time, rating, description, email, spam, like, pinned },
      index,
    ) => (
      <IndexTable.Row
        id={_id}
        key={_id}
        selected={selectedResources.includes(_id)}
        position={index}
      >
        <IndexTable.Cell>
          <BlockStack gap={100}>
            <Text fontWeight="bold">{name}</Text>

            <Text>{item}</Text>

            <Text>Via Web</Text>
            <InlineStack gap={200}>
              <Button
                variant="plain"
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpdate({ id: _id, like: !like });
                }}
              >
                {like ? (
                  <Icon source={HeartfillIcon} />
                ) : (
                  <Icon source={HeartUnFillIcon} />
                )}
              </Button>
              <Button
                variant="plain"
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpdate({ id: _id, pinned: !pinned });
                }}
              >
                {pinned ? (
                  <Icon source={PinFilledIcon} tone="base" />
                ) : (
                  <Icon source={PinIcon} tone="base" />
                )}
              </Button>
            </InlineStack>
          </BlockStack>
        </IndexTable.Cell>
        <IndexTable.Cell> {time}</IndexTable.Cell>
        <IndexTable.Cell>
          <BlockStack>
            <Box>
              <StarRating rating={rating} color={starColor} />
            </Box>
            <Text fontWeight="bold">{description}</Text>
            <Text fontWeight="bold">{email}</Text>
          </BlockStack>
        </IndexTable.Cell>

        <IndexTable.Cell>
          <InlineStack align="end" blockAlign="center">
            <InlineStack gap="800">
              <Popover
                active={openPopoverId === _id}
                fullWidth={spam ? false : true}
                preferredAlignment="center"
                activator={
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleActive(_id)();
                      togglePopover(_id);
                      setOpenMenu(null);
                      setOpenNevigation(null);
                    }}
                    icon={ChevronDownIcon}
                    accessibilityLabel="Other save actions"
                  >
                    {spam ? "Hidden" : "Published"}
                  </Button>
                }
                autofocusTarget="first-node"
                onClose={() => setOpenPopoverId(null)}
              >
                <ActionList
                  items={[
                    {
                      content: spam ? "public review" : "spam",
                      onAction: () => {
                        handleUpdate({ id: _id, spam: !spam });
                      },
                    },
                  ]}
                />
              </Popover>

              <ButtonGroup>
                <Popover
                  active={openNevigation === `${_id}_${name}`}
                  preferredAlignment="right"
                  activator={
                    <Button
                      icon={UndoIcon}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleActive(`${_id}_${name}`)();
                        togglenavigation(`${_id}_${name}`);
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
                  active={openMenu === `${_id}_${email}`}
                  preferredAlignment="left"
                  activator={
                    <Button
                      icon={MenuHorizontalIcon}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleActive(`${_id}_${email}`)();
                        toggleMenu(`${_id}_${email}`);
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

                          handleActionClick(_id);
                          // setFormActive(!formActive);

                          setOpenMenu(null);
                          // e.stopPropagation();
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

            {loding ? (
              <IndexTable
                itemCount={3}
                resourceName={resourceName}
                headings={[
                  { title: "Customer" },
                  { title: "Created" },
                  { title: "Rating" },
                  { title: "status", alignment: "end" },
                ]}
              >
                {skeletonMarkup}
              </IndexTable>
            ) : reviews.length === 0 ? (
              <EmptyState
                heading="No Reviews founded"
                action={{
                  content: "All Reviews",
                  onAction: () => handleTapChange(0),
                }}
                image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
              >
                <Text>your product does not have any reviews</Text>
              </EmptyState>
            ) : (
              <IndexTable
                itemCount={reviews.length}
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
            )}
          </Card>
        </InlineGrid>

        { total > limit &&
          <Card>
            <InlineStack gap="800" align="center" blockAlign="center">
              <Box
                style={{ border: "2px solid #ccc", padding: "4px 8px 0 8px" }}
                onClick={() => {
                  page > 1 &&
                    setPage((prev) => prev - 1);
                }}>
                <Button
                  variant="plain"

                  icon={ChevronLeftIcon}
                />
              </Box>
              <Box as="span" style={{ color: "#535353ff" }}>
                Showing page {page} to {reviews.length} out of {total}
              </Box>
              <Box
                style={{ border: "2px solid #ccc", padding: "4px 8px 0 8px" }}
                onClick={() => {
                  page < total/limit &&
                    setPage((prev) => prev + 1);
                }}
              >
                <Button
                  variant="plain"
                  icon={ChevronRightIcon}
                />
              </Box>
            </InlineStack>
          </Card>

        }

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
