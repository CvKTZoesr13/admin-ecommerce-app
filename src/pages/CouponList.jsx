import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import {
  deleteACoupon,
  getAllCoupon,
  resetState,
} from "../features/coupon/couponSlice";
import CustomModal from "../components/CustomModal";
const CouponList = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [couponId, setCouponId] = useState("");
  const showModal = (title, couponId) => {
    setIsModalOpen(true);
    setModalTitle(title);
    setCouponId(couponId);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    dispatch(resetState());
    dispatch(getAllCoupon());
  }, [dispatch]);
  const couponState = useSelector((state) => state.coupons.coupons);
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
      title: "Ngày hết hạn",
      dataIndex: "date",
    },
    {
      title: "Số lượng còn",
      dataIndex: "discount",
      sorter: (a, b) => a.discount - b.discount,
    },
    {
      title: "Tùy chỉnh",
      dataIndex: "action",
    },
  ];
  const dataTable = [];
  for (let i = 0; i < couponState.length; i++) {
    dataTable.push({
      key: i + 1,
      name: couponState[i].name,
      discount: couponState[i].discount,
      date: new Date(couponState[i].expiry).toLocaleString(),
      action: (
        <>
          <Link
            className="fs-3 "
            to={`/admin/coupon/${couponState[i]._id}`}
            onClick={() => dispatch(resetState())}
          >
            <BiEditAlt />
          </Link>
          <button
            className="fs-3 text-danger bg-transparent border-0"
            onClick={() => {
              return showModal(couponState[i].name, couponState[i]._id);
            }}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const handleDeleteCoupon = (colorId) => {
    dispatch(deleteACoupon(colorId));
    dispatch(resetState());
    setTimeout(() => {
      dispatch(getAllCoupon());
    }, 300);
    setIsModalOpen(false);
  };

  return (
    <div>
      <h3 className="mb-4 title">Danh sách phiếu mua hàng / phiếu giảm giá</h3>
      <div>
        <Table columns={columns} dataSource={dataTable} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={isModalOpen}
        performAction={() => handleDeleteCoupon(couponId)}
        title={`Xác nhận xóa mã phiếu ${modalTitle}? `}
      />
    </div>
  );
};

export default CouponList;
