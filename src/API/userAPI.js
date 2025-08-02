import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/FormHelper";
import { setToken, setUser } from "../helper/SessionHelper";
import { baseURL } from "./config";

export const LoginRequest = async (email, password, setLoading) => {
  const URL = `${baseURL}/users/login`;
  const PostBody = { email, password };
  try {
    setLoading(true);
    const response = await axios.post(URL, PostBody);
    console.log('====================================');
    console.log("Login Response:", response);
    console.log('====================================');
    // console.log("====================================");
    // console.log(response.status);
    // console.log(response.data);
    // console.log("====================================");
    setLoading(false);
    if (response.status === 200) {
      setToken(response.data.data.accessToken);
      setUser(response.data.data.user);
      SuccessToast(response.data.message);
      return true;
    }
  } catch (error) {
    setLoading(false);
    console.error('====================================');
    console.error("Login Error:", error);
    console.error('====================================');
    ErrorToast(error.response.data.message);
  }
};
