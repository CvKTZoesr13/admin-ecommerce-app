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
const getBlogCategory = async (id) => {
  const response = await axios.get(`${BASE_URL}blog_category/${id}`, config);
  return response.data;
};

const updateBlogCategory = async (blogCategory) => {
  const response = await axios.put(
    `${BASE_URL}blog_category/${blogCategory.id}`,
    { title: blogCategory.blogCategoryData.title },
    config
  );
  return response.data;
};
const deleteBlogCategory = async (id) => {
  const response = await axios.delete(`${BASE_URL}blog_category/${id}`, config);
  return response.data;
};

const bCategoryService = {
  getBlogCategories,
  createBlogCategory,
  getBlogCategory,
  deleteBlogCategory,
  updateBlogCategory,
};

export default bCategoryService;
