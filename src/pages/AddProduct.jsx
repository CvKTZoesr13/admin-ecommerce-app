import React, { useEffect, useRef, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getProductCategories } from "../features/pcategory/pcategorySlice";
import { getColors } from "../features/color/colorSlice";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { createProducts, resetState } from "../features/product/productSlice";
import { removeByAttr } from "../utils/removeByAttr";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

let schema = Yup.object().shape({
  title: Yup.string().required("Vui lòng nhập tên sản phẩm."),
  description: Yup.string().required("Vui lòng nhập mô tả."),
  price: Yup.number().required("Vui lòng nhập giá bán."),
  brand: Yup.string().required("Vui lòng chọn thương hiệu."),
  category: Yup.string().required("Vui lòng chọn danh mục."),
  tags: Yup.string().required("Vui lòng chọn tag."),
  color: Yup.array()
    .min(1, "Vui lòng chọn ít nhất 1 màu")
    .required("Vui lòng chọn màu sắc."),
  quantity: Yup.number().required("Vui lòng nhập số lượng."),
});

const AddProduct = () => {
  console.log("render");

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [color, setColor] = useState([]);
  // const [images, setImages] = useState([]);
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getProductCategories());
    dispatch(getColors());
  }, [dispatch]);
  const brandState = useSelector((state) => state.brands.brands);
  const catState = useSelector((state) => state.pCategories.pCategories);
  const colorState = useSelector((state) => state.colors.colors);
  const imgState = useSelector((state) => state.uploads.images);
  const newProduct = useSelector((state) => state.products);
  const { isSuccess, isLoading, isError, createdProduct } = newProduct;
  useEffect(() => {
    if (isSuccess && createdProduct !== "") {
      toast("Thêm sản phẩm mới thành công!", {
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
  }, [isSuccess, isLoading, isError, createdProduct]);
  const colorOption = [];
  colorState.forEach((item) => {
    colorOption.push({
      label: item.title,
      value: item._id,
    });
  });
  console.log(colorOption);
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
      price: "",
      brand: "",
      category: "",
      color: "",
      quantity: "",
      images: "",
      tags: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      dispatch(createProducts(values));
      img.length = 0;
      formik.resetForm();
      setColor(null);
      setTimeout(() => {
        // todo
        dispatch(resetState());
        // navigate("/admin/product-list");
      }, 3000);
    },
  });
  const handleColors = (e) => {
    setColor(e);
  };
  useEffect(() => {
    formik.values.color = color
      ? [
          ...color?.map((c) => {
            return {
              _id: c,
              color: colorState.filter((colorItem) => colorItem._id === c)[0]
                .title,
            };
          }),
        ]
      : " ";
    formik.values.images = img;
  }, [formik.values, color, img, colorState]);
  return (
    <div>
      <h3 className="mb-4 title">Thêm sản phẩm</h3>
      <div>
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="d-flex flex-column gap-3"
        >
          <CustomInput
            type="text"
            placeholder="Nhập tiêu đề sản phẩm"
            name="title"
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            value={formik.values.title}
          />
          <div className="text-danger">
            {formik.touched.title && formik.errors.title}
          </div>
          <div>
            {/* <h4>Thêm mô tả</h4> */}
            <ReactQuill
              theme="snow"
              name="description"
              onChange={formik.handleChange("description")}
              value={formik.values.description}
            />
          </div>
          <div className="text-danger">
            {formik.touched.description && formik.errors.description}
          </div>
          <CustomInput
            type="number"
            placeholder="Nhập giá bán"
            value={formik.values.price}
            name="price"
            onChange={formik.handleChange("price")}
            onBlur={formik.handleBlur("price")}
          />
          <div className="text-danger">
            {formik.touched.price && formik.errors.price}
          </div>
          <select
            className="form-control py-3"
            name="brand"
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
            value={formik.values.brand}
            id=""
          >
            <option style={{ display: "none" }} value="">
              Chọn thương hiệu
            </option>
            {brandState.map((brand, index) => {
              return (
                <option key={index} value={brand.title}>
                  {brand.title}
                </option>
              );
            })}
          </select>
          <div className="text-danger">
            {formik.touched.brand && formik.errors.brand}
          </div>
          <select
            className="form-control py-3"
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            id=""
          >
            <option value="" style={{ display: "none" }}>
              Chọn danh mục
            </option>
            {catState.map((pCategory, index) => {
              return (
                <option key={index} value={pCategory.title}>
                  {pCategory.title}
                </option>
              );
            })}
          </select>
          <div className="text-danger">
            {formik.touched.category && formik.errors.category}
          </div>
          <select
            className="form-control py-3"
            name="tags"
            onChange={formik.handleChange("tags")}
            onBlur={formik.handleBlur("tags")}
            value={formik.values.tags}
            id=""
          >
            <option value="" disabled>
              Chọn tag
            </option>
            <option value="featured">Featured</option>
            <option value="popular">Popular</option>
            <option value="special">Special</option>
          </select>
          <div className="text-danger">
            {formik.touched.tags && formik.errors.tags}
          </div>

          <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="Chọn màu sắc"
            defaultValue={color}
            onChange={(i) => handleColors(i)}
            showSearch={false}
            options={colorOption}
          />
          <div className="text-danger">
            {formik.touched.color && formik.errors.color}
          </div>
          <CustomInput
            type="number"
            placeholder="Nhập số lượng có"
            name="quantity"
            onChange={formik.handleChange("quantity")}
            onBlur={formik.handleBlur("quantity")}
            value={formik.values.quantity}
          />
          <div className="text-danger">
            {formik.touched.quantity && formik.errors.quantity}
          </div>
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
            {img?.map((i, j) => {
              return (
                <div className="position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => {
                      removeByAttr(img, "public_id", i.public_id);
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

export default AddProduct;
