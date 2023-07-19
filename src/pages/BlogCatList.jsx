import { Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogCategories } from "../features/bcategory/bcategorySlice";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
const BlogCatList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogCategories());
  }, [dispatch]);
  const bCategoriesState = useSelector(
    (state) => state.bCategories.bCategories
  );
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      render: (text) => (
        <a href="#!" className="text-decoration-none text-dark">
          {text}
        </a>
      ),
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
    },
    {
      title: "Tùy chỉnh",
      dataIndex: "action",
    },
  ];
  const dataTable = [];
  for (let i = 0; i < bCategoriesState.length; i++) {
    dataTable.push({
      key: i + 1,
      name: bCategoriesState[i].title,
      action: (
        <>
          <Link className="fs-3 ">
            <BiEditAlt />
          </Link>
          <Link className="fs-3  text-danger">
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Danh mục bài viết</h3>
      <div>
        <Table columns={columns} dataSource={dataTable} />
      </div>
    </div>
  );
};

export default BlogCatList;
