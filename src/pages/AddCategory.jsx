import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createProductCategory,
  getAProductCategory,
  resetState,
  updateAProductCategory,
} from "../features/pcategory/pcategorySlice";
import { useLocation, useNavigate } from "react-router-dom";

let schema = Yup.object().shape({
  title: Yup.string().required("Vui lòng nhập tên danh mục sản phẩm."),
});

const AddCategory = () => {
  const dispatch = useDispatch();
  // location
  const location = useLocation();
  const navigate = useNavigate();
  const getProdCategoryId = location.pathname.split("/")[3];
  const newCategory = useSelector((state) => state.pCategories);
  const {
    isSuccess,
    isLoading,
    isError,
    createdCategory,
    updatedCategory,
    categoryName,
  } = newCategory;
  useEffect(() => {
    if (getProdCategoryId !== undefined) {
      dispatch(getAProductCategory(getProdCategoryId));
    } else {
      dispatch(resetState());
    }
  }, [getProdCategoryId, dispatch]);

  useEffect(() => {
    if (isSuccess && createdCategory !== "") {
      toast("Thêm danh mục mới thành công!", {
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
    if (isSuccess && updatedCategory !== "") {
      toast("Cập nhật danh mục thành công!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/admin/list-category");
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
  }, [
    isSuccess,
    isLoading,
    isError,
    createdCategory,
    updatedCategory,
    navigate,
  ]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      if (getProdCategoryId !== undefined) {
        const data = {
          id: getProdCategoryId,
          prodCategoryData: values,
        };
        dispatch(updateAProductCategory(data));
        dispatch(resetState());
      } else {
        dispatch(createProductCategory(values));
        formik.resetForm();
        setTimeout(() => {
          // todo
          dispatch(resetState());
          // navigate("/admin/list-category");
        }, 300);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">
        {getProdCategoryId !== undefined ? "Sửa" : "Thêm"} danh mục{" "}
        {getProdCategoryId !== undefined ? categoryName : ""}
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            placeholder="Nhập danh mục mới"
            name="title"
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            value={formik.values.title}
            id="category"
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

export default AddCategory;
