import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";

function Appointments() {
  const { user } = useSelector((state) => state.user);
  const [list, setList] = useState([]);
  const getAppointments = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/user-appointments",
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
  useEffect(() => {
    getAppointments();
  }, []);
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Date & Time",
      dataIndex: "time",
      render: (text, record) => {
        <span>
          {moment(record.date).format("DD-MM-YYYY")}
          {moment(record.time).format("HH:mm")}
        </span>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];
  return (
    <Layout>
      <h1 className="m-2 text-center">Appointments List</h1>
      <Table columns={columns} dataSource={list}></Table>
    </Layout>
  );
}

export default Appointments;
