import { authenticate } from "app/shopify.server";
import { useLoaderData } from "react-router";


export const loader =async ({request}) => {
    await authenticate.public.appProxy(request)
    const url = new URL(request.url);
    return {
        shop:url.searchParams.get("shop"),
    }
}