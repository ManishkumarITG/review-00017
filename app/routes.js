import { route } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

// Top-level await ensures flatRoutes() resolves before export
const routes = [
  route("/api/routes/test/*", "./api/routes/test.$.js"),

  // app routes
  route(
    "/api/routes/app/reviewproduct/*",
    "./api/routes/app/reviewproduct.$.js",
  ),
  route("/api/routes/app/setting/*", "./api/routes/app/setting.$.js"),
  route("/api/routes/app/user/*", "./api/routes/app/user.$.js"),

  // extensions routes
  route(
    "/api/routes/extensions/setting/*",
    "./api/routes/extensions/setting.$.js",
  ),
  route(
    "/api/routes/extensions/reviewproduct/*",
    "./api/routes/extensions/reviewproduct.$.js",
  ),

  route("/api/routes/extensions/user/*", "./api/routes/extensions/user.$.js"),
  ...(await flatRoutes()),
];

export default routes;
