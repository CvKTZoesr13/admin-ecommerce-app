import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteABlogCategory,
  getBlogCategories,
  resetState,
} from "../features/bcategory/bcategorySlice";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import CustomModal from "../components/CustomModal";
const BlogCatList = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [bCategoryId, setBCategoryId] = useState("");
  const showModal = (title, bCategoryId) => {
    setIsModalOpen(true);
    setModalTitle(title);
    setBCategoryId(bCategoryId);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
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
          <Link
            onClick={() => dispatch(resetState())}
            to={`/admin/blog-category/${bCategoriesState[i]._id}`}
            className="fs-3 "
          >
            <BiEditAlt />
          </Link>
          <button
            className="fs-3 text-danger bg-transparent border-0"
            onClick={() => {
              return showModal(
                bCategoriesState[i].title,
                bCategoriesState[i]._id
              );
            }}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const handleDeleteBlogCategory = (bCategoryId) => {
    dispatch(deleteABlogCategory(bCategoryId));
    // dispatch(resetState());
    setTimeout(() => {
      dispatch(getBlogCategories());
    }, 300);
    setIsModalOpen(false);
  };
  return (
    <div>
      <h3 className="mb-4 title">Danh mục bài viết</h3>
      <div>
        <Table columns={columns} dataSource={dataTable} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={isModalOpen}
        performAction={() => handleDeleteBlogCategory(bCategoryId)}
        title={`Xác nhận xóa danh mục bài viết ${modalTitle}? `}
      />
    </div>
  );
};

export default BlogCatList;
