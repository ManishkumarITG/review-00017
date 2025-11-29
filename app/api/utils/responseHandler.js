export const responseHandler = async (status, message, data) => {
  return new Response(JSON.stringify({ status, message, data }), {
    status: status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST,PUT,DELETE, OPTIONS",
    },
  });
};
