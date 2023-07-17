import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let schema = Yup.object().shape({
    email: Yup.string()
      .email("Vui lòng nhập đúng định dạng email.")
      .required("Vui lòng nhập email."),
    password: Yup.string().required("Vui lòng nhập mật khẩu."),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
      alert(JSON.stringify(values, null, 2));
    },
  });

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (!user == null || isSuccess) {
      navigate("admin");
    } else {
      navigate("");
    }
  }, [user, isLoading, isError, isSuccess, message, navigate]);
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
        {message.error.response.status === 500 ? (
          <div
            className="text-center alert text-danger alert-danger"
            role="alert"
          >
            {isError ? "Thông tin đăng nhập không đúng. Vui lòng thử lại." : ""}
          </div>
        ) : (
          <div></div>
        )}

        {message.error.response.status === 403 ? (
          <div
            className="text-center alert text-danger alert-danger"
            role="alert"
          >
            Tài khoản này không có quyền truy cập. Vui lòng thử lại.
          </div>
        ) : (
          <div></div>
        )}
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            placeholder="Email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="red" role="alert">
              {formik.errors.email}
            </div>
          ) : null}
          <CustomInput
            type="password"
            placeholder="Password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange("password")}
            name="password"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="red alert-danger" role="alert">
              {formik.errors.password}
            </div>
          ) : null}
          <div className="mb-3 text-end ">
            <Link to={"/forgot-password"}>Quên mật khẩu?</Link>
          </div>
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            type="submit"
            style={{ background: "#26891a" }}
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
