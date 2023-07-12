import React from "react";
import CustomInput from "../components/CustomInput";
const ForgotPassword = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <h3 className="text-center">Quên mật khẩu</h3>
      <div className="my-5 w-35 rounded-3 mx-auto bg-white p-3">
        <p className="text-center">Vui lòng nhập email để đặt lại mật khẩu.</p>
        <form action="">
          <CustomInput
            type="text"
            placeholder="Email"
            id="email"
            name="email"
          />
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100"
            type="submit"
            style={{ background: "#26891a" }}
          >
            Đặt lại mật khẩu
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
