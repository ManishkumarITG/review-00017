import {
  TextField,
  IndexTable,
  LegacyCard,
  IndexFilters,
  useSetIndexFiltersMode,
  useIndexResourceState,
  Text,
  ChoiceList,
  RangeSlider,
  Badge,
  AppProvider,
  Icon,
  Button,
  InlineStack,
  BlockStack,
} from "@shopify/polaris";

import { useState, useCallback } from "react";
import "@shopify/polaris/build/esm/styles.css";
import {
  HeartIcon,
  PinIcon,
  StarFilledIcon,
  StarIcon,
} from "@shopify/polaris-icons";

function IndexFiltersDefaultExample() {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const [itemStrings, setItemStrings] = useState([
    "All",
    "Unpaid",
    "Open",
    "Closed",
    "Local delivery",
    "Local pickup",
  ]);

  const deleteView = (index) => {
    const newItemStrings = [...itemStrings];
    newItemStrings.splice(index, 1);
    setItemStrings(newItemStrings);
    setSelected(0);
  };

  const duplicateView = async (name) => {
    setItemStrings([...itemStrings, name]);
    setSelected(itemStrings.length);
    await sleep(1);
    return true;
  };

  const tabs = itemStrings.map((item, index) => ({
    content: item,
    index,
    onAction: () => {},
    id: `${item}-${index}`,
    isLocked: index === 0,
    actions:
      index === 0
        ? []
        : [
            {
              type: "rename",
              onAction: () => {},
              onPrimaryAction: async (value) => {
                const newItemsStrings = tabs.map((tabItem, idx) => {
                  if (idx === index) return value;
                  return tabItem.content;
                });
                await sleep(1);
                setItemStrings(newItemsStrings);
                return true;
              },
            },
            {
              type: "duplicate",
              onPrimaryAction: async (value) => {
                await sleep(1);
                duplicateView(value);
                return true;
              },
            },
            { type: "edit" },
            {
              type: "delete",
              onPrimaryAction: async () => {
                await sleep(1);
                deleteView(index);
                return true;
              },
            },
          ],
  }));

  const [selected, setSelected] = useState(0);

  const onCreateNewView = async (value) => {
    await sleep(500);
    setItemStrings([...itemStrings, value]);
    setSelected(itemStrings.length);
    return true;
  };

  const sortOptions = [
    { label: "Coustomer", value: "order asc", directionLabel: "Ascending" },
    { label: "Coustomer", value: "order desc", directionLabel: "Descending" },
    { label: "Customer", value: "customer asc", directionLabel: "A-Z" },
    { label: "Customer", value: "customer desc", directionLabel: "Z-A" },
    { label: "Date", value: "date asc", directionLabel: "A-Z" },
    { label: "Date", value: "date desc", directionLabel: "Z-A" },
    { label: "Total", value: "total asc", directionLabel: "Ascending" },
    { label: "Total", value: "total desc", directionLabel: "Descending" },
  ];

  const [sortSelected, setSortSelected] = useState(["order asc"]);
  const { mode, setMode } = useSetIndexFiltersMode();
  const onHandleCancel = () => {};
  const onHandleSave = async () => {
    await sleep(1);
    return true;
  };

  const primaryAction =
    selected === 0
      ? {
          type: "save-as",
          onAction: onCreateNewView,
          disabled: false,
          loading: false,
        }
      : {
          type: "save",
          onAction: onHandleSave,
          disabled: false,
          loading: false,
        };

  const [accountStatus, setAccountStatus] = useState(undefined);
  const [moneySpent, setMoneySpent] = useState(undefined);
  const [taggedWith, setTaggedWith] = useState("");
  const [queryValue, setQueryValue] = useState("");

  const handleAccountStatusChange = useCallback(
    (value) => setAccountStatus(value),
    [],
  );
  const handleMoneySpentChange = useCallback(
    (value) => setMoneySpent(value),
    [],
  );
  const handleTaggedWithChange = useCallback(
    (value) => setTaggedWith(value),
    [],
  );
  const handleFiltersQueryChange = useCallback(
    (value) => setQueryValue(value),
    [],
  );

  const handleAccountStatusRemove = useCallback(
    () => setAccountStatus(undefined),
    [],
  );
  const handleMoneySpentRemove = useCallback(
    () => setMoneySpent(undefined),
    [],
  );
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(""), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(""), []);

  const handleFiltersClearAll = useCallback(() => {
    handleAccountStatusRemove();
    handleMoneySpentRemove();
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [
    handleAccountStatusRemove,
    handleMoneySpentRemove,
    handleQueryValueRemove,
    handleTaggedWithRemove,
  ]);

  const filters = [
    {
      key: "accountStatus",
      label: "Account status",
      filter: (
        <ChoiceList
          title="Account status"
          titleHidden
          choices={[
            { label: "Enabled", value: "enabled" },
            { label: "Not invited", value: "not invited" },
            { label: "Invited", value: "invited" },
            { label: "Declined", value: "declined" },
          ]}
          selected={accountStatus || []}
          onChange={handleAccountStatusChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
    {
      key: "taggedWith",
      label: "Tagged with",
      filter: (
        <TextField
          label="Tagged with"
          value={taggedWith}
          onChange={handleTaggedWithChange}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },
    {
      key: "moneySpent",
      label: "Money spent",
      filter: (
        <RangeSlider
          label="Money spent is between"
          labelHidden
          value={moneySpent || [0, 500]}
          prefix="$"
          output
          min={0}
          max={2000}
          step={1}
          onChange={handleMoneySpentChange}
        />
      ),
    },
  ];

  const appliedFilters = [];

  if (accountStatus && !isEmpty(accountStatus)) {
    const key = "accountStatus";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, accountStatus),
      onRemove: handleAccountStatusRemove,
    });
  }

  if (moneySpent) {
    const key = "moneySpent";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, moneySpent),
      onRemove: handleMoneySpentRemove,
    });
  }

  if (!isEmpty(taggedWith)) {
    const key = "taggedWith";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, taggedWith),
      onRemove: handleTaggedWithRemove,
    });
  }

  const orders = [
    {
      id: 1,
      userName: "Manish",
      item: "Bag",
      time: "2 days",
      Rating: 4.3,
      comment: "Great!",
      tag: "test",
    },
    {
      id: 2,
      userName: "Amit",
      item: "Shoes",
      time: "1 day ago",
      Rating: 4.8,
      comment: "Excellent",
      tag: "verified",
    },
    {
      id: 3,
      userName: "Rahul",
      item: "Watch",
      time: "3 days",
      Rating: 4.1,
      comment: "Good quality",
      tag: "hot",
    },
    {
      id: 4,
      userName: "Suresh",
      item: "T-Shirt",
      time: "5 days",
      Rating: 3.9,
      comment: "Decent",
      tag: "new",
    },
    {
      id: 5,
      userName: "Vikas",
      item: "Laptop",
      time: "12 hours",
      Rating: 4.9,
      comment: "Amazing!",
      tag: "pro",
    },
    {
      id: 6,
      userName: "Neha",
      item: "Mobile",
      time: "4 days",
      Rating: 4.5,
      comment: "Very smooth",
      tag: "verified",
    },
    {
      id: 7,
      userName: "Priya",
      item: "Headphones",
      time: "6 hours",
      Rating: 3.8,
      comment: "Okay product",
      tag: "test",
    },
    {
      id: 8,
      userName: "Rohit",
      item: "Bag",
      time: "7 days",
      Rating: 4.0,
      comment: "Nice build",
      tag: "sale",
    },
    {
      id: 9,
      userName: "Aman",
      item: "Shoes",
      time: "2 hours",
      Rating: 4.7,
      comment: "Fits well",
      tag: "verified",
    },
    {
      id: 10,
      userName: "Deepak",
      item: "Keyboard",
      time: "3 days ago",
      Rating: 4.2,
      comment: "Smooth typing",
      tag: "hot",
    },
    {
      id: 11,
      userName: "Mohan",
      item: "Mouse",
      time: "9 hours",
      Rating: 3.6,
      comment: "Average",
      tag: "test",
    },
    {
      id: 12,
      userName: "Nitin",
      item: "Monitor",
      time: "1 week",
      Rating: 4.4,
      comment: "Crisp display",
      tag: "pro",
    },
    {
      id: 13,
      userName: "Kunal",
      item: "Charger",
      time: "13 hours",
      Rating: 3.9,
      comment: "Works fine",
      tag: "new",
    },
    {
      id: 14,
      userName: "Sneha",
      item: "Powerbank",
      time: "8 days",
      Rating: 4.6,
      comment: "Long backup",
      tag: "verified",
    },
    {
      id: 15,
      userName: "Harshit",
      item: "Speaker",
      time: "11 hours",
      Rating: 4.1,
      comment: "Good sound",
      tag: "hot",
    },
  ];

  const resourceName = {
    singular: "order",
    plural: "orders",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(orders);

  const rowMarkup = orders.map(
    (
      {
        id,
        userName,
        item,
        time,
        Rating,
        comment,
        tag,
        order,
        date,
        customer,
        total,
        paymentStatus,
        fulfillmentStatus,
      },
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
            <Text fontWeight="bold" style={{ textDecoration: "underline" }}>
              <span style={{ textDecoration: "underline" }}>{userName}</span>
            </Text>
            <Text>
              <span style={{ textDecoration: "underline" }}>{item}</span>
            </Text>
            <Text>Via Web</Text>
            <InlineStack gap={200}> 
              <Button>
                <Icon source={HeartIcon} tone="base" />
              </Button>
              <Button>
                <Icon source={PinIcon} tone="base" />
              </Button>
            </InlineStack>
          </BlockStack>
        </IndexTable.Cell>
        <IndexTable.Cell> {time}</IndexTable.Cell>
        <IndexTable.Cell>
          <BlockStack>
            {" "}
            <Text fontWeight="bold">{comment}</Text>
            <Text fontWeight="bold">{tag}</Text>
          </BlockStack>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric>
            {total}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{paymentStatus}</IndexTable.Cell>
        <IndexTable.Cell>{fulfillmentStatus}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <AppProvider>
      <LegacyCard>
        <IndexFilters
          sortOptions={sortOptions}
          sortSelected={sortSelected}
          queryValue={queryValue}
          queryPlaceholder="Searching in all"
          onQueryChange={handleFiltersQueryChange}
          onQueryClear={() => setQueryValue("")}
          onSort={setSortSelected}
          primaryAction={primaryAction}
          cancelAction={{
            onAction: onHandleCancel,
            disabled: false,
            loading: false,
          }}
          tabs={tabs}
          selected={selected}
          onSelect={setSelected}
          canCreateNewView
          onCreateNewView={onCreateNewView}
          filters={filters}
          appliedFilters={appliedFilters}
          onClearAll={handleFiltersClearAll}
          mode={mode}
          setMode={setMode}
        />

        <IndexTable
          resourceName={resourceName}
          itemCount={orders.length}
          selectedItemsCount={
            allResourcesSelected ? "All" : selectedResources.length
          }
          onSelectionChange={handleSelectionChange}
          headings={[
            { title: "Customer" },
            { title: "Created" },
            { title: "Ratting" },
            { title: "Total", alignment: "end" },
            { title: "Payment status" },
            { title: "Fulfillment status" },
          ]}
        >
          {rowMarkup}
        </IndexTable>
      </LegacyCard>
    </AppProvider>
  );

  function disambiguateLabel(key, value) {
    switch (key) {
      case "moneySpent":
        return `Money spent is between $${value[0]} and $${value[1]}`;
      case "taggedWith":
        return `Tagged with ${value}`;
      case "accountStatus":
        return value.map((val) => `Customer ${val}`).join(", ");
      default:
        return value;
    }
  }

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return value === "" || value == null;
    }
  }
}

export default IndexFiltersDefaultExample;
