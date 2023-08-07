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

const getColor = async (id) => {
  const response = await axios.get(`${BASE_URL}color/${id}`, config);
  return response.data;
};

const updateColor = async (color) => {
  const response = await axios.put(
    `${BASE_URL}color/${color.id}`,
    { title: color.colorData.title },
    config
  );
  return response.data;
};
const deleteColor = async (id) => {
  const response = await axios.delete(`${BASE_URL}color/${id}`, config);
  return response.data;
};

const colorService = {
  getColors,
  createColor,
  getColor,
  updateColor,
  deleteColor,
};

export default colorService;
