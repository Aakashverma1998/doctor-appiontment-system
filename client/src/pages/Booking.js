import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DatePicker, TimePicker, message } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";

function Booking() {
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const [doctors, setDoctors] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  // const [availablity, setAvailablity] = useState();
  const getUser = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleBooking = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: id,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: user,
          date: date,
          time: time,
        },
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
      message.error("something went worng.");
    }
  };
  //login user data
  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <h1 className="m-2 text-center">Booking Page</h1>
      <div className="container m-2">
        {doctors && (
          <div>
            <h4>
              Dr. {doctors.firstName} {doctors.lastName}
            </h4>
            <h4>Fees: {doctors.feesPerCunsaltation}</h4>
            <h4>
              Timings: {doctors.timings[0]} - {doctors.timings[1]}
            </h4>
            <div className="d-flex flex-column m-2 w-50">
              <DatePicker
                className="m-2"
                format="DD-MM-YYYY"
                onChange={(value) =>
                  setDate(moment(value).format("DD-MM-YYYY"))
                }
              />
              <TimePicker
                className="m-2"
                format="HH:mm"
                onChange={(values) => setTime(moment(values).format("HH:mm"))}
              />
              <button className="btn btn-primary mt-2">
                Check Availablity
              </button>
              <button className="btn btn-dark mt-2" onClick={handleBooking}>
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Booking;
