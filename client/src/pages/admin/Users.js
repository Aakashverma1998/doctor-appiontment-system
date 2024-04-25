import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import { Table } from "antd";

function Users() {
  const [users, setUsers] = useState([]);
  const getUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/admin/getAllUsers",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (err) {}
  };
  useEffect(() => {
    getUser();
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      render: (text, record) => (
        <div className="d-flex">
          <span>{record?.isDoctor ? "Yes" : "No"}</span>
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button className="btn btn-danger">Block</button>
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1 className="p-2 text-center">Users List</h1>
      <Table columns={columns} dataSource={users} />
    </Layout>
  );
}

export default Users;
