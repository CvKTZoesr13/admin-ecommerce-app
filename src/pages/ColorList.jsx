import { Table } from "antd";
import React, { useEffect } from "react";
import { getColors } from "../features/color/colorSlice";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
const ColorList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getColors());
  }, [dispatch]);
  const colorState = useSelector((state) => state.colors.colors);
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
      title: "Tên màu",
      dataIndex: "name",
    },
    {
      title: "Tùy chỉnh",
      dataIndex: "action",
    },
  ];
  const dataTable = [];
  for (let i = 0; i < colorState.length; i++) {
    dataTable.push({
      key: i + 1,
      name: colorState[i].title,
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
      <h3 className="mb-4 title">Bảng màu</h3>
      <div>
        <Table columns={columns} dataSource={dataTable} />
      </div>
    </div>
  );
};

export default ColorList;
