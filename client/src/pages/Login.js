import React from "react";
import { Form, Input, message } from "antd";
import "../styles/SignupStyle.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/login",
        values
      );
      dispatch(hideLoading());
      if (res.data.success) {
        window.location.reload();
        localStorage.setItem("token", res.data.token);
        navigate("/");
        return message.success("User Login Successfully.");
      }else {
        dispatch(hideLoading());
        message.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      message.error("something went worng.");
    }
  };
  return (
    <>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form"
        >
          <h1 className="title">Login</h1>
          <Form.Item
            label="Email"
            name="email"
            required
            rules={[{ required: true }]}
          >
            <Input type="email" required />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            required
            rules={[{ required: true }]}
          >
            <Input type="password" required />
          </Form.Item>
          <Link to={"/api/v1/user/forgetPassword"} className="ml-10">
            Forgot Password?
          </Link>
          <button
            className="btn btn-primary"
            style={{ width: "280px" }}
            type="submit"
          >
            Login
          </button>
          <div>
            <Link
              to={"/signup"}
              className="p-4"
              style={{ lineHeight: "3.4em" }}
            >
              Not registered? Create an account
            </Link>
          </div>
        </Form>
      </div>
    </>
  );
}

export default Login;
