import Setting from "../models/setting.model.js";

// Theme app extension UUID — same id the dashboard deep links use to open the
// theme editor (addAppBlockId / activateAppId).
export const EXTENSION_UUID = "03fdd7d0352cc3b1184544f7e2c783be";

const THEME_FILES_QUERY = `#graphql
  query SetupWidgetVerification {
    themes(first: 1, roles: [MAIN]) {
      nodes {
        id
        name
        files(filenames: ["config/settings_data.json", "templates/*.json"], first: 50) {
          nodes {
            filename
            body {
              ... on OnlineStoreThemeFileBodyText {
                content
              }
            }
          }
        }
      }
    }
  }
`;

// Walk parsed theme JSON looking for a block/embed of this extension that is
// not disabled. App blocks/embeds appear as
// { "type": "shopify://apps/<app>/blocks/<block>/<uuid>", "disabled": false }.
const hasEnabledExtensionBlock = (node) => {
  if (!node || typeof node !== "object") return false;
  if (
    typeof node.type === "string" &&
    node.type.includes(EXTENSION_UUID) &&
    node.disabled !== true
  ) {
    return true;
  }
  return Object.values(node).some((value) => hasEnabledExtensionBlock(value));
};

export const isWidgetInstalled = async (admin) => {
  const response = await admin.graphql(THEME_FILES_QUERY);
  const json = await response.json();
  const files = json?.data?.themes?.nodes?.[0]?.files?.nodes || [];

  return files.some((file) => {
    const content = file?.body?.content;
    if (!content || !content.includes(EXTENSION_UUID)) return false;
    try {
      return hasEnabledExtensionBlock(JSON.parse(content));
    } catch (error) {
      // Content is not parseable JSON — the raw match is the best signal.
      return true;
    }
  });
};

export const isWidgetCustomized = async (shop) => {
  const setting = await Setting.findOne({ shop });
  return setting?.isCustomized === true;
};

export const getSetupStatus = async (admin, shop) => {
  const [widgetInstalled, widgetCustomized] = await Promise.all([
    isWidgetInstalled(admin),
    isWidgetCustomized(shop),
  ]);

  const completedCount = [widgetInstalled, widgetCustomized].filter(
    Boolean,
  ).length;

  return {
    widgetInstalled,
    widgetCustomized,
    completed: completedCount === 2,
    completedCount,
    total: 2,
  };
};
