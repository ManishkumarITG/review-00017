// import { PrismaClient } from "@prisma/client";

// if (process.env.NODE_ENV !== "production") {
//   if (!global.prismaGlobal) {
//     global.prismaGlobal = new PrismaClient();
//   }
// }

// const prisma = global.prismaGlobal ?? new PrismaClient();

// export default prisma;

import mongoss from "mongoose";
import { DB_URL } from "./api/configs/env";

console.log("🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢", DB_URL);
const mongoConnect = async () => {
  try {
    await mongoss.connect(DB_URL);
    console.log("db connect SUCCESSFULLY 🟢");
  } catch (error) {
    console.log("mongoose db ccnnection error 🔴", error);
  }
};

export default mongoConnect;
