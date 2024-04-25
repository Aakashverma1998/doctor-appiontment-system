import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import { message } from "antd";
import { Table } from "antd";

function Doctor() {
  const [doctors, setdoctors] = useState([]);
  const getUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/admin/getAllDoctors",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setdoctors(res.data.data);
      }
    } catch (err) {
      message.error("something went worng");
    }
  };
  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/admin/changeAccountStatus",
        { doctorId: record._id, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (err) {
      message.error("something went worng");
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const columns = [
    {
      title: "name",
      dataIndex: "Name",
      render: (text, reocrd) => (
        <span>{reocrd.firstName + " " + reocrd.lastName}</span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "specialization",
      dataIndex: "specialization",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button
              className="btn btn-success"
              onClick={() => handleAccountStatus(record, "approved")}
            >
              Approve
            </button>
          ) : (
            <button className="btn btn-danger">Reject</button>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1 className="p-2 text-center">Doctors</h1>
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  );
}

export default Doctor;
