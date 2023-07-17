import axios from "axios";
import { BASE_URL } from "../../utils/base_url";

const getUsers = async () => {
  const response = await axios.get(`${BASE_URL}product/`);
  if (response.data) {
    localStorage.setItem("products", JSON.stringify(response.data));
  }
  return response.data;
};

const productService = {
  getUsers,
};

export default productService;
