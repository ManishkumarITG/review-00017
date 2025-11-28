// import { PrismaClient } from "@prisma/client";

// if (process.env.NODE_ENV !== "production") {
//   if (!global.prismaGlobal) {
//     global.prismaGlobal = new PrismaClient();
//   }
// }

// const prisma = global.prismaGlobal ?? new PrismaClient();

// export default prisma;


import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose"

// Function to establish a connection to the MongoDB database
export const dbConnection = async () => {
  try {
    // Using mongoose.connect to establish a connection to the MongoDB database
    //const connectionString = process.env.NODE_ENV !== 'production' ? `${process.env.DB_URL}/${process.env.DB_NAME}?authSource=admin` : process.env.DB_URL;
    const connectionString = `${process.env.DB_URL}/${process.env.DB_NAME}?authSource=admin`;



    console.log(connectionString, '::: --- DataBase connection string ---');

    // Connect to the MongoDB database
    await mongoose.connect(connectionString);

    // Log a success message once the connection is successful
    console.log(`--- Connected to MongoDB (${process.env.NODE_ENV}) Successfully ---`);
  } catch (error) {
    console.error(error, `--- MongoDB Connection Failed (${process.env.NODE_ENV}) ---`);
  }
};
dbConnection();
export default dbConnection