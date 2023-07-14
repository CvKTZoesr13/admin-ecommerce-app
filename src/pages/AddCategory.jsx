import React from "react";
import CustomInput from "../components/CustomInput";

const AddCategory = () => {
  return (
    <div>
      <h3 className="mb-4 title">Thêm danh mục</h3>
      <div>
        <form action="">
          <CustomInput type="text" placeholder="Nhập danh mục mới" />
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
