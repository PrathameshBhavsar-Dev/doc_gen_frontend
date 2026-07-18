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
  direction = "desc",
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

// GET USER FOR SEPARATION
export const getUserForSeparationApi = async (id) => {

  return await axiosV2Instance.get(
    ServerUrlV2.GET_USER_FOR_SEPARATION(id)
  );

};

export const updateProfileApi = async (id, payload) => {
  return await axiosV2Instance.patch(
    ServerUrlV2.UPDATE_USER(id),
    payload
  );
};