class ServerUrlV2 {

  static API_USERS = "/api/v2/users";

  // CREATE
  static CREATE_PROFILE =
    `${this.API_USERS}/create-profile`;

  // GET ALL USERS
  static GET_ALL_USERS =
    `${this.API_USERS}`;

  // GET USER BY ID
  static GET_USER_BY_ID = (id) =>
    `${this.API_USERS}/${id}`;

  // UPDATE USER
  static UPDATE_USER = (id) =>
    `${this.API_USERS}/${id}`;

  // SEPARATION USER
  static GET_USER_FOR_SEPARATION = (id) =>
    `${this.API_USERS}/separation/${id}`;

  // AUTH (Spring)
  static API_AUTH = "/api/v2/auth";
  static LOGIN = `${this.API_AUTH}/login`;
  static REFRESH = `${this.API_AUTH}/refresh`;
  static LOGOUT = `${this.API_AUTH}/logout`;
  static ME = `${this.API_AUTH}/me`;
  static PROFILE = `${this.API_AUTH}/profile`;

  // ADMIN (Spring)
  static API_ADMIN = "/api/v2/admin";
  static ADMIN_USERS = `${this.API_ADMIN}/users`;
  static ADMIN_SIGNUP = `${this.API_ADMIN}/signup`;
  static ADMIN_UPDATE_USER = (id) => `${this.API_ADMIN}/users/${id}`;
}

export default ServerUrlV2;