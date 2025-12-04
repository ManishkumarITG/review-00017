import {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../services/user.service.js";

import STATUS_CODE from "../contents/statusCode.js";
import MESSAGE from "../contents/message.js";
import { responseHandler } from "../utils/responseHandler.js";

// Create User
export const createUserController = async (payload) => {
  try {
    const data = await createUser(payload);
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

// Get All Users
export const getUsersController = async () => {
  try {
    const data = await getAllUsers();
    return responseHandler(STATUS_CODE.OK, MESSAGE.SUCCESS, data);
  } catch (error) {
    return responseHandler(
      STATUS_CODE.INTERNAL_SERVER_ERROR,
      MESSAGE.SERVER_ERROR,
      null,
    );
  }
};

// Get Single User
export const getUserController = async (id) => {
  try {
    const data = await getUserById(id);
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
export const updateUserController = async (id, payload) => {
  try {
    const data = await updateUserById(id, payload);
    return responseHandler(STATUS_CODE.OK, MESSAGE.UPDATED, data);
  } catch (error) {
    return responseHandler(STATUS_CODE.BAD_REQUEST, error.message, null);
  }
};

// Delete User
export const deleteUserController = async (id) => {
  try {
    const data = await deleteUserById(id);
    return responseHandler(STATUS_CODE.OK, MESSAGE.DELETED, data);
  } catch (error) {
    return responseHandler(
      STATUS_CODE.INTERNAL_SERVER_ERROR,
      error.message,
      null,
    );
  }
};
