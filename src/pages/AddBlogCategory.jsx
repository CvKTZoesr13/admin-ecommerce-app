import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createBlogCategory,
  getABlogCategory,
  resetState,
  updateABlogCategory,
} from "../features/bcategory/bcategorySlice";
import { useLocation, useNavigate } from "react-router-dom";

let schema = Yup.object().shape({
  title: Yup.string().required("Vui lòng nhập tên danh mục bài viết."),
});
const AddBlogCategory = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getBCategoryId = location.pathname.split("/")[3];

  const newBlogCategory = useSelector((state) => state.bCategories);
  const {
    isSuccess,
    isLoading,
    isError,
    createdBlogCategory,
    updatedBlogCategory,
    bCategoryName,
  } = newBlogCategory;

  useEffect(() => {
    if (getBCategoryId !== undefined) {
      dispatch(getABlogCategory(getBCategoryId));
    } else {
      dispatch(resetState());
    }
  }, [getBCategoryId, dispatch]);
  useEffect(() => {
    if (isSuccess && createdBlogCategory) {
      toast("Thêm danh mục mới thành công!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    if (isSuccess && updatedBlogCategory !== "") {
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
      navigate("/admin/blog-category-list");
    }
    if (isError) {
      toast("Có lỗi xảy ra!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }, [
    isSuccess,
    isLoading,
    isError,
    createdBlogCategory,
    updatedBlogCategory,
    navigate,
  ]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: bCategoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      if (getBCategoryId !== undefined) {
        const data = {
          id: getBCategoryId,
          blogCategoryData: values,
        };
        dispatch(updateABlogCategory(data));
        dispatch(resetState());
      } else {
        dispatch(createBlogCategory(values));
        formik.resetForm();
        setTimeout(() => {
          // todo
          dispatch(resetState());
          // navigate("/admin/blog-category-list");
        }, 300);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">
        {getBCategoryId !== undefined ? "Sửa" : "Thêm"} danh mục bài viết{" "}
        {getBCategoryId !== undefined ? bCategoryName : "mới"}
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
            id="blogCategory"
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

export default AddBlogCategory;
