import axios from "axios";
import { BASE_URL } from "../../utils/base_url";
import setAuthToken from "../../utils/setAuthToken";

const login = async (userData) => {
  const response = await axios.post(`${BASE_URL}user/login-admin`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const getOrders = async () => {
  if (localStorage.getItem("user")) {
    setAuthToken(JSON.parse(localStorage.getItem("user")).accessToken);
  }
  const response = await axios.get(`${BASE_URL}user/get-orders`);
  return response.data;
};

const authService = {
  login,
  getOrders,
};

export default authService;