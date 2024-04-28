import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Col, Form, Input, Row, message } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";

function Profile() {
  const [doctor, setDoctor] = useState();
  const { id } = useParams();
  const handleFinish = async (values) => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/updateDoctor",
        { ...values, userId: id },

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (err) {
      message.error("Something went worng.!");
    }
  };
  const doctorData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/get-doc-info",
        { _id: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (err) {
      message.error("Something went worng.!");
    }
  };
  useEffect(() => {
    doctorData();
  }, []);
  return (
    <Layout>
      <h1 className="p-2 text-center">Manage Profile</h1>
      {doctor && (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="m-2"
          initialValues={doctor}
        >
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
            {/* <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Timings"
                name="timings"
                required
                rules={[{ required: true }]}
              >
                <TimePicker.RangePicker format="HH:MM" />
              </Form.Item>
            </Col> */}
          </Row>
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </Form>
      )}
    </Layout>
  );
}

export default Profile;
