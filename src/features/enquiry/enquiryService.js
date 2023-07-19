import axios from "axios";
import { BASE_URL } from "../../utils/base_url";

const getEnquiries = async () => {
  const response = await axios.get(`${BASE_URL}enquiry/`);
  return response.data;
};

const enquiryService = {
  getEnquiries,
};

export default enquiryService;
