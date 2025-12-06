import "@shopify/shopify-app-react-router/adapters/node";
import { restResources } from "@shopify/shopify-api/rest/admin/2025-10";

import {
  ApiVersion,
  AppDistribution,
  shopifyApp,
} from "@shopify/shopify-app-react-router/server";
import { MongoDBSessionStorage } from "@shopify/shopify-app-session-storage-mongodb";
import { DB_URL } from "../app/api/configs/env";

const shopify = shopifyApp({
  apiVersion: "2025-10",
  restResources,
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: ApiVersion.October25,
  scopes: process.env.SCOPES?.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new MongoDBSessionStorage(DB_URL),
  distribution: AppDistribution.AppStore,
  ...(process.env.SHOP_CUSTOM_DOMAIN
    ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
    : {}),
});

export default shopify;
export const apiVersion = ApiVersion.October25;
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorage = shopify.sessionStorage;




let obj = {
  "shop": "manish-kumaritg.myshopify.com",
  "idType": "store",
  "targetId": "manish-kumaritg.myshopify.com",
  "customerId": "321",
  "rating": 3,
  "description": "fdgfgd",
  "images": [
    "image-url-example.jpg"
  ],
  "like": false,
  "spam": false,
  "froud": false,
  "pinned": true,
  "name": "stive rogers",
  "email": "stive@gamil.com",
  "createdAt": "2025-12-04T11:40:03.468Z",
  "updatedAt": "2025-12-05T10:57:45.767Z",
}
