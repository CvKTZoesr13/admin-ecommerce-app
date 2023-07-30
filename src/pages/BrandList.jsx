import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteABrand,
  getBrands,
  resetState,
} from "../features/brand/brandSlice";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import CustomModal from "../components/CustomModal";
const BrandList = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [brandId, setBrandId] = useState("");
  const showModal = (title, brandId) => {
    setIsModalOpen(true);
    setModalTitle(title);
    setBrandId(brandId);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);
  const brandState = useSelector((state) => state.brands.brands);
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
  for (let i = 0; i < brandState.length; i++) {
    dataTable.push({
      key: i + 1,
      name: brandState[i].title,
      action: (
        <>
          <Link
            onClick={() => dispatch(resetState())}
            to={`/admin/brand/${brandState[i]._id}`}
            className="fs-3 "
          >
            <BiEditAlt />
          </Link>
          <button
            className="fs-3 text-danger bg-transparent border-0"
            onClick={() => {
              return showModal(brandState[i].title, brandState[i]._id);
            }}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const handleDeleteBrand = (brandId) => {
    dispatch(deleteABrand(brandId));
    // dispatch(resetState());
    setTimeout(() => {
      dispatch(getBrands());
    }, 100);
    setIsModalOpen(false);
  };

  return (
    <div>
      <h3 className="mb-4 title">Danh sách thương hiệu</h3>
      <div>
        <Table columns={columns} dataSource={dataTable} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={isModalOpen}
        performAction={() => handleDeleteBrand(brandId)}
        title={`Xác nhận xóa thương hiệu ${modalTitle}? `}
      />
    </div>
  );
};

export default BrandList;
