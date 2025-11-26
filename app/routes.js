import { route } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

// Top-level await ensures flatRoutes() resolves before export
const routes = [
  route("/api/test/*", "./api/test.$.js"),
  ...(await flatRoutes()),
];

export default routes;
