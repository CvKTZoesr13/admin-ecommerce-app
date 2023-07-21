import axios from "axios";
import { config } from "../../utils/axiosConfigToken";
import { BASE_URL } from "../../utils/base_url";

const uploadImg = async (data) => {
  const response = await axios.put(`${BASE_URL}upload/`, data, config);
  return response.data;
};

const deleteImg = async (id) => {
  const response = await axios.delete(
    `${BASE_URL}upload/delete-img/${id}`,
    config
  );
  return response.data;
};
const uploadService = {
  uploadImg,
  deleteImg,
};

export default uploadService;
