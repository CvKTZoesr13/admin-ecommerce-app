import axios from "axios";
import { BASE_URL } from "../../utils/base_url";
import { config } from "../../utils/axiosConfigToken";
const getBrands = async () => {
  const response = await axios.get(`${BASE_URL}brand/`);
  return response.data;
};

const createBrand = async (brand) => {
  const response = await axios.post(`${BASE_URL}brand/`, brand, config);
  return response.data;
};

const getBrand = async (id) => {
  const response = await axios.get(`${BASE_URL}brand/${id}`, config);
  return response.data;
};

const updateBrand = async (brand) => {
  const response = await axios.put(
    `${BASE_URL}brand/${brand.id}`,
    { title: brand.brandData.title },
    config
  );
  return response.data;
};
const deleteBrand = async (id) => {
  const response = await axios.delete(`${BASE_URL}brand/${id}`, config);
  return response.data;
};
const brandService = {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
};

export default brandService;
