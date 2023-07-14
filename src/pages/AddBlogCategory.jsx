import React from "react";
import CustomInput from "../components/CustomInput";

const AddBlogCategory = () => {
  return (
    <div>
      <h3 className="mb-4 title">Thêm danh mục bài viết mới</h3>
      <div>
        <form action="">
          <CustomInput type="text" placeholder="Nhập danh mục mới" />
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
