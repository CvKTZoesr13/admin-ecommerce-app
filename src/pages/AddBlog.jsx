import React, { /*useState,*/ useEffect, useRef } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
import { getBlogCategories } from "../features/bcategory/bcategorySlice";
import { createBlogs, resetState } from "../features/blogs/blogSlice";

let schema = Yup.object().shape({
  title: Yup.string().required("Vui lòng nhập tiêu đề bài viết."),
  description: Yup.string().required("Vui lòng nhập nội dung bài viết."),
  category: Yup.string().required("Vui lòng chọn danh mục."),
});
const AddBlog = () => {
  console.log("render");

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const [images, setImages] = useState([]);
  useEffect(() => {
    dispatch(getBlogCategories());
  }, [dispatch]);
  const imgState = useSelector((state) => state.uploads.images);
  const bCatState = useSelector((state) => state.bCategories.bCategories);

  const newBlog = useSelector((state) => state.blogs);
  const { isSuccess, isLoading, isError, createdBlog } = newBlog;
  useEffect(() => {
    if (isSuccess && createdBlog !== "") {
      toast("Thêm bài viết mới thành công!", {
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
  }, [isSuccess, isLoading, isError, createdBlog]);
  // const img = useMemo(() => {
  //   let img = [];
  //   return img;
  // }, []);

  let imgRef = useRef([]);
  let img = imgRef.current;
  // const img = [];
  useEffect(() => {
    imgState.forEach((item) => {
      img.push({
        public_id: item.public_id,
        url: item.url,
      });
    });
  }, [imgState, img]);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      dispatch(createBlogs(values));
      img.length = 0;
      formik.resetForm();
      setTimeout(() => {
        // todo
        dispatch(resetState());
        // navigate("/admin/blog-list");
      }, 3000);
    },
  });
  useEffect(() => {
    formik.values.images = img;
  }, [formik.values, img]);
  return (
    <div>
      <h3 className="mb-4 title">Tạo bài viết</h3>
      {/* <Stepper
        steps={[
          { label: "Thêm nội dung" },
          { label: "Tải lên ảnh bìa" },
          { label: "Hoàn thành" },
        ]}
        activeStep={1}
      /> */}
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              // ref={imageRef}
              onDrop={(acceptedFiles) => {
                dispatch(uploadImg(acceptedFiles));
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input
                      name="images"
                      onChange={formik.handleChange("images")}
                      {...getInputProps()}
                    />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="show-upload-images d-flex flex-wrap gap-3">
            {imgState?.map((i, j) => {
              return (
                <div className="position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => {
                      // removeByAttr(img, "public_id", i.public_id);
                      return dispatch(delImg(i.public_id));
                    }}
                    style={{ top: "5px", right: "5px" }}
                    className="btn-close position-absolute"
                  ></button>
                  <img
                    src={i.url}
                    alt=""
                    className="img-fluid img-thumbnail"
                    width={200}
                    height={200}
                  />
                </div>
              );
            })}
          </div>

          <CustomInput
            type="text"
            className="mt-4 fs-4 fw-bold"
            placeholder="Nhập tiêu đề bài viết"
            name="title"
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            value={formik.values.title}
          />
          <div className="text-danger">
            {formik.touched.title && formik.errors.title}
          </div>
          <select
            className="form-control py-3 mb-3"
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            id="bCategory"
          >
            <option value="" style={{ display: "none" }}>
              Chọn danh mục
            </option>
            {bCatState.map((bCategory, index) => {
              return (
                <option key={index} value={bCategory.title}>
                  {bCategory.title}
                </option>
              );
            })}
          </select>
          <div className="text-danger">
            {formik.touched.category && formik.errors.category}
          </div>
          <ReactQuill
            theme="snow"
            name="description"
            onChange={formik.handleChange("description")}
            value={formik.values.description}
          />
          <div className="text-danger">
            {formik.touched.description && formik.errors.description}
          </div>
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 mt-3 float-end"
          >
            Tạo bài viết
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
