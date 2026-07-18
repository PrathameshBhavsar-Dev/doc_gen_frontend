import {
  createProfileApi,
  getAllUsersApi,
  getUserForSeparationApi,
  updateProfileApi,
} from "../../api/userApi";

// ================= CREATE PROFILE =================

export const createProfileService = async (payload) => {
  try {
    const response = await createProfileApi(payload);

    return {
      success: response.data.success,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Something went wrong",
    };
  }
};

// ================= GET ALL USERS =================

export const getAllUsersService = async ({
  page = 0,
  size = 5,
  sortBy = "id",
  direction = "desc",
}) => {
  try {
    const response = await getAllUsersApi({
      page,
      size,
      sortBy,
      direction,
    });

    return {
      success: response.data.success,
      statusCode: response.data.statusCode,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    return {
      success: false,
      statusCode: error.response?.status,
      message:
        error.response?.data?.message ||
        "Failed to fetch users",
      data: null,
    };
  }
};

// ================= GET USER =================

export const getUserForSeparationService = async (id) => {
  try {
    const response = await getUserForSeparationApi(id);

    return {
      success: response.data.success,
      statusCode: response.data.statusCode,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    return {
      success: false,
      statusCode: error.response?.status,
      message:
        error.response?.data?.message ||
        "Failed to fetch profile",
      data: null,
    };
  }
};

// ================= UPDATE PROFILE =================

export const updateProfileService = async (userId, payload) => {
  try {
    const response = await updateProfileApi(userId, payload);

    return {
      success: response.data.success,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to update profile",
    };
  }
};