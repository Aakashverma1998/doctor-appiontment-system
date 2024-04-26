import React from "react";
import { Form, Input, message } from "antd";
import "../styles/SignupStyle.css";
// import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/features/alertSlice";

function ForgetPaasword() {
  //   const navigate = useNavigate();
  const dispatch = useDispatch();
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/forgetPassword", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("ResetPassword Link Sent Your Mail.");
      } else {
        dispatch(hideLoading());
        message.error("User not Found");
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
          className="forgetPassword-form"
        >
          <h1 className="title">ForgetPassword</h1>
          <Form.Item
            label="Email"
            name="email"
            required
            rules={[{ required: true }]}
          >
            <Input type="email" required />
          </Form.Item>
          <button
            className="btn btn-primary"
            style={{ width: "482px" }}
            type="submit"
          >
            ResetPassword
          </button>
        </Form>
      </div>
    </>
  );
}

export default ForgetPaasword;
