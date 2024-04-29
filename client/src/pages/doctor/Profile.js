import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import axios from "axios";
import moment from "moment";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [doctor, setDoctor] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const handleFinish = async (values) => {
    try {
      let { ...time } = moment(values.timings);
      const res = await axios.post(
        "/api/v1/doctor/updateDoctor",
        {
          ...values,
          userId: id,
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
      if (res.data.success) {
        setDoctor(res.data.data);
        message.success(res.data.message);
        navigate("/");
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
    // eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <h1 className="p-2 text-center">Manage Profile</h1>
      {doctor && (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="m-2"
          initialValues={{
            ...doctor,
            timings: [
              moment(doctor.timings[0], "HH:mm"),
              moment(doctor.timings[1], "HH:mm"),
            ],
          }}
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
              Update
            </button>
          </div>
        </Form>
      )}
    </Layout>
  );
}

export default Profile;
