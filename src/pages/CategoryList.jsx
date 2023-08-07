import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAProductCategory,
  getProductCategories,
  resetState,
} from "../features/pcategory/pcategorySlice";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import CustomModal from "../components/CustomModal";
const CategoryList = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [prodCategoryId, setProdCategoryId] = useState("");
  const showModal = (title, prodCategoryId) => {
    setIsModalOpen(true);
    setModalTitle(title);
    setProdCategoryId(prodCategoryId);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    dispatch(resetState());
    dispatch(getProductCategories());
  }, [dispatch]);
  const pCategoriesState = useSelector(
    (state) => state.pCategories.pCategories
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
      title: "Tên",
      dataIndex: "name",
    },
    {
      title: "Tùy chỉnh",
      dataIndex: "action",
    },
  ];
  const dataTable = [];
  for (let i = 0; i < pCategoriesState.length; i++) {
    dataTable.push({
      key: i + 1,
      name: pCategoriesState[i].title,
      action: (
        <>
          <Link
            onClick={() => dispatch(resetState())}
            to={`/admin/category/${pCategoriesState[i]._id}`}
            className="fs-3 "
          >
            <BiEditAlt />
          </Link>
          <button
            className="fs-3 text-danger bg-transparent border-0"
            onClick={() => {
              return showModal(
                pCategoriesState[i].title,
                pCategoriesState[i]._id
              );
            }}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const handleDeleteProdCategory = (prodCategoryId) => {
    dispatch(deleteAProductCategory(prodCategoryId));
    // dispatch(resetState());
    setTimeout(() => {
      dispatch(getProductCategories());
    }, 300);
    setIsModalOpen(false);
  };
  return (
    <div>
      <h3 className="mb-4 title">Danh sách danh mục</h3>
      <div>
        <Table columns={columns} dataSource={dataTable} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={isModalOpen}
        performAction={() => handleDeleteProdCategory(prodCategoryId)}
        title={`Xác nhận xóa danh mục ${modalTitle}? `}
      />
    </div>
  );
};

export default CategoryList;
