import { Table } from "antd";
import React, { useEffect, useState } from "react";

import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
// import { BiEditAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAnEnquiry,
  getEnquiries,
  resetState,
  updateAnEnquiry,
} from "../features/enquiry/enquirySlice";
import CustomModal from "../components/CustomModal";
import { toast } from "react-toastify";
const Enquiries = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [enquiryId, setEnquiryId] = useState("");
  const showModal = (title, enquiryId) => {
    setIsModalOpen(true);
    setModalTitle(title);
    setEnquiryId(enquiryId);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getEnquiries());
  }, [dispatch]);
  const updatedAnEnquiry = useSelector((state) => state.enquiries);

  const { isSuccess, isLoading, isError, updatedEnquiry } = updatedAnEnquiry;
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
          {/* <select name="" id="" className="form-control form-select">
            <option value="Submitted">Đã nhận</option>
            <option value="In progress">Đang xử lý</option>
            <option value="Contacted">Đã liên hệ</option>
          </select> */}
          <select
            name=""
            defaultValue={
              enquiriesState[i].status ? enquiriesState[i].status : "Submitted"
            }
            className="form-control form-select py-0 px-5"
            id=""
            onChange={(e) =>
              setEnquiryStatus(e.target.value, enquiriesState[i]._id)
            }
          >
            <option value="Submitted">Đã nhận</option>
            <option value="Contacted">Đã liên hệ</option>
            <option value="In progress">Đang xử lý</option>
            <option value="Resolved">Đã xử lý</option>
          </select>
        </>
      ),
      action: (
        <>
          {/* Gửi email phản hồi với node-mail và cập nhật lại trạng thái */}
          {/* <Link className="fs-3 ">
            <BiEditAlt />
          </Link> */}
          <button
            className="fs-3 text-danger bg-transparent border-0"
            onClick={() => {
              return showModal(enquiriesState[i].name, enquiriesState[i]._id);
            }}
          >
            <AiFillDelete />
          </button>
          <Link
            className="fs-3 text-danger"
            to={`/admin/enquiries/${enquiriesState[i]._id}`}
          >
            <AiOutlineEye />
          </Link>
        </>
      ),
    });
  }
  let x = enquiriesState.filter((enq) =>
    enq._id === updatedEnquiry._id ? enq : ""
  );
  useEffect(() => {
    console.log(x);
    if (isSuccess && updatedEnquiry.status !== x.status) {
      toast("Cập nhật thành công!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(resetState());
      dispatch(getEnquiries());
    }
    if (isError) {
      toast("Có lỗi xảy ra!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [isSuccess, isLoading, isError, updatedEnquiry, x, dispatch]);

  /**
   * @param {string} [e] - e.target.value of select element.
   * @param {string} [i] - id of an enquiry.
   * @todo set status of an enquiry.
   */
  const setEnquiryStatus = (e, i) => {
    const data = { id: i, enqData: e };
    dispatch(updateAnEnquiry(data));
  };
  const handleDeleteEnq = (enquiryId) => {
    dispatch(deleteAnEnquiry(enquiryId));
    dispatch(resetState());
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 300);
    setIsModalOpen(false);
  };
  return (
    <div>
      <h3 className="mb-4 title">Đánh giá/khiếu nại gần đây</h3>
      <div>
        <Table columns={columns} dataSource={dataTable} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={isModalOpen}
        performAction={() => handleDeleteEnq(enquiryId)}
        title={`Xác nhận xóa đánh giá của ${modalTitle}? `}
      />
    </div>
  );
};

export default Enquiries;
