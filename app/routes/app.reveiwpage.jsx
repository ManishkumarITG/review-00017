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
} from "@shopify/polaris";

import { useState, useCallback } from "react";
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

function IndexFiltersDefaultExample() {
  const { hexCode } = useColorTheme();

  const [filteredOrders, setFilteredOrders] = useState(reviews);
  const [selectedData, setSelectedDta] = useState(0);
  const [taggedWith, setTaggedWith] = useState("");
  const [queryValue, setQueryValue] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = useCallback((selectedTabIndex) => {
    setSelectedDta(selectedTabIndex);
    const params = new URLSearchParams(window.location.search);
    params.set("key", selectedTabIndex);
    const newUrl = window.location.pathname + "?" + params.toString();
    window.history.pushState({}, "", newUrl);
  }, []);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const [itemStrings, setItemStrings] = useState([
    "All Reviews",
    "Product Reviews",
    "Store Reviews",
    "Spam",
    "Arvichiv",
  ]);

  const filterOrders = useCallback(
    (query, currentTab) => {
      let filteredByQuery = reviews;
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
          finalFilteredOrders = filteredByQuery.filter((order) =>
            order.comment.toLowerCase().includes("spamfilter"),
          );
          if (finalFilteredOrders.length === 0) {
            finalFilteredOrders = [];
          }
          break;
        case "Arvichiv":
          finalFilteredOrders = filteredByQuery.filter(
            (order) => order.tag === "new",
          );
          break;
        default:
          finalFilteredOrders = filteredByQuery;
      }

      setFilteredOrders(finalFilteredOrders);
    },
    [reviews, itemStrings],
  );

  const allReviewsContent = `All Reviews (${reviews.length})`;

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

  const [selected, setSelected] = useState(0);

  const [sortSelected, setSortSelected] = useState(["order asc"]);
  const { mode, setMode } = useSetIndexFiltersMode();
  const onHandleCancel = () => { };
  const onHandleSave = async () => {
    await sleep(1);
    return true;
  };

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

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(filteredOrders);

  const rowMarkup = filteredOrders.map(
    ({ id, userName, item, time, Rating, comment, tag }, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <BlockStack gap={100}>
            <Text fontWeight="bold" style={{ textDecoration: "underline" }}>
              <span style={{ textDecoration: "underline" }}>{userName}</span>
            </Text>
            <Text>
              <span style={{ textDecoration: "underline" }}>{item}</span>
            </Text>
            <Text>Via Web</Text>
            <InlineStack gap={200}>
              <Button onClick={(e) => e.stopPropagation()}>
                <Icon source={HeartIcon} tone="base" />
              </Button>
              <Button onClick={(e) => e.stopPropagation()}>
                <Icon source={PinIcon} tone="base" />
              </Button>
            </InlineStack>
          </BlockStack>
        </IndexTable.Cell>
        <IndexTable.Cell> {time}</IndexTable.Cell>
        <IndexTable.Cell>
          <BlockStack>
            <Box>
              <StarRating rating={Rating} color={hexCode} />
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
              <Button
                icon={ChevronDownIcon}
                iconPosition="end"
                onClick={(e) => e.stopPropagation()}
              >
                Published
              </Button>
              <ButtonGroup>
                <Button
                  icon={UndoIcon}
                  iconPosition="end"
                  onClick={(e) => e.stopPropagation()}
                ></Button>
                <Button
                  icon={MenuHorizontalIcon}
                  iconPosition="end"
                  onClick={(e) => e.stopPropagation()}
                ></Button>
              </ButtonGroup>
            </InlineStack>
          </InlineStack>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <AppProvider>
      <Page fullWidth={true}>
        <InlineGrid gap="400">
          <Card padding="025">
            <LegacyTabs
              tabs={tabsdata}
              selected={selectedData}
              onSelect={handleTabChange}
            ></LegacyTabs>
          </Card>

          <InlineStack
            alignment="space-between"
            align="space-between"
            padding="400"
          >
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
            <InlineStack gap="200">
              <Button>Import</Button>
              <Button>Publish an Mordarate</Button>
              <Button>Edit product review group</Button>
              <Button>Export</Button>
            </InlineStack>
          </InlineStack>

          <LegacyCard >
            <Box style={{ '--selected-tab-background': "#f80808ff" }}>

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
                hideFilters={true}
                // hideQueryField={true}
                filteringAccessibilityTooltip={"x"}
              />
            </Box>

            <IndexTable
              itemCount={filteredOrders.length}
              selectedItemsCount={
                allResourcesSelected ? "All" : selectedResources.length
              }
              onSelectionChange={handleSelectionChange}
              headings={[
                { title: "Customer" },
                { title: "Created" },
                { title: "Ratting" },
                { title: "status" },
              ]}
            >
              {rowMarkup}
            </IndexTable>
          </LegacyCard>
        </InlineGrid>
      </Page>
    </AppProvider>
  );
}

export default IndexFiltersDefaultExample;
