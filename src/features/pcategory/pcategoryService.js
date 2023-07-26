import axios from "axios";
import { BASE_URL } from "../../utils/base_url";
import { config } from "../../utils/axiosConfigToken";

const getProductCategories = async () => {
  const response = await axios.get(`${BASE_URL}category/`);
  return response.data;
};
// create category
const createProductCategory = async (category) => {
  const response = await axios.post(`${BASE_URL}category/`, category, config);
  return response.data;
};

const pCategoryService = {
  getProductCategories,
  createProductCategory,
};

export default pCategoryService;
