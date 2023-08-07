import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createCoupon,
  getACoupon,
  resetState,
  updateACoupon,
} from "../features/coupon/couponSlice";
import { useLocation, useNavigate } from "react-router-dom";

let schema = Yup.object().shape({
  name: Yup.string().required(
    "Vui lòng nhập mã phiếu mua hàng / giảm giá mới."
  ),
  expiry: Yup.date().required("Vui lòng nhập thời hạn phiếu."),
  discount: Yup.number().required("Vui lòng nhập số lượng phiếu khả dụng."),
});
const AddCoupon = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getCouponId = location.pathname.split("/")[3];
  const navigate = useNavigate();
  const newCoupon = useSelector((state) => state.coupons);

  const {
    isSuccess,
    isLoading,
    isError,
    createdCoupon,
    couponName,
    couponExpiry,
    couponDiscount,
    updatedCoupon,
  } = newCoupon;

  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getACoupon(getCouponId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getCouponId]);

  useEffect(() => {
    if (isSuccess && createdCoupon !== "") {
      toast("Thêm phiếu mua hàng mới thành công!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (isSuccess && updatedCoupon !== "") {
      toast("Cập nhật thành công!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/admin/coupon-list");
    }
    if (isError) {
      toast("Có lỗi xảy ra!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [isSuccess, isLoading, isError, createdCoupon, updatedCoupon, navigate]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponName || "",
      expiry: couponExpiry?.split("T")[0] || "",
      discount: couponDiscount || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      if (getCouponId !== undefined) {
        const data = {
          id: getCouponId,
          couponData: values,
        };
        dispatch(updateACoupon(data));
        dispatch(resetState());
      } else {
        dispatch(createCoupon(values));
        formik.resetForm();
        setTimeout(() => {
          // todo
          dispatch(resetState());
          // navigate("/admin/list-brand");
        }, 300);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">
        {getCouponId !== undefined ? "Sửa" : "Thêm"} phiếu mua hàng / phiếu giảm
        giá {getCouponId !== undefined ? couponName : ""}
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="text-danger">
            {formik.touched.name && formik.errors.name}
          </div>
          <CustomInput
            type="text"
            placeholder="Nhập mã phiếu mới"
            name="name"
            onChange={formik.handleChange("name")}
            onBlur={formik.handleBlur("name")}
            value={formik.values.name}
            id="name"
          />
          <div className="text-danger">
            {formik.touched.expiry && formik.errors.expiry}
          </div>
          <CustomInput
            type="date"
            placeholder="Ngày hết hạn"
            name="expiry"
            onChange={formik.handleChange("expiry")}
            onBlur={formik.handleBlur("expiry")}
            value={formik.values.expiry}
            id="date"
          />
          <div className="text-danger">
            {formik.touched.discount && formik.errors.discount}
          </div>
          <CustomInput
            type="number"
            placeholder="Nhập số lượng phiếu khả dụng"
            name="discount"
            onChange={formik.handleChange("discount")}
            onBlur={formik.handleBlur("discount")}
            value={formik.values.discount}
            id="discount"
          />

          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 mt-3 float-end"
          >
            Xác nhận
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
