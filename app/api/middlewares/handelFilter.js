export const getFilterType = (filterType) => {
  console.log("--------------------------- filterType", filterType);
  let sortQuery = { like: -1, pinned: -1 };

  if (filterType === "mostRecent") {
    sortQuery = { createdAt: -1 };
  }

  if (filterType === "highestRating") {
    sortQuery = { rating: -1 };
  }

  if (filterType === "lowestRating") {
    sortQuery = { rating: 1 };
  }

  return sortQuery;
};
