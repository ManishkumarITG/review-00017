import { authenticate } from "../../shopify.server";
import { responseHandler } from "../utils/responseHandler"


export const loader = async ({request}) => {

  try {
    
    const { admin } = await authenticate.admin(request);
    const response = await admin.graphql(
      `#graphql
      query {
        themes(first: 20) {
          edges {
            node {
              name
              id
              role
            }
          }
        }
      }`,
 
  );
  
  const json = await response.json();
  return responseHandler(200, "success", json);
} catch (error) {
  console.log("------------------------------get themes---------------------- ", error);
  return responseHandler(500, "error" , error);
}
}
