import { getAll } from "../controller/setting.controller";

export const loader = async ({ request }) => {
  try {
    console.log(
      "-----------------------------------------------------------hit api",
    );
    return await getAll();

    // return new Response(
    //   JSON.stringify({ status: true, message: "ok", data: data }),
    //   {
    //     status: 200,
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Access-Control-Allow-Origin": "*",
    //       "Access-Control-Allow-Methods": "GET, POST,PUT,DELETE, OPTIONS",
    //     },
    //   },
    // );
  } catch (error) {
    console.log("catch error in test loader :", error);
  }
};
