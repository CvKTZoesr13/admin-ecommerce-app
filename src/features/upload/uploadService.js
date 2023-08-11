import axios from "axios";
import { config } from "../../utils/axiosConfigToken";
import { BASE_URL } from "../../utils/base_url";
import setAuthToken from "../../utils/setAuthToken";

const uploadImg = async (data) => {
  if (localStorage.getItem("user")) {
    setAuthToken(JSON.parse(localStorage.getItem("user")).accessToken);
  }
  const response = await axios.put(`${BASE_URL}upload/`, data /*, config*/);
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
