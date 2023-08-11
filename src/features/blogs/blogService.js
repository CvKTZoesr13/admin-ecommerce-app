import axios from "axios";
import { BASE_URL } from "../../utils/base_url";
import { config } from "../../utils/axiosConfigToken";

const getBlogs = async () => {
  const response = await axios.get(`${BASE_URL}blog/`);
  return response.data;
};

const createBlog = async (blog) => {
  const response = await axios.post(`${BASE_URL}blog/`, blog, config);
  return response.data;
};

const getBlog = async (id) => {
  const response = await axios.get(`${BASE_URL}blog/${id}`, config);
  return response.data;
};

const updateBlog = async (blog) => {
  const response = await axios.put(
    `${BASE_URL}blog/${blog.id}`,
    {
      title: blog.blogData.title,
      description: blog.blogData.description,
      category: blog.blogData.category,
      images: blog.blogData.images,
    },
    config
  );
  return response.data;
};
const deleteBlog = async (id) => {
  const response = await axios.delete(`${BASE_URL}blog/${id}`, config);
  return response.data;
};
const blogService = {
  getBlogs,
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog,
};

export default blogService;
