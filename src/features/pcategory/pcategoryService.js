import axios from "axios";
import { BASE_URL } from "../../utils/base_url";
import { config } from "../../utils/axiosConfigToken";

const getProductCategories = async () => {
  const response = await axios.get(`${BASE_URL}category/`);
  return response.data;
};
// create category
const createProductCategory = async (category) => {
  const response = await axios.post(`${BASE_URL}category/`, category, config);
  return response.data;
};

const getProductCategory = async (id) => {
  const response = await axios.get(`${BASE_URL}category/${id}`, config);
  return response.data;
};

const updateProductCategory = async (category) => {
  const response = await axios.put(
    `${BASE_URL}category/${category.id}`,
    { title: category.prodCategoryData.title },
    config
  );
  return response.data;
};
const deleteProductCategory = async (id) => {
  const response = await axios.delete(`${BASE_URL}category/${id}`, config);
  return response.data;
};

const pCategoryService = {
  getProductCategories,
  createProductCategory,
  getProductCategory,
  updateProductCategory,
  deleteProductCategory,
};

export default pCategoryService;
