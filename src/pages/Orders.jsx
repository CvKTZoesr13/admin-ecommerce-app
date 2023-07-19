import { Table, Tag } from "antd";
import React, { useEffect } from "react";

import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/auth/authSlice";
import CurrencyVNDFormat from "../utils/CurrencyVNDFormat";
import network_err from "../assets/static/img/network_err.jpg";
const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  const orderState = useSelector((state) => state.auth.orders);
  const { isLoading, isSuccess } = useSelector((state) => state.auth);
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
      width: 200,
    },
    {
      title: "Thông tin liên hệ",
      dataIndex: "info",
      children: [
        {
          title: "Email",
          dataIndex: "email",
          width: 200,
          ellipsis: true,
        },
        {
          title: "SĐT",
          dataIndex: "mobile",
          width: 100,
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
          width: 120,
          dataIndex: "productTag",
          render: (tags) => (
            <span>
              {tags.map((tag) => {
                let color = tag.length > 7 ? "geekblue" : "green";
                if (tag === "Old") {
                  color = "volcano";
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </span>
          ),
        },
        // {
        //   title: "Màu sắc",
        //   dataIndex: "productColor",
        //   width: 180,
        // },
        {
          title: "Số lượng",
          dataIndex: "count",
          width: 80,
        },
        {
          title: "Thành tiền",
          dataIndex: "amount",
          width: 120,
        },
        {
          title: "Ngày đặt hàng",
          dataIndex: "date",
          width: 220,
        },
        {
          title: "Trạng thái",
          dataIndex: "orderStatus",
          width: 140,
          render: (status) => {
            let orderStatus = "";
            switch (status) {
              case "Cash on delivery":
                orderStatus = "Thanh toán khi nhận hàng";
                break;
              case "Not processed":
                orderStatus = "Chưa xử lý";
                break;
              case "Processing":
                orderStatus = "Đang xử lý";
                break;
              case "Dispatched":
                orderStatus = "Đang giao hàng";
                break;
              case "Cancelled":
                orderStatus = "Đã hủy";
                break;
              case "Delivered":
                orderStatus = "Đã giao";
                break;

              default:
                break;
            }
            return <span className="text-info">{orderStatus}</span>;
          },
        },
      ],
    },
    {
      title: "Tùy chỉnh",
      dataIndex: "action",
      fixed: "right",
      width: 80,
    },
  ];
  const dataTable = [];
  let lengthOfOrderState = orderState.length;
  for (let i = 0; i < lengthOfOrderState; i++) {
    let productsTag = ["tested"];
    for (let j = 0; j < orderState[i].products.length; j++) {
      productsTag.push(...new Set(orderState[i].products[j].product.tags));
    }
    dataTable.push({
      key: i + 1,
      name:
        orderState[i].orderby.firstName + " " + orderState[i].orderby.lastName,
      mobile: orderState[i].orderby.mobile,
      email: orderState[i].orderby.email,
      productTitle: (
        <ul className="list-unstyled mb-0">
          {orderState[i].products.map((productObj, index) => {
            return <li key={index}>{productObj.product.title}</li>;
          })}
        </ul>
      ),
      count: (
        <ul className="list-unstyled mb-0">
          {orderState[i].products.map((productObj, index) => {
            return <li key={index}>{productObj.count}</li>;
          })}
        </ul>
      ),
      productTag: [...new Set(productsTag)],

      amount: orderState[i].paymentIntent.amount ? (
        <CurrencyVNDFormat value={orderState[i].paymentIntent.amount} />
      ) : (
        "Chưa cập nhật"
      ),
      date: new Date(orderState[i].createdAt).toLocaleString(),
      orderStatus: orderState[i].paymentIntent.status,
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
        {isLoading ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : isSuccess ? (
          <Table
            bordered
            columns={columns}
            dataSource={dataTable}
            scroll={{
              y: 500,
              x: 1300,
            }}
          />
        ) : (
          <img
            className="img-fluid rounded-3"
            src={network_err}
            alt="network_disconnect"
          />
        )}
      </div>
    </div>
  );
};

export default Orders;
