import { Table } from "antd";
import React, { useEffect, useState } from "react";
import {
  deleteAColor,
  getColors,
  resetState,
} from "../features/color/colorSlice";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../components/CustomModal";
const ColorList = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [colorId, setColorId] = useState("");
  const showModal = (title, colorId) => {
    setIsModalOpen(true);
    setModalTitle(title);
    setColorId(colorId);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    dispatch(resetState());
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
          <Link
            onClick={() => dispatch(resetState())}
            to={`/admin/color/${colorState[i]._id}`}
            className="fs-3 "
          >
            <BiEditAlt />
          </Link>
          <button
            className="fs-3 text-danger bg-transparent border-0"
            onClick={() => {
              return showModal(colorState[i].title, colorState[i]._id);
            }}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const handleDeleteColor = (colorId) => {
    dispatch(deleteAColor(colorId));
    // dispatch(resetState());
    setTimeout(() => {
      dispatch(getColors());
    }, 300);
    setIsModalOpen(false);
  };
  return (
    <div>
      <h3 className="mb-4 title">Bảng màu</h3>
      <div>
        <Table columns={columns} dataSource={dataTable} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={isModalOpen}
        performAction={() => handleDeleteColor(colorId)}
        title={`Xác nhận xóa màu ${modalTitle}? `}
      />
    </div>
  );
};

export default ColorList;
