import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createBrand } from "../features/brand/brandSlice";

let schema = Yup.object().shape({
  title: Yup.string().required("Vui lòng nhập tên thương hiệu."),
});
const AddBrand = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      dispatch(createBrand(values));
      formik.resetForm();
      setTimeout(() => {
        // todo
        navigate("/admin/list-brand");
      }, 3000);
    },
  });
  const navigate = useNavigate();
  const newBrand = useSelector((state) => state.brands);
  const { isSuccess, isLoading, isError, createdBrand } = newBrand;
  useEffect(() => {
    if (isSuccess && createdBrand !== "") {
      toast("Thêm thương hiệu mới thành công!", {
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
  }, [isSuccess, isLoading, isError, createdBrand]);
  return (
    <div>
      <h3 className="mb-4 title">Thêm thương hiệu sản phẩm</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            placeholder="Nhập thương hiệu sản phẩm mới"
            name="title"
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            value={formik.values.title}
            id="brand"
          />
          <div className="text-danger">
            {formik.touched.title && formik.errors.title}
          </div>
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

export default AddBrand;
