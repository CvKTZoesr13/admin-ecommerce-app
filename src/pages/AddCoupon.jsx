import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createCoupon, resetState } from "../features/coupon/couponSlice";

let schema = Yup.object().shape({
  name: Yup.string().required(
    "Vui lòng nhập mã phiếu mua hàng / giảm giá mới."
  ),
  expiry: Yup.date().required("Vui lòng nhập thời hạn phiếu."),
  discount: Yup.number().required("Vui lòng nhập số lượng phiếu khả dụng."),
});
const AddCoupon = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      expiry: "",
      discount: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      dispatch(createCoupon(values));
      formik.resetForm();
      setTimeout(() => {
        // todo
        dispatch(resetState());
        // navigate("/admin/list-brand");
      }, 3000);
    },
  });
  // const navigate = useNavigate();
  const newCoupon = useSelector((state) => state.coupons);
  const { isSuccess, isLoading, isError, createdCoupon } = newCoupon;
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
  }, [isSuccess, isLoading, isError, createdCoupon]);
  return (
    <div>
      <h3 className="mb-4 title">Thêm phiếu mua hàng / phiếu giảm giá</h3>
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
