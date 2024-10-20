import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';

import { UsersCollection } from '../db/models/users.js';

export const getUser = async (userId) => {
  const user = await UsersCollection.findOne({ _id: userId });
  console.log(user);
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  return user;
};

export const addUserPhoto = async (userId, url, options = {}) => {
  const updatedUser = await UsersCollection.findByIdAndUpdate(
    { _id: userId },
    { photo: url },
    { new: true, includeResultMetadata: true, ...options },
  );
  return updatedUser.value.photo;
  //  return updatedUser;
};

export const patchUser = async (userId, data, options = {}) => {
  const updateData = { ...data };
  if (data.password) {
    const user = await UsersCollection.findById(userId);
    const ifPasswordsEqual = await bcrypt.compare(data.password, user.password);
    if (ifPasswordsEqual)
      throw createHttpError(
        400,
        'New password cannot be the same as the old password',
      );
    const encryptedPassword = await bcrypt.hash(data.password, 10);
    updateData.password = encryptedPassword;
  }
  const updatedUser = await UsersCollection.findByIdAndUpdate(
    userId,
    updateData,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  if (!updatedUser) {
    throw createHttpError(404, 'User not found');
  }
  return updatedUser;
};
