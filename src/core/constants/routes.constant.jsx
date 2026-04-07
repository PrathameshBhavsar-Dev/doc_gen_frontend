class ROUTES {

  static ADMIN_BASE = "/admin";
  static USER_BASE = "/user";
  static DOCUMENT_BASE = "/document";

  //  Auth Pages
  static LOGIN = "/";
  // static SIGNUP = "/";

  // Admin Pages
  static ADMIN_DASHBOARD = `${this.ADMIN_BASE}/dashboard`;
  static ADMIN_COMPANY_MANAGEMENT = `${this.ADMIN_BASE}/company-dashboard`;
  static ADMIN_USER_MANAGEMENT = `${this.ADMIN_BASE}/user-management`;
  static ADMIN_HISTORY = `${this.ADMIN_BASE}/history`;
  static ADMIN_SETTINGS = `${this.ADMIN_BASE}/settings`;
  static ADMIN_ADD_COMPANY = `${this.ADMIN_BASE}/add-company`;
  static ADMIN_COMPANY_DETAILS = `${this.ADMIN_BASE}/company-details/:id`;

  // User Pages
  static USER_DASHBOARD = `${this.USER_BASE}/dashboard`;
  static USER_HISTORY = `${this.USER_BASE}/history`;
  static USER_PROFILE = `${this.USER_BASE}/profile`;
  static USER_SETTINGS = `${this.USER_BASE}/settings`;
  static USERDOCUMENT_DETAIL = `${this.USER_BASE}/document-detail`;
  static USER_FORM = `${this.USER_BASE}/form`;

  // Documents
  static DOCUMENT_CREATE = `${this.DOCUMENT_BASE}/create`;
  static DOCUMENT_PREVIEW = `${this.DOCUMENT_BASE}/preview`;
  // static DOCUMENT_PREVIEW_BY_ID = `${this.DOCUMENT_BASE}/preview/:id`;
  static DOCUMENT_PREVIEW_BY_ID = "/document/preview/:docType/:id";
  static DOCUMENT_GENERATE = `${this.DOCUMENT_BASE}/generate`;
  static EDIT_DOCUMENT = `${this.DOCUMENT_BASE}/edit`; // ✅ add this

}

export default ROUTES;