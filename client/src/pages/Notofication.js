import React from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { Tabs, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";

function Notofication() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/doctor/get-all-notification",
        { _id: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.message) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      dispatch(hideLoading());
      message.error("something went worng.!");
    }
  };
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/doctor/delete-all-notification",
        { _id: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
      dispatch(hideLoading());
      message.error("something went worng");
    }
  };
  return (
    <Layout>
      <h4 className="p-2 text-center">Notification</h4>
      <Tabs>
        <Tabs.TabPane tab="unRead" key={0}>
          <div className="d-flex justify-content-end">
            <h4
              className="p-2"
              onClick={handleMarkAllRead}
              style={{ cursor: "pointer" }}
            >
              Mark All Read
            </h4>
          </div>
          {user?.notification.map((notificationMsg) => (
            <div
              className="card"
              onClick={notificationMsg.onClickPath}
              style={{ cursor: "pointer" }}
            >
              <div className="card-text">{notificationMsg.message}</div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key={1}>
          <div className="d-flex justify-content-end">
            <h4
              className="p-2"
              onClick={handleDeleteAllRead}
              style={{ cursor: "pointer" }}
            >
              Delete All Read
            </h4>
          </div>
          {user?.seennotification.map((notificationMsg) => (
            <div
              className="card"
              onClick={notificationMsg.onClickPath}
              style={{ cursor: "pointer" }}
            >
              <div className="card-text">{notificationMsg.message}</div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
}

export default Notofication;
