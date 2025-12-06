export const handleUrlData = (req) => {
  const url = new URL(req.url);

  const idType = url.searchParams.get("idType");
  const page = Number(url.searchParams.get("page")) || 1;
  const limit = Number(url.searchParams.get("limit")) || 10;
  const type = url.searchParams.get("type") || null;
  const skip = url.searchParams.get("skip");
  const skipValue = skip !== null ? Number(skip) : undefined;
  const targetId = url.searchParams.get("targetId");
  const filterType = url.searchParams.get("filterType");
  console.log("--------------------- url", filterType);

  return { idType, page, limit, type, skip, skipValue, targetId, filterType };
};
