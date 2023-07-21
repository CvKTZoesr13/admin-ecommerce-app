import axios from "axios";
import { BASE_URL } from "../../utils/base_url";
import { config } from "../../utils/axiosConfigToken";

const getProducts = async () => {
  const response = await axios.get(`${BASE_URL}product/`);
  if (response.data) {
    localStorage.setItem("products", JSON.stringify(response.data));
  }
  return response.data;
};

const createProduct = async (product) => {
  const response = await axios.post(`${BASE_URL}product/`, product, config);
  return response.data;
};

const productService = {
  getProducts,
  createProduct,
};

export default productService;
