import axios from "axios";
import { BASE_URL } from "../../utils/base_url";

const getColors = async () => {
  const response = await axios.get(`${BASE_URL}color/`);
  return response.data;
};

const colorService = {
  getColors,
};

export default colorService;
