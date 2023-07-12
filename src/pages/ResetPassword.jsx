import React from "react";
import CustomInput from "../components/CustomInput";
const ResetPassword = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <h3 className="text-center">Đặt lại mật khẩu</h3>
      <div className="my-5 w-35 rounded-3 mx-auto bg-white p-3">
        <p className="text-center">
          *Bạn nên đặt mật khẩu bao gồm chữ cái viết hoa, viết thường, số và kí
          tự đặc biệt.
        </p>
        <form action="">
          <CustomInput
            type="password"
            placeholder="Mật khẩu mới"
            id="password"
            name="password"
          />
          <CustomInput
            type="password"
            placeholder="Xác nhận mật khẩu mới"
            id="passwordConfirm"
            name="passwordConfirm"
          />
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100"
            type="submit"
            style={{ background: "#26891a" }}
          >
            Xác nhận
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
