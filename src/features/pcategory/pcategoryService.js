import axios from "axios";
import { BASE_URL } from "../../utils/base_url";

const getProductCategories = async () => {
  const response = await axios.get(`${BASE_URL}category/`);
  return response.data;
};

const pCategoryService = {
  getProductCategories,
};

export default pCategoryService;
