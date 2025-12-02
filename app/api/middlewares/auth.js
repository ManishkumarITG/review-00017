import { authenticate, unauthenticated } from "../../shopify.server.js";

export const authenticateUser = async (req) => {
  try {
    const url = new URL(req.url);
    const queryShop = url.searchParams.get("shop");
    const path = url.pathname.split("/").pop();
    

    // Determine session and admin details based on queryShop presence
    const { session, admin } = queryShop
      ? await unauthenticated.admin(queryShop)
      : await authenticate.admin(req);

    if (!session?.shop) {
      return { status: false, message: `Shop Not found.`, httpCode: 404 };
    }
    const shop = session.shop;
    req.currentShop = shop;
    req.session = session;
    req.admin = admin;
    return { status: true , shop , path , session};
  } catch (error) {
    console.error(`Catch Error in authenticateUser:`, error);
    return { status: false, message: `Shop `, httpCode: 500 };
  }
};
