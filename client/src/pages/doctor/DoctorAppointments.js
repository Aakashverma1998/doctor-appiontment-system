import Layout from "../../components/Layout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, message } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";

function DoctorAppointments() {
  const { user } = useSelector((state) => state.user);
  const [list, setList] = useState([]);
  const getAppointments = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/doctor-appointments",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setList(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/update-status",
        { appointmentId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getAppointments();
      }
    } catch (err) {
      message.error("something went worng");
    }
  };
  useEffect(() => {
    getAppointments();
  }, []);
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Patient Name",
      dataIndex: "name",
      render : (text, record)=>{
        return <span>{record.userId.name}</span>
      }
    },
    {
      title: "Patient Phone",
      dataIndex: "phone",
      render : (text, record)=>{
        return <span>{record.userId.phone}</span>
      }
    },
    {
      title: "Date & Time",
      dataIndex: "time",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} &nbsp;
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div className="d-flex">
              <button
                className="btn btn-success m-2"
                onClick={() => handleStatus(record, "approved")}
              >
                Approved
              </button>
              <button
                className="btn btn-danger m-2"
                onClick={() => handleStatus(record, "reject")}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1 className="m-2 text-center">Appointments List</h1>
      <Table columns={columns} dataSource={list}></Table>
    </Layout>
  );
}

export default DoctorAppointments;
