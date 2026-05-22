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
}

export default ServerUrlV2;