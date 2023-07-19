import axios from "axios";
import { BASE_URL } from "../../utils/base_url";

const getBlogs = async () => {
  const response = await axios.get(`${BASE_URL}blog/`);
  return response.data;
};

const blogService = {
  getBlogs,
};

export default blogService;
