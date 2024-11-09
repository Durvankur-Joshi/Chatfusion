export const HOST = "http://localhost:8080";

// user constance

export const AUTH_ROUTES = `/api/auth`;
export const SIGNUP_ROUTES = `${AUTH_ROUTES}/register`;
export const LOGIN_ROUTES = `${AUTH_ROUTES}/login`;
export const GET_USER_INFO = `${HOST}${AUTH_ROUTES}/user-info`;
export const UPDATE_PROFILE_ROUTES = `${HOST}${AUTH_ROUTES}/update-profile`;
export const ADD_PROFILE_IMAGE_ROUTES = `${HOST}${AUTH_ROUTES}/add-profile-image`;
export const LOGOUT_ROUTES = `${AUTH_ROUTES}/logout`

// contact constance 
export const CONTACT_ROUTES = `/api/contacts`
export const SEARCH_CONTACT = `${CONTACT_ROUTES}/search`
export const GET_DM_CONTACT_ROUTES = "http://localhost:8080/api/contacts/get-contacts-for-dm"
export const GET_ALL_CONTACT_ROUTES = `${CONTACT_ROUTES}/get-all-contacts`

export const MESSAGES_ROUTES = "/api/messages";
export const GET_ALL_MESSAGES_ROUTES = `${MESSAGES_ROUTES}/get-message`;
export const UPLOAD_FILE_ROUTES = `${MESSAGES_ROUTES}/upload-file`


export const CHANNEL_ROUTES = "/api/channel";
export const CREATE_CHANNEL_ROUTES= `${CHANNEL_ROUTES}/create-channel`;
export const GET_USER_CHANNEL_ROUTES = `${CHANNEL_ROUTES}/get-user-channel`

export const GET_CHANNEL_MESSAGES = `${CHANNEL_ROUTES}/get-channel-messages`