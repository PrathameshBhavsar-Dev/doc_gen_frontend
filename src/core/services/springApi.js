import ApiService from "./api.service";
import ServerUrlV2 from "../constants/ServerUrlV2";

// VITE_API_V2_URL = Spring root with no path, e.g. http://localhost:8080
// (use your existing Spring base-URL variable if you already have one)
export const springApi = new ApiService("https://docgen-backend-7mwl.onrender.com", {
  refreshUrl: ServerUrlV2.REFRESH,
});
