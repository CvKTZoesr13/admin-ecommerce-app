import { Table } from "antd";
import React, { useEffect } from "react";

import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersByUser } from "../features/auth/authSlice";
// import CurrencyVNDFormat from "../utils/CurrencyVNDFormat";
// import network_err from "../assets/static/img/network_err.jpg";
import { BiEdit } from "react-icons/bi";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const ViewOrders = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrdersByUser(userId));
  }, [dispatch, userId]);
  // something work incorrectly here, need to be fixed later
  const orderState = useSelector((state) => {
    if (Array.isArray(state.auth.ordersByUser))
      return state.auth?.ordersByUser[1].products;
  });
  console.log(orderState);
  const data1 = [];
  if (Array.isArray(orderState)) {
    for (let i = 0; i < orderState.length; i++) {
      data1.push({
        key: i + 1,
        name: orderState[i].product.title,
        brand: orderState[i].product.brand,
        count: orderState[i].count,
        amount: orderState[i].product.price,
        color: orderState[i].color,
        date: orderState[i].product.createdAt,
        action: (
          <>
            <Link to="/" className=" fs-3 text-danger">
              <BiEdit />
            </Link>
            <Link className="ms-3 fs-3 text-danger" to="/">
              <AiFillDelete />
            </Link>
          </>
        ),
      });
    }
  }
  return (
    <div>
      <h3 className="mb-4 title">Xem hóa đơn chi tiết</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <h3 className="mb-4 title">Xuất hóa đơn chi tiết</h3>
      <div className="mt-2 opacity-75 bg-white p-4 text-center rounded-3">
        <h5>Coming soon...</h5>
      </div>
      <div className="d-flex float-end gap-3">
        <button
          type="submit"
          className="btn btn-success border-0 rounded-3 mt-3"
        >
          PDF
        </button>
        <button
          type="submit"
          className="btn btn-success border-0 rounded-3 mt-3"
        >
          Excel
        </button>
      </div>
    </div>
  );
};

export default ViewOrders;
