import User from "../models/user.model";
import Review from "../models/review.model";
import mongoConnect from "../../db.server";
import { getFilterType } from "../middlewares/handelFilter";
import { unauthenticated } from "../../shopify.server";

// Reviews are stored as app-owned Shopify metaobjects ($app:review, defined in
// shopify.app.toml). MongoDB is only used for the User collection and as the
// source for the one-time migration below.

const REVIEW_METAOBJECT_TYPE = "$app:review";

const REVIEWS_QUERY = `#graphql
  query ReviewMetaobjects($type: String!, $after: String) {
    metaobjects(type: $type, first: 250, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        handle
        updatedAt
        fields {
          key
          jsonValue
        }
      }
    }
  }
`;

const REVIEW_BY_ID_QUERY = `#graphql
  query ReviewMetaobject($id: ID!) {
    metaobject(id: $id) {
      id
      handle
      updatedAt
      fields {
        key
        jsonValue
      }
    }
  }
`;

const UPSERT_REVIEW_MUTATION = `#graphql
  mutation UpsertReview($handle: MetaobjectHandleInput!, $metaobject: MetaobjectUpsertInput!) {
    metaobjectUpsert(handle: $handle, metaobject: $metaobject) {
      metaobject {
        id
        handle
        updatedAt
        fields {
          key
          jsonValue
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const UPDATE_REVIEW_MUTATION = `#graphql
  mutation UpdateReview($id: ID!, $metaobject: MetaobjectUpdateInput!) {
    metaobjectUpdate(id: $id, metaobject: $metaobject) {
      metaobject {
        id
        handle
        updatedAt
        fields {
          key
          jsonValue
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const DELETE_REVIEW_MUTATION = `#graphql
  mutation DeleteReview($id: ID!) {
    metaobjectDelete(id: $id) {
      deletedId
      userErrors {
        field
        message
      }
    }
  }
`;

const SET_PRODUCT_RATING_MUTATION = `#graphql
  mutation SyncProductRating($metafields: [MetafieldsSetInput!]!) {
    metafieldsSet(metafields: $metafields) {
      metafields {
        id
        key
        value
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const getAdmin = async (shop) => {
  const { admin } = await unauthenticated.admin(shop);
  return admin;
};

const slug = (value) =>
  String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// One review per customer per target — same rule the old Mongo compound
// unique index enforced, now guaranteed by the deterministic handle.
const reviewHandle = (idType, targetId, customerId) =>
  `review-${slug(idType)}-${slug(targetId)}-${slug(customerId)}`;

// Maps review payload keys (Mongo-era names the routes/UI still use) to
// metaobject field inputs. Metaobject field values are always strings.
const FIELD_MAP = {
  idType: ["id_type", (v) => String(v)],
  targetId: ["target_id", (v) => String(v)],
  customerId: ["customer_id", (v) => String(v)],
  rating: ["rating", (v) => String(parseInt(v, 10))],
  description: ["description", (v) => String(v ?? "")],
  images: ["images", (v) => JSON.stringify(Array.isArray(v) ? v : [])],
  like: ["like", (v) => String(v === true)],
  spam: ["spam", (v) => String(v === true)],
  froud: ["froud", (v) => String(v === true)],
  pinned: ["pinned", (v) => String(v === true)],
  name: ["customer_name", (v) => String(v ?? "")],
  email: ["customer_email", (v) => String(v ?? "")],
  createdAt: ["created_at", (v) => new Date(v).toISOString()],
};

const toFieldInputs = (data) =>
  Object.entries(data)
    .filter(([key, value]) => FIELD_MAP[key] && value !== undefined)
    .map(([key, value]) => ({
      key: FIELD_MAP[key][0],
      value: FIELD_MAP[key][1](value),
    }));

// Shopify returns boolean metaobject fields as the strings "true"/"false"
// in jsonValue (verified against the live API), so parse defensively.
const toBool = (value) => value === true || value === "true";

// Converts a metaobject node back into the review shape the frontend and
// theme extension already consume (the metaobject gid plays the _id role).
const nodeToReview = (node, shop) => {
  const f = Object.fromEntries(
    (node.fields || []).map((field) => [field.key, field.jsonValue]),
  );
  return {
    _id: node.id,
    shop,
    idType: f.id_type,
    targetId: f.target_id != null ? String(f.target_id) : "",
    customerId: f.customer_id != null ? String(f.customer_id) : "",
    rating: Number(f.rating) || 0,
    description: f.description || "",
    images: Array.isArray(f.images) ? f.images : [],
    like: toBool(f.like),
    spam: toBool(f.spam),
    froud: toBool(f.froud),
    pinned: toBool(f.pinned),
    name: f.customer_name || "",
    email: f.customer_email || "",
    createdAt: f.created_at || null,
    updatedAt: node.updatedAt,
  };
};

const throwOnUserErrors = (userErrors) => {
  if (userErrors?.length) {
    throw new Error(userErrors.map((e) => e.message).join(", "));
  }
};

const fetchShopReviews = async (admin, shop) => {
  const reviews = [];
  let after = null;
  do {
    const response = await admin.graphql(REVIEWS_QUERY, {
      variables: { type: REVIEW_METAOBJECT_TYPE, after },
    });
    const json = await response.json();
    const connection = json?.data?.metaobjects;
    if (!connection) break;
    reviews.push(...connection.nodes.map((node) => nodeToReview(node, shop)));
    after = connection.pageInfo.hasNextPage
      ? connection.pageInfo.endCursor
      : null;
  } while (after);
  return reviews;
};

// Replicates the Mongo sort objects from getFilterType ({key: 1|-1}).
const sortReviews = (items, sortQuery) => {
  const keys = Object.entries(sortQuery);
  const rank = (review, key) => {
    const value = key === "createdAt"
      ? new Date(review[key] || 0).getTime()
      : review[key];
    if (typeof value === "boolean") return value ? 1 : 0;
    return value ?? 0;
  };
  return [...items].sort((a, b) => {
    for (const [key, dir] of keys) {
      const av = rank(a, key);
      const bv = rank(b, key);
      if (av !== bv) return (av < bv ? -1 : 1) * dir;
    }
    return 0;
  });
};

// limit 0 means "no limit", matching Mongo's .limit(0) behaviour.
const paginate = (items, page, limit) => {
  if (!limit) return items;
  const skip = (page - 1) * limit;
  return items.slice(skip, skip + limit);
};

// Keeps the product's aggregate rating metafields ($app:rating,
// $app:rating_count) in sync so themes can read them natively.
const syncProductRating = async (admin, shop, targetId) => {
  try {
    const isGid = String(targetId).startsWith("gid://");
    if (!isGid && !/^\d+$/.test(String(targetId))) return;
    const ownerId = isGid
      ? String(targetId)
      : `gid://shopify/Product/${targetId}`;

    const all = await fetchShopReviews(admin, shop);
    const productReviews = all.filter(
      (r) => r.idType === "product" && String(r.targetId) === String(targetId),
    );
    const count = productReviews.length;
    const avg = count
      ? Number(
          (
            productReviews.reduce((sum, r) => sum + r.rating, 0) / count
          ).toFixed(1),
        )
      : 0;

    const response = await admin.graphql(SET_PRODUCT_RATING_MUTATION, {
      variables: {
        metafields: [
          { ownerId, key: "rating", value: String(avg) },
          { ownerId, key: "rating_count", value: String(count) },
        ],
      },
    });
    const json = await response.json();
    throwOnUserErrors(json?.data?.metafieldsSet?.userErrors);
  } catch (error) {
    // Aggregates are best-effort; never fail the review write over them.
    console.log("product rating sync error:", error);
  }
};

export const createReview = async (shop, payload) => {
  const {
    targetId,
    idType,
    rating,
    description,
    images,
    customerId,
    name,
    email,
  } = payload;

  const numericRating = parseInt(rating, 10);
  if (!numericRating || numericRating < 1 || numericRating > 5) {
    throw new Error("rating must be between 1 and 5");
  }

  // Users stay in MongoDB — only review data moved to Shopify.
  await mongoConnect();
  let user = await User.findOne({ customerId });
  if (!user) {
    user = await User.create({ customerId, name, email, shop });
  }

  const admin = await getAdmin(shop);
  const response = await admin.graphql(UPSERT_REVIEW_MUTATION, {
    variables: {
      handle: {
        type: REVIEW_METAOBJECT_TYPE,
        handle: reviewHandle(idType, targetId, customerId),
      },
      metaobject: {
        fields: toFieldInputs({
          idType,
          targetId,
          customerId,
          rating: numericRating,
          description,
          images,
          name,
          email,
          like: false,
          pinned: false,
          spam: false,
          froud: false,
          createdAt: new Date(),
        }),
      },
    },
  });
  const json = await response.json();
  throwOnUserErrors(json?.data?.metaobjectUpsert?.userErrors);

  const review = json?.data?.metaobjectUpsert?.metaobject;
  if (!review) {
    throw new Error("review not create");
  }

  if (idType === "product") {
    await syncProductRating(admin, shop, targetId);
  }

  return nodeToReview(review, shop);
};

export const getAllReviewsByShop = async (data) => {
  const { limit, page, shop, filterType } = data;

  if (!shop) throw new Error("shop is required");

  const admin = await getAdmin(shop);
  const all = await fetchShopReviews(admin, shop);
  const sorted = sortReviews(all, getFilterType(filterType));
  const items = paginate(sorted, page, limit);

  return { items, total: all.length, limit, page };
};

export const getReviewsByType = async (data) => {
  try {
    const { limit, page, shop, idType, targetId, filterType } = data;

    if (!shop) throw new Error("shop is required");

    const admin = await getAdmin(shop);
    const all = await fetchShopReviews(admin, shop);

    const filtered = all.filter((review) => {
      if (targetId && String(review.targetId) !== String(targetId)) {
        return false;
      }
      if (idType === "spam" || idType === "froud") {
        return review[idType] === true;
      }
      return review.idType === idType;
    });

    const sorted = sortReviews(filtered, getFilterType(filterType));
    const items = paginate(sorted, page, limit);

    return { items, total: filtered.length, page, limit };
  } catch (error) {
    console.log(error);
  }
};

export const deleteReviewById = async (payload) => {
  const id = payload?.id || payload?._id;
  if (!id) {
    throw new Error("id is not found");
  }

  // Resolve the shop/target before deleting so aggregates can be resynced.
  const shop = payload?.shop;
  if (!shop) throw new Error("shop is required");
  const admin = await getAdmin(shop);

  const existingRes = await admin.graphql(REVIEW_BY_ID_QUERY, {
    variables: { id },
  });
  const existingJson = await existingRes.json();
  const existing = existingJson?.data?.metaobject
    ? nodeToReview(existingJson.data.metaobject, shop)
    : null;

  const response = await admin.graphql(DELETE_REVIEW_MUTATION, {
    variables: { id },
  });
  const json = await response.json();
  throwOnUserErrors(json?.data?.metaobjectDelete?.userErrors);

  if (existing?.idType === "product") {
    await syncProductRating(admin, shop, existing.targetId);
  }

  return existing;
};

export const updatereviewbyId = async (shop, payload) => {
  const { id, ...data } = payload;

  if (!id) {
    throw new Error("id is not found");
  }

  const admin = await getAdmin(shop);
  const response = await admin.graphql(UPDATE_REVIEW_MUTATION, {
    variables: {
      id,
      metaobject: { fields: toFieldInputs(data) },
    },
  });
  const json = await response.json();
  throwOnUserErrors(json?.data?.metaobjectUpdate?.userErrors);

  const updated = json?.data?.metaobjectUpdate?.metaobject;
  if (!updated) {
    throw new Error("data not updated");
  }

  const review = nodeToReview(updated, shop);
  if (review.idType === "product") {
    await syncProductRating(admin, shop, review.targetId);
  }

  return review;
};

export const getRatingSummaryService = async (shop, targetId) => {
  const admin = await getAdmin(shop);
  const all = await fetchShopReviews(admin, shop);
  const reviews = targetId
    ? all.filter((r) => String(r.targetId) === String(targetId))
    : all;

  const summary = [];
  let totalRatingSum = 0;

  for (let r = 5; r >= 1; r--) {
    const count = reviews.filter((x) => x.rating === r).length;
    totalRatingSum += r * count;
    summary.push({
      rating: r,
      pepole: count,
    });
  }

  const totalReview = reviews.length;
  let avgRating = 0;

  if (totalReview > 0) {
    avgRating = Number((totalRatingSum / totalReview).toFixed(1));
  }

  return {
    reviews: summary,
    totalReview: totalReview,
    avgRating: avgRating,
  };
};

export const searchReviews = async (shop, query) => {
  const admin = await getAdmin(shop);
  const all = await fetchShopReviews(admin, shop);
  const regexQuery = new RegExp(query, "i");

  return all.filter(
    (r) => regexQuery.test(r.name || "") || regexQuery.test(r.email || ""),
  );
};

// One-time migration: copies this shop's reviews from MongoDB into
// metaobjects. Mongo documents are left in place as a backup.
export const migrateMongoReviewsToMetaobjects = async (shop) => {
  await mongoConnect();
  const mongoReviews = await Review.find({ shop }).lean();
  const admin = await getAdmin(shop);

  let migrated = 0;
  const errors = [];

  for (const review of mongoReviews) {
    try {
      const response = await admin.graphql(UPSERT_REVIEW_MUTATION, {
        variables: {
          handle: {
            type: REVIEW_METAOBJECT_TYPE,
            handle: reviewHandle(
              review.idType,
              review.targetId,
              review.customerId,
            ),
          },
          metaobject: { fields: toFieldInputs(review) },
        },
      });
      const json = await response.json();
      throwOnUserErrors(json?.data?.metaobjectUpsert?.userErrors);
      migrated += 1;
    } catch (error) {
      errors.push({ id: String(review._id), message: error.message });
    }
  }

  // Resync aggregates for every migrated product once, at the end.
  const productIds = [
    ...new Set(
      mongoReviews
        .filter((r) => r.idType === "product")
        .map((r) => String(r.targetId)),
    ),
  ];
  for (const productId of productIds) {
    await syncProductRating(admin, shop, productId);
  }

  return { total: mongoReviews.length, migrated, errors };
};
