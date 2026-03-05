class ROUTES {

  static ADMIN_BASE = "/admin";
  static USER_BASE = "/user";
  static DOCUMENT_BASE = "/document";

  // Auth Pages
  static LOGIN = "/login";
  static SIGNUP = "/";

  // Admin Pages
  static ADMIN_DASHBOARD = `${this.ADMIN_BASE}/dashboard`;

  // User Pages
  static USER_DASHBOARD = `${this.USER_BASE}/dashboard`;
  static USER_HISTORY = `${this.USER_BASE}/history`;
  static USER_PROFILE = `${this.USER_BASE}/profile`;
  static USER_SETTINGS = `${this.USER_BASE}/settings`;
  static USER_DOCUMENT_DETAIL = `${this.USER_BASE}/document-detail`;
  static USER_FORM = `${this.USER_BASE}/form`;

  // User → Document Routes (user-scoped)
  static USER_DOCUMENT_CREATE = `${this.USER_BASE}/document/create`;
  static USER_DOCUMENT_EDIT = `${this.USER_BASE}/document/:id/edit`;
  static USER_DOCUMENT_PREVIEW = `${this.USER_BASE}/document/:id/preview`;
  static USER_DOCUMENT_DOWNLOAD = `${this.USER_BASE}/document/:id/download`;

  // Document Pages (global)
  // static DOCUMENT_DASHBOARD = `${this.DOCUMENT_BASE}/dashboard`;
  // static DOCUMENT_CREATE = `${this.DOCUMENT_BASE}/create`;
  // static DOCUMENT_EDIT = `${this.DOCUMENT_BASE}/:id/edit`;
  // static DOCUMENT_PREVIEW = `${this.DOCUMENT_BASE}/:id/preview`;
  // static DOCUMENT_DOWNLOAD = `${this.DOCUMENT_BASE}/:id/download`;
}

export default ROUTES;