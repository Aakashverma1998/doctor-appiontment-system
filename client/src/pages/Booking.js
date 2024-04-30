import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DatePicker, TimePicker } from "antd";
import moment from "moment";

function Booking() {
  const { id } = useParams();
  const [doctors, setDoctors] = useState();
  const [date, setDate] = useState();
  const [timings, setTimimgs] = useState();
  const [availablity, setAvailablity] = useState();
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
            <h4>Timings: {doctors.timings[0]} - {doctors.timings[1]}</h4>
            <div className="d-flex flex-column m-2 w-50" >
              <DatePicker className="m-2" format="DD-MM-YYYY" onChange={(value)=> moment(value).format("DD-MM-YYYY")}/>
              <TimePicker.RangePicker className="m-2" format="HH:mm" onChange={(values)=>setTimimgs([
                moment(values[0]).format("HH:mm"),
                moment(values[1]).format("HH:mm")
              ])}/>
              <button className="btn btn-primary mt-2">
                Check Availablity
              </button>
              <button className="btn btn-dark mt-2">
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
