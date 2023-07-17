import axios from "axios";
import { BASE_URL } from "../../utils/base_url";
import setAuthToken from "../../utils/setAuthToken";

const getUsers = async () => {
  if (localStorage.getItem("user")) {
    setAuthToken(JSON.parse(localStorage.getItem("user")).accessToken);
  }
  const response = await axios.get(`${BASE_URL}user/all-users`);
  if (response.data) {
    localStorage.setItem("customers", JSON.stringify(response.data));
  }
  return response.data;
};

const customerService = {
  getUsers,
};

export default customerService;
