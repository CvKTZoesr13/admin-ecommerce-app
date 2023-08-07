import axios from "axios";
import { BASE_URL } from "../../utils/base_url";
import { config } from "../../utils/axiosConfigToken";
const getCoupons = async () => {
  const response = await axios.get(`${BASE_URL}coupon/`, config);
  return response.data;
};

const createCoupon = async (coupon) => {
  const response = await axios.post(`${BASE_URL}coupon/`, coupon, config);
  return response.data;
};

const getCoupon = async (id) => {
  const response = await axios.get(`${BASE_URL}coupon/${id}`, config);
  return response.data;
};

const updateCoupon = async (coupon) => {
  const response = await axios.put(
    `${BASE_URL}coupon/${coupon.id}`,
    {
      name: coupon.couponData.name,
      expiry: coupon.couponData.expiry,
      discount: coupon.couponData.discount,
    },
    config
  );
  return response.data;
};
const deleteCoupon = async (id) => {
  const response = await axios.delete(`${BASE_URL}coupon/${id}`, config);
  return response.data;
};

const couponService = {
  getCoupons,
  createCoupon,
  getCoupon,
  updateCoupon,
  deleteCoupon,
};

export default couponService;
