class ServerUrl {
  static BASE_URL = import.meta.env.VITE_API_URL;

  // ================= USER =================
  static API_MODULE_AUTH = "/users";
  static API_LOGIN = ServerUrl.API_MODULE_AUTH + "/login";
  static API_SIGNUP = ServerUrl.API_MODULE_AUTH + "/register";
  static API_LOGOUT = ServerUrl.API_MODULE_AUTH + "/logout";

  static API_USER_PROFILE = ServerUrl.API_MODULE_AUTH + "/profile";
  static API_CHANGE_PASSWORD = ServerUrl.API_MODULE_AUTH + "/change-password";

  // ================= ADMIN =================
  static API_MODULE_ADMIN = "/api/v1/admin";

  static API_ADMIN_USERS = "/admin/users";
  static API_ADMIN_SIGNUP = ServerUrl.API_MODULE_ADMIN + "/signup";
  static API_DASHBOARD = ServerUrl.API_MODULE_ADMIN + "/dashboard-stats";

  // ================= DOCUMENTS =================
  static API_MODULE_DOCUMENTS = "/documents";

  // base
  static doc = (type) => `${this.API_MODULE_DOCUMENTS}/${type}`;
  static API_ALL_DOCUMENTS = "/documents/getalldoc";

  // 🔥 MAPPED TO YOUR BACKEND
  static generateDoc = (type) => `${this.doc(type)}/generate`;
  static getAllDocs = (type) => `${this.doc(type)}/all-letters`;
  static getDocByUserId = (type, id) => `${this.doc(type)}/user/${id}`;
  static updateDoc = (type, id) => `${this.doc(type)}/update/${id}`;
  static deleteDoc = (type, id) => `${this.doc(type)}/delete/${id}`;

  // ================= DOC TYPES =================
  static DOC_TYPES = {
    EXPERIENCE: "experience_letter",
    OFFER: "offer_letter",
    SALARY: "salaryslip_letter",
    APPOINTMENT: "appointment_letter",
    RELIEVING: "relieving_letter",
    COMPLETION: "completion_letter",
    FULLANDFINAL: "fullandfinal_letter",
    INCREMENT: "increment_letter",
    INTERNSHIP: "internship_letter",
    CONFIRMATION: "confirmation_letter",
  };
}

export default ServerUrl;
