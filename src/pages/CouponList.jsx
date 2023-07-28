import { Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { getAllCoupon } from "../features/coupon/couponSlice";
const CouponList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
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
      <h3 className="mb-4 title">Danh sách phiếu mua hàng / phiếu giảm giá</h3>
      <div>
        <Table columns={columns} dataSource={dataTable} />
      </div>
    </div>
  );
};

export default CouponList;
