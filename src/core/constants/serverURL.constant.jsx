import { API_MODULE } from "../models/api.module";
class ServerUrl {
    
    // Base URL
    static REACT_APP_API_URL = import.meta.env.VITE_API_URL;

    // ADMIN DASHBOARD COUNTS
    static API_MODULE_DASHBOARD = "/api";

    static API_DASHBOARD = ServerUrl.API_MODULE_DASHBOARD + "/admin/dashboard-stats";
}

export default ServerUrl;