import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAnEnquiry,
  resetState,
  updateAnEnquiry,
} from "../features/enquiry/enquirySlice";

const ViewEnq = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getEnquiryId = location.pathname.split("/")[3];
  const enqState = useSelector((state) => state.enquiries);
  const { enqName, enqEmail, enqMobile, enqComment, enqStatus } = enqState;
  const [enqStatusDisplay, setEnqStatusDisplay] = useState("");
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    switch (enqStatus) {
      case "Submitted":
        setEnqStatusDisplay("Đã nhận");
        break;
      case "Contacted":
        setEnqStatusDisplay("Đã liên hệ");
        break;
      case "In progress":
        setEnqStatusDisplay("Đang xử lý");
        break;
      case "Resolved":
        setEnqStatusDisplay("Đã xử lý");
        break;
      default:
        break;
    }
  }, [enqStatus]);
  useEffect(() => {
    dispatch(getAnEnquiry(getEnquiryId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getEnquiryId]);

  /**
   * @param {string} [e] - e.target.value of select element.
   * @param {string} [i] - id of an enquiry.
   * @todo set status of an enquiry.
   */
  const setEnquiryStatus = (e, i) => {
    const data = { id: i, enqData: e };
    dispatch(updateAnEnquiry(data));
    dispatch(resetState());
    setTimeout(() => {
      dispatch(getAnEnquiry(getEnquiryId));
    }, 150);
  };
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <h3 className="mb-4 title">Chi tiết đánh giá/khiếu nại</h3>
        <button className="bg-transparent border-0  " onClick={goBack}>
          &larr; Quay lại
        </button>
      </div>
      <div className="mt-2 bg-white p-4 rounded-3">
        <div className="d-flex align-items-end gap-3">
          <h6 className="mb-0">Họ và tên:</h6>
          <p className="mb-0">{enqName}</p>
        </div>
      </div>
      <div className="d-flex gap-3">
        <div className="mt-2 ps-4 bg-white p-2 rounded-3">
          <div className="d-flex align-items-end gap-3">
            <h6 className="mb-0">Số điện thoại:</h6>
            <p className="mb-0">
              <a href={`tel:+84${enqMobile}`}>{enqMobile}</a>
            </p>
          </div>
        </div>
        <div className="mt-2 ps-4 bg-white p-2 rounded-3 flex-grow-1">
          <div className="d-flex align-items-end gap-3">
            <h6 className="mb-0">Email:</h6>
            <p className="mb-0">
              <a href={`mailto:${enqEmail}`}>{enqEmail}</a>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-2 bg-white p-4 rounded-3">
        <div className="d-flex align-items-end gap-3">
          <h6 className="mb-0">Comment:</h6>
          <p className="mb-0">{enqComment}</p>
        </div>
      </div>
      <div className="mt-2 bg-white p-4 rounded-3">
        <div className="d-flex align-items-end gap-3">
          <h6 className="mb-0">Trạng thái:</h6>
          <p className="mb-0">{enqStatusDisplay}</p>
        </div>
        <div className="d-flex align-items-end gap-3">
          <h6 className="mb-0">Thay đổi trạng thái:</h6>
          <div className="">
            <select
              name=""
              defaultValue={"default"}
              className="form-control form-select py-0 px-5"
              id=""
              onChange={(e) => setEnquiryStatus(e.target.value, getEnquiryId)}
            >
              <option value="default">Vui lòng chọn</option>
              <option value="Contacted">Đã liên hệ</option>
              <option value="In progress">Đang xử lý</option>
              <option value="Resolved">Đã xử lý</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEnq;
