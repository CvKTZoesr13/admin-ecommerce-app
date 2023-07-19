import axios from "axios";
import { BASE_URL } from "../../utils/base_url";

const getBrands = async () => {
  const response = await axios.get(`${BASE_URL}brand/`);
  return response.data;
};

const brandService = {
  getBrands,
};

export default brandService;
