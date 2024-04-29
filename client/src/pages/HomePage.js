import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
// import { useNavigate } from "react-router-dom";
import { Row } from "antd";
import DoctorList from "../components/DoctorList";
const HomePage = () => {
  // const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const getUser = async () => {
    try {
      const res = await axios.get("/api/v1/user/allDoctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //login user data
  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <h1 className="p-2 text-center">All Doctors List</h1>
      <Row>
        {doctors && doctors.map((doctor) => <DoctorList doctor={doctor} />)}
      </Row>
    </Layout>
  );
};

export default HomePage;
