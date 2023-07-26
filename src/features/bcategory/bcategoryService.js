import axios from "axios";
import { BASE_URL } from "../../utils/base_url";
import { config } from "../../utils/axiosConfigToken";

const getBlogCategories = async () => {
  const response = await axios.get(`${BASE_URL}blog_category/`);
  return response.data;
};

const createBlogCategory = async (blogCategory) => {
  const response = await axios.post(
    `${BASE_URL}blog_category/`,
    blogCategory,
    config
  );
  return response.data;
};

const bCategoryService = {
  getBlogCategories,
  createBlogCategory,
};

export default bCategoryService;
