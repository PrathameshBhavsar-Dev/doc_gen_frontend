import api from "./apiService";
import ServerUrl from "../constants/serverURL.constant";

export const authService = {
  login: (data) => api.apipost(ServerUrl.API_LOGIN, data),
  signup: (data) => api.apipost(ServerUrl.API_SIGNUP, data),
  getProfile: () => api.apiget("/api/user/profile"),
};