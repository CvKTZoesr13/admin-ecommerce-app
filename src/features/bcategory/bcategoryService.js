import axios from "axios";
import { BASE_URL } from "../../utils/base_url";

const getBlogCategories = async () => {
  const response = await axios.get(`${BASE_URL}blog_category/`);
  return response.data;
};

const bCategoryService = {
  getBlogCategories,
};

export default bCategoryService;
