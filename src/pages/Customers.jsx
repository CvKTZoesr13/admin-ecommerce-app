import { Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/customers/customerSlice";

const Customers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const customerState = useSelector((state) => state.customers.customers);
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
      title: "Họ Tên",
      dataIndex: "name",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "Số điện thoại",
      dataIndex: "mobile",
    },
  ];
  const dataTable = [];
  let j = 0;
  for (let i = (j = 0); i < customerState.length; i++) {
    if (customerState[i].isAdmin !== "admin") {
      j++;
      dataTable.push({
        key: j,
        name: customerState[i].firstName + " " + customerState[i].lastName,
        email: customerState[i].email,
        mobile: customerState[i].mobile,
      });
    }
  }
  return (
    <div>
      <h3 className=" title mb-4">Danh sách khách hàng</h3>
      <div>
        <Table columns={columns} dataSource={dataTable} />
      </div>
    </div>
  );
};

export default Customers;
