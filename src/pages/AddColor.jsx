import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createColor, resetState } from "../features/color/colorSlice";

let schema = Yup.object().shape({
  title: Yup.string().required("Vui lòng chọn màu sắc."),
});

const AddColor = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      title: "#ffffff",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      dispatch(createColor(values));
      formik.resetForm();
      setTimeout(() => {
        // todo
        dispatch(resetState());
        // navigate("/admin/list-color");
      }, 3000);
    },
  });
  // const navigate = useNavigate();
  const newColor = useSelector((state) => state.colors);
  const { isSuccess, isLoading, isError, createdColor } = newColor;
  useEffect(() => {
    if (isSuccess && createdColor !== "") {
      toast("Thêm màu mới thành công!", {
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
  }, [isSuccess, isLoading, isError, createdColor]);
  return (
    <div>
      <h3 className="mb-4 title">Thêm màu</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="color"
            placeholder="Nhấn vào đây để thêm màu"
            name="title"
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            value={formik.values.title}
            id="color"
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

export default AddColor;
