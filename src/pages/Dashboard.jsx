import React from "react";
import { BsArrowUpRight, BsArrowDownRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";

const Dashboard = () => {
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
  const paletteSemanticRed = "#F4664A";
  const brandColor = "#5B8FF9";
  const data = [
    {
      type: "Jan",
      sales: 38,
    },
    {
      type: "Feb",
      sales: 52,
    },
    {
      type: "Mar",
      sales: 61,
    },
    {
      type: "Apr",
      sales: 145,
    },
    {
      type: "May",
      sales: 48,
    },
    {
      type: "Jun",
      sales: 15,
    },
    {
      type: "July",
      sales: 30,
    },
    {
      type: "Aug",
      sales: 23,
    },
    {
      type: "Sep",
      sales: 23,
    },
    {
      type: "Oct",
      sales: 23,
    },
    {
      type: "Nov",
      sales: 23,
    },
    {
      type: "Dec",
      sales: 23,
    },
  ];
  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      if (type === "Jun") {
        return paletteSemanticRed;
      }

      return brandColor;
    },
    label: {
      position: "middle",

      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Months",
      },
      sales: {
        alias: "Income",
      },
    },
  };
  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="sub-title">Total</p>{" "}
            <h4 className="mb-0 sub-title">$10000</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsArrowDownRight />
              32%
            </h6>
            <p className="mb-0 sub-title">So với tháng 5 năm 2023</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="sub-title">Total</p>{" "}
            <h4 className="mb-0 sub-title">$10000</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="green">
              <BsArrowUpRight />
              32%
            </h6>
            <p className="mb-0 sub-title">So với tháng 5 năm 2023</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="sub-title">Total</p>{" "}
            <h4 className="mb-0 sub-title">$10000</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsArrowDownRight />
              32%
            </h6>
            <p className="mb-0 sub-title">So với tháng 5 năm 2023</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        {/* Income statics */}
        <h3 className="mb-4 title">Thống kê thu nhập</h3>
        <div>
          <Column {...config} />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-4 title">Đơn hàng gần đây</h3>
        <div>
          <Table
            // rowSelection={{
            //   type: selectionType,
            //   ...rowSelection,
            // }}
            columns={columns}
            dataSource={dataTable}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
