import axios from "axios";
import { BASE_URL } from "../../utils/base_url";

const login = async (userData) => {
  const response = await axios.post(`${BASE_URL}user/login-admin`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const authService = {
  login,
};

export default authService;
