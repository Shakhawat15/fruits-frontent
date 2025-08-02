import { getToken } from "../helper/SessionHelper";

// const baseURL = "http://127.0.0.1:8000/api/v1";
const imageBaseURL = "http://localhost:8000";

const baseURL = "https://fruits-backend-ten.vercel.app/";

const AxiosHeader = { headers: { Authorization: getToken() } };
const AxiosHeaderForImage = {
  headers: { Authorization: getToken(), "Content-Type": "multipart/form-data" },
};

export { baseURL, AxiosHeader, imageBaseURL, AxiosHeaderForImage };
