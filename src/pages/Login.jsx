import React from "react";
import CustomInput from "../components/CustomInput";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <h3 className="text-center">Đăng nhập</h3>
      <div className="my-5 w-35 rounded-3 mx-auto bg-white p-3">
        <p className="text-center">
          Đăng nhập để tiếp tục công việc với quyền quản trị hệ thống.
        </p>
        <form action="">
          <CustomInput
            type="text"
            placeholder="Email"
            id="email"
            name="email"
          />
          <CustomInput
            type="password"
            placeholder="Password"
            id="password"
            name="password"
          />
          <div className="mb-3 text-end ">
            <Link to={"/forgot-password"}>Quên mật khẩu?</Link>
          </div>
          <Link
            to={"/admin"}
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            type="submit"
            style={{ background: "#26891a" }}
          >
            Đăng nhập
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
