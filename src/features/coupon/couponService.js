import axios from "axios";
import { BASE_URL } from "../../utils/base_url";
import { config } from "../../utils/axiosConfigToken";
const getCoupons = async () => {
  const response = await axios.get(`${BASE_URL}coupon/`);
  return response.data;
};

const createCoupon = async (coupon) => {
  const response = await axios.post(`${BASE_URL}coupon/`, coupon, config);
  return response.data;
};

const couponService = {
  getCoupons,
  createCoupon,
};

export default couponService;
