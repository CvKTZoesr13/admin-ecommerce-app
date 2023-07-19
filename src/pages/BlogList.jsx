import { Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../features/blogs/blogSlice";
import { Link } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
const BlogList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  const getBlogState = useSelector((state) => state.blogs.blogs);
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
      title: "Tiêu đề",
      dataIndex: "name",
    },
    {
      title: "Danh mục bài viết",
      dataIndex: "category",
    },
    {
      title: "Tùy chỉnh",
      dataIndex: "action",
    },
  ];
  const dataTable = [];
  for (let i = 0; i < getBlogState.length; i++) {
    dataTable.push({
      key: i + 1,
      name: getBlogState[i].title,
      category: getBlogState[i].category,
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
      <h3 className="mb-4 title">Danh sách bài viết</h3>
      <div>
        <Table columns={columns} dataSource={dataTable} />
      </div>
    </div>
  );
};

export default BlogList;
