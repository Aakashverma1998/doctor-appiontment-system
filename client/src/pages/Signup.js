import React from "react";
import { Form, Input, message } from "antd";
import "../styles/SignupStyle.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/register",
        values
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("User Rgeister Successfully");
        navigate("/login");
      } else {
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
          <h1 className="title">Signup</h1>
          <Form.Item
            label="Name"
            name="name"
            required
            rules={[{ required: true }]}
          >
            <Input type="text" required />
          </Form.Item>
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
          <Form.Item
            label="Phone"
            name="phone"
            required
            rules={[{ required: true }]}
          >
            <Input type="number" required />
          </Form.Item>
          <button
            className="btn btn-primary"
            style={{ width: "280px" }}
            type="submit"
          >
            Signup
          </button>
          <div>
            <Link
              to={"/login"}
              className="p-4"
              style={{ lineHeight: "3.4em" }}
            >
              Already registered? Sign In
            </Link>
          </div>
        </Form>
      </div>
    </>
  );
}

export default Signup;
