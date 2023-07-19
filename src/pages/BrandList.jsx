import { Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
const BrandList = () => {
  const dispatch = useDispatch();
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
      <h3 className="mb-4 title">Danh sách thương hiệu</h3>
      <div>
        <Table columns={columns} dataSource={dataTable} />
      </div>
    </div>
  );
};

export default BrandList;
