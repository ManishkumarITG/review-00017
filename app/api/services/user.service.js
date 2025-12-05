import mongoConnect from "../../db.server";
import User from "../models/user.model";

export const createOrGetUser = async (payload) => {
  await mongoConnect()
  const { customerId, name, email, shop } = payload;

  let user = await User.findOne({ customerId });
  if (!user) {
    user = await User.create({ customerId, name, email, shop });
  }
  return user;
};

export const getUserByCustomerId = async (customerId) => {
  return await User.findOne({ customerId });
};

export const updateUser = async (customerId, updateData) => {
  return await User.findOneAndUpdate({ customerId }, updateData, {
    new: true,
  });
};

export const deleteUser = async (customerId) => {
  return await User.findOneAndDelete({ customerId });
};
