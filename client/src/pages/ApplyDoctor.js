import React from "react";
import axios from "axios";
import Layout from "../components/Layout";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import { useNavigate } from "react-router-dom";

function ApplyDoctor() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleFinish = async (values) => {
    try {
      let { ...time } = moment(values.timings);
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/doctor/doctorRegister",
        {
          ...values,
          userId: user._id,
          timings: [
            moment(time._i[0].$d).format("HH:mm"),
            moment(time._i[1].$d).format("HH:mm"),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.msg);
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      dispatch(hideLoading());
      message.error("Something went worng!");
    }
  };
  return (
    <Layout>
      <h1 className="text-center">Apply Doctor</h1>
      <Form layout="vertical" onFinish={handleFinish} className="m-2">
        <h6 className="text-dark">Personal Details:</h6>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="FirstName"
              name="firstName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Enter firstName" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="LastName"
              name="lastName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Enter lastName" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Email"
              name="email"
              required
              rules={[{ required: true }]}
            >
              <Input type="email" placeholder="Enter email" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Phone"
              name="phone"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Enter phone" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Website"
              name="website"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Enter website" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Address"
              name="address"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Enter address" />
            </Form.Item>
          </Col>
        </Row>
        <h6 className="text-dark">Professional Details:</h6>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Specialization"
              name="specialization"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Enter specialization" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Experience"
              name="experience"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Enter experience" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="FeesPerCunsaltation"
              name="feesPerCunsaltation"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Enter feesPerCunsaltation" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Timings"
              name="timings"
              required
              rules={[{ required: true }]}
            >
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>
        </Row>
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </Form>
    </Layout>
  );
}

export default ApplyDoctor;
