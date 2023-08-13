import axios from "axios";
import { BASE_URL } from "../../utils/base_url";
import { config } from "../../utils/axiosConfigToken";

const getEnquiries = async () => {
  const response = await axios.get(`${BASE_URL}enquiry/`, config);
  return response.data;
};

const deleteEnquiry = async (id) => {
  const response = await axios.delete(`${BASE_URL}enquiry/${id}`, config);
  return response.data;
};

const getEnquiry = async (id) => {
  const response = await axios.get(`${BASE_URL}enquiry/${id}`);
  return response.data;
};

const updateEnquiry = async (enq) => {
  const response = await axios.put(
    `${BASE_URL}enquiry/${enq.id}`,
    { status: enq.enqData },
    config
  );
  return response.data;
};

const enquiryService = {
  getEnquiries,
  deleteEnquiry,
  getEnquiry,
  updateEnquiry,
};

export default enquiryService;
