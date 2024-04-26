import React from "react";
import { Form, Input, message } from "antd";
import "../styles/SignupStyle.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/features/alertSlice";

function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(`/api/v1/user/resetPassword/${id}`, values, {
        id,
      });
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("ResetPassword has been done.");
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
          <h1 className="title">ResetPassword</h1>
          <Form.Item
            label="Password"
            name="password"
            required
            rules={[{ required: true }]}
          >
            <Input type="password" required />
          </Form.Item>
          <Form.Item
            label="ConfirmPassword"
            name="confirmpassword"
            required
            rules={[{ required: true }]}
          >
            <Input type="password" required />
          </Form.Item>
          <button
            className="btn btn-primary"
            style={{ width: "280px" }}
            type="submit"
          >
            ResetPassword
          </button>
        </Form>
      </div>
    </>
  );
}

export default ResetPassword;
