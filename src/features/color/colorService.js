import axios from "axios";
import { BASE_URL } from "../../utils/base_url";
import { config } from "../../utils/axiosConfigToken";

const getColors = async () => {
  const response = await axios.get(`${BASE_URL}color/`);
  return response.data;
};
// create color
const createColor = async (color) => {
  const response = await axios.post(`${BASE_URL}color/`, color, config);
  return response.data;
};
const colorService = {
  getColors,
  createColor,
};

export default colorService;
