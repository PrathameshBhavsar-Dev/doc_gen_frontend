import axiosV2Instance from "../../utils/axiosV2Instance";
import ServerUrlV2 from "../../core/constants/ServerUrlV2";

// CREATE PROFILE
export const createProfileApi = async (payload) => {
  return await axiosV2Instance.post(
    ServerUrlV2.CREATE_PROFILE,
    payload
  );
};

// GET ALL USERS
export const getAllUsersApi = async ({
  page = 0,
  size = 5,
  sortBy = "id",
  direction = "asc",
}) => {

  return await axiosV2Instance.get(
    ServerUrlV2.GET_ALL_USERS,
    {
      params: {
        page,
        size,
        sortBy,
        direction,
      },
    }
  );
};