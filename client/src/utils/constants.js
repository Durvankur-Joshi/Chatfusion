export const HOST = "http://localhost:8080";
export const AUTH_ROUTES = `/api/auth`;
export const SIGNUP_ROUTES = `${AUTH_ROUTES}/register`;
export const LOGIN_ROUTES = `${AUTH_ROUTES}/login`;
export const GET_USER_INFO = `${HOST}${AUTH_ROUTES}/user-info`;
export const UPDATE_PROFILE_ROUTES = `${HOST}${AUTH_ROUTES}/update-profile`;
export const ADD_PROFILE_IMAGE_ROUTES = `${HOST}${AUTH_ROUTES}/add-profile-image`;
export const LOGOUT_ROUTES = `${AUTH_ROUTES}/logout`
