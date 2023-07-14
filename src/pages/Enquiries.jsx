import { Table } from "antd";
import React from "react";

const Enquiries = () => {
  const columns = [
    {
      title: "SNo",
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
      title: "Sản phẩm",
      dataIndex: "product",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
    },
  ];
  const dataTable = [];
  for (let i = 0; i < 46; i++) {
    dataTable.push({
      key: i,
      name: "John Brown " + i,
      product: 32,
      status: "New York No. 1 Lake Park",
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Đánh giá gần đây</h3>
      <div>
        <Table columns={columns} dataSource={dataTable} />
      </div>
    </div>
  );
};

export default Enquiries;
