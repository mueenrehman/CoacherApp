import axios from "axios";
import { LOGIN_URL } from "./API_URLs/urls";

export const userLogin = (data) => {
  const url = LOGIN_URL;

  return axios.post(url, data);
};
