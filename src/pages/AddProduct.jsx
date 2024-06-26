import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import "react-quill/dist/quill.snow.css";
const { Dragger } = Upload;
const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};
const AddProduct = () => {
  const [desc, setDesc] = useState("");
  const handleDesc = (e) => {
    setDesc(e);
  };
  return (
    <div>
      <h3 className="mb-4 title">Thêm sản phẩm</h3>
      <div>
        <form action="">
          <CustomInput type="text" placeholder="Nhập tiêu đề sản phẩm" />
          <div className="mb-3">
            {/* <h4>Thêm mô tả</h4> */}
            <ReactQuill
              theme="snow"
              value={desc}
              onChange={(e) => {
                handleDesc(e);
              }}
            />
          </div>
          <CustomInput type="number" placeholder="Nhập giá bán" />
          <select
            className="form-control py-3 mb-3"
            defaultValue={""}
            name=""
            id=""
          >
            <option value="">Chọn thương hiệu</option>
          </select>
          <select
            className="form-control py-3 mb-3"
            defaultValue={""}
            name=""
            id=""
          >
            <option value="">Chọn danh mục</option>
          </select>
          <select
            className="form-control py-3 mb-3"
            defaultValue={""}
            name=""
            id=""
          >
            <option value="">Chọn màu sắc</option>
          </select>
          <CustomInput type="number" placeholder="Nhập số lượng có" />
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger>
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
