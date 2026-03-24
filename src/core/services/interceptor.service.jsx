import axios from "axios";
import ServerUrl from "../constants/serverURL.constant";

class ApiInterceptor {
  static init() {
    const instance = axios.create({
      baseURL: ServerUrl.REACT_APP_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // No JWT logic here for now
    return instance;
  }
}

export default ApiInterceptor;