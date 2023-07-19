import { Table } from "antd";
import React, { useEffect } from "react";

import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
// import { BiEditAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getEnquiries } from "../features/enquiry/enquirySlice";

const Enquiries = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEnquiries());
  }, [dispatch]);
  const enquiriesState = useSelector((state) => state.enquiries.enquiries);
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
      title: "Số điện thoại",
      dataIndex: "mobile",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    // {
    //   title: "Nội dung",
    //   dataIndex: "comment",
    // },
    {
      title: "Trạng thái",
      dataIndex: "status",
    },
    {
      title: "Tùy chỉnh",
      dataIndex: "action",
    },
  ];
  const dataTable = [];
  for (let i = 0; i < enquiriesState.length; i++) {
    dataTable.push({
      key: i + 1,
      name: enquiriesState[i].name,
      mobile: enquiriesState[i].mobile,
      email: enquiriesState[i].email,
      // comment: enquiriesState[i].comment,
      status: (
        <>
          <select name="" id="" className="form-control form-select">
            <option value="Submitted">Đã nhận</option>
            <option value="In progress">Đang xử lý</option>
            <option value="Contacted">Đã liên hệ</option>
          </select>
        </>
      ),
      action: (
        <>
          {/* Gửi email phản hồi với node-mail và cập nhật lại trạng thái */}
          {/* <Link className="fs-3 ">
            <BiEditAlt />
          </Link> */}
          <Link className="fs-3 text-danger">
            <AiFillDelete />
          </Link>
        </>
      ),
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
