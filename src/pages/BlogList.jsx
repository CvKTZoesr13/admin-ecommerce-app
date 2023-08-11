import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteABlog, getBlogs, resetState } from "../features/blogs/blogSlice";
import { Link } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../components/CustomModal";
const BlogList = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [blogId, setBlogId] = useState("");
  const showModal = (title, blogId) => {
    setIsModalOpen(true);
    setModalTitle(title);
    setBlogId(blogId);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
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
          <Link
            onClick={() => dispatch(resetState())}
            to={`/admin/blog/${getBlogState[i]._id}`}
            className="fs-3 "
          >
            <BiEditAlt />
          </Link>
          <button
            className="fs-3 text-danger bg-transparent border-0"
            onClick={() => {
              return showModal(getBlogState[i].title, getBlogState[i]._id);
            }}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const handleDeleteBlog = (blogId) => {
    dispatch(deleteABlog(blogId));
    dispatch(resetState());
    setTimeout(() => {
      dispatch(getBlogs());
    }, 400);
    setIsModalOpen(false);
  };
  return (
    <div>
      <h3 className="mb-4 title">Danh sách bài viết</h3>
      <div>
        <Table columns={columns} dataSource={dataTable} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={isModalOpen}
        performAction={() => handleDeleteBlog(blogId)}
        title={`Xác nhận xóa bài viết ${modalTitle}? `}
      />
    </div>
  );
};

export default BlogList;
