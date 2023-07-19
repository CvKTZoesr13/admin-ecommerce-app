import axios from "axios";
import { BASE_URL } from "../../utils/base_url";

const getProducts = async () => {
  const response = await axios.get(`${BASE_URL}product/`);
  if (response.data) {
    localStorage.setItem("products", JSON.stringify(response.data));
  }
  return response.data;
};

const productService = {
  getProducts,
};

export default productService;
