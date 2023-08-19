import axios from "axios";
import { BASE_URL } from "../../utils/base_url";
import setAuthToken from "../../utils/setAuthToken";

const login = async (userData) => {
  const response = await axios.post(`${BASE_URL}user/login-admin`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  } else {
    localStorage.clear();
  }
  return response.data;
};
const getOrders = async () => {
  if (localStorage.getItem("user")) {
    setAuthToken(JSON.parse(localStorage.getItem("user")).accessToken);
  }
  const response = await axios.get(`${BASE_URL}user/all-orders-all-users`);
  return response.data;
};

const getOrder = async (id) => {
  if (localStorage.getItem("user")) {
    setAuthToken(JSON.parse(localStorage.getItem("user")).accessToken);
  }
  const response = await axios.post(`${BASE_URL}user/all-orders-an-user/${id}`);
  return response.data;
};

const authService = {
  login,
  getOrders,
  getOrder,
};

export default authService;
