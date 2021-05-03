import axios from "axios";
import { VERIFY_EMAIL } from "./API_URLs/urls";

export const verifyAccount = (data) => {
  const url = VERIFY_EMAIL;

  return axios.post(url, data);
};
