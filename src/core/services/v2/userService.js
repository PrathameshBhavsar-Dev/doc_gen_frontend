import { createProfileApi } from "../../api/userApi";
import { getAllUsersApi } from "../../api/userApi";

// CREATE PROFILE SERVICE
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

// GET ALL USERS SERVICE
export const getAllUsersService = async ({
  page = 0,
  size = 5,
  sortBy = "id",
  direction = "asc",
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