import { route } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

// Top-level await ensures flatRoutes() resolves before export
const routes = [
  route("/api/routes/test/*", "./api/routes/test.$.js"),
  route("/api/routes/setting/*", "./api/routes/setting.$.js"),
  ...(await flatRoutes()),
];

export default routes;
