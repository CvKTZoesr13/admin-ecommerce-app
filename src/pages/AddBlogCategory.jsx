import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createBlogCategory,
  resetState,
} from "../features/bcategory/bcategorySlice";

let schema = Yup.object().shape({
  title: Yup.string().required("Vui lòng nhập tên danh mục bài viết."),
});
const AddBlogCategory = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      dispatch(createBlogCategory(values));
      formik.resetForm();
      setTimeout(() => {
        // todo
        dispatch(resetState());
        // navigate("/admin/blog-category-list");
      }, 3000);
    },
  });
  // const navigate = useNavigate();
  const newBlogCategory = useSelector((state) => state.bCategories);
  const { isSuccess, isLoading, isError, createdBlogCategory } =
    newBlogCategory;
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
  }, [isSuccess, isLoading, isError, createdBlogCategory]);
  return (
    <div>
      <h3 className="mb-4 title">Thêm danh mục bài viết mới</h3>
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
            Tạo danh mục
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCategory;
