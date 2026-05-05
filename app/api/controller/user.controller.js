import {
    createOrGetUser,
    getUserByCustomerId,
    updateUser,
    deleteUser,
} from "../services/user.service.js";

import STATUS_CODE from "../contents/statusCode.js";
import MESSAGE from "../contents/message.js";
import { responseHandler } from "../utils/responseHandler.js";

// Create or Get User
export const createUserController = async (payload) => {
    try {
          const data = await createOrGetUser(payload);
          return responseHandler(STATUS_CODE.CREATED, MESSAGE.CREATED, data);
    } catch (error) {
          console.log("Error in create user controller", error);
          return responseHandler(
                  STATUS_CODE.INTERNAL_SERVER_ERROR,
                  error.message,
                  null,
                );
    }
};

// Get Single User by Customer ID
export const getUserController = async (customerId) => {
    try {
          const data = await getUserByCustomerId(customerId);
          return responseHandler(STATUS_CODE.OK, MESSAGE.SUCCESS, data);
    } catch (error) {
          return responseHandler(
                  STATUS_CODE.INTERNAL_SERVER_ERROR,
                  error.message,
                  null,
                );
    }
};

// Update User
export const updateUserController = async (customerId, payload) => {
    try {
          const data = await updateUser(customerId, payload);
          return responseHandler(STATUS_CODE.OK, MESSAGE.UPDATED, data);
    } catch (error) {
          return responseHandler(STATUS_CODE.BAD_REQUEST, error.message, null);
    }
};

// Delete User
export const deleteUserController = async (customerId) => {
    try {
          const data = await deleteUser(customerId);
          return responseHandler(STATUS_CODE.OK, MESSAGE.DELETED, data);
    } catch (error) {
          return responseHandler(
                  STATUS_CODE.INTERNAL_SERVER_ERROR,
                  error.message,
                  null,
                );
    }
};
