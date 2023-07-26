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

const blogService = {
  getBlogs,
  createBlog,
};

export default blogService;
