import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
// import { Stepper } from "react-form-stepper";
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
const AddBlog = () => {
  const [desc, setDesc] = useState("");
  const handleDesc = (e) => {
    setDesc(e);
  };
  return (
    <div>
      <h3 className="mb-4">Tạo bài viết</h3>
      {/* <Stepper
        steps={[
          { label: "Thêm nội dung" },
          { label: "Tải lên ảnh bìa" },
          { label: "Hoàn thành" },
        ]}
        activeStep={1}
      /> */}
      <div>
        <form action="">
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

          <CustomInput
            type="text"
            className="mt-4"
            placeholder="Nhập tiêu đề bài viết"
          />
          <select
            className="form-control py-3 mb-3"
            defaultValue={"Chọn danh mục"}
            name=""
            id=""
          >
            <option value="">Chọn danh mục</option>
          </select>
          <ReactQuill
            theme="snow"
            value={desc}
            onChange={(e) => {
              handleDesc(e);
            }}
          />
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
