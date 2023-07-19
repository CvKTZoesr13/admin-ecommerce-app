import { Table } from "antd";
import React, { useEffect } from "react";

import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/auth/authSlice";
const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  const orderState = useSelector((state) => state.auth.orders);
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      render: (text) => (
        <a href="#!" className="text-decoration-none text-dark">
          {text}
        </a>
      ),
      width: 80,
    },
    {
      title: "Họ tên",
      dataIndex: "name",
    },
    {
      title: "Thông tin liên hệ",
      dataIndex: "info",
      children: [
        {
          title: "Email",
          dataIndex: "email",
          width: 180,
        },
        {
          title: "SĐT",
          dataIndex: "mobile",
          width: 150,
        },
      ],
    },
    {
      title: "Hàng đặt",
      dataIndex: "products",
      children: [
        {
          title: "Tên sản phẩm",
          dataIndex: "productTitle",
          width: 200,
        },
        {
          title: "Tag",
          dataIndex: "productTag",
        },
        {
          title: "Màu sắc",
          dataIndex: "productColor",
          width: 180,
        },
        {
          title: "Số lượng",
          dataIndex: "quantity",
          width: 80,
        },
        {
          title: "Thành tiền",
          dataIndex: "purchase",
        },
        {
          title: "Trạng thái",
          dataIndex: "orderStatus",
        },
      ],
    },
    {
      title: "Tùy chỉnh",
      dataIndex: "action",
      fixed: "right",
    },
  ];
  const dataTable = [];
  for (let i = 0; i < orderState.length; i++) {
    dataTable.push({
      key: i + 1,
      name:
        orderState[i].orderby.firstName + " " + orderState[i].orderby.lastName,
      mobile: orderState[i].orderby.mobile,
      email: orderState[i].orderby.email,

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
      <h3 className="mb-4 title">Đơn hàng</h3>
      <div>
        <Table
          bordered
          columns={columns}
          dataSource={dataTable}
          scroll={{
            y: 240,
            x: 1300,
          }}
        />
      </div>
    </div>
  );
};

export default Orders;
