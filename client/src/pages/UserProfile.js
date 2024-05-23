import React from "react";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";

function UserProfile() {
  const {user} = useSelector(state => state.user)
  return (
    <Layout>
        <h1 className="m-2 text-center">UserProfile</h1>
        {
          user && (
            <div className="m-4 card text-center" style={{width:"1000px"}}>
            <div className="card-header">
              UserId : {user._id}
            </div>
            <div className="card-body">
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>createAt: {user.createdAt}</p>
            </div>
            
          </div>
          )
        }
    </Layout>
  ) 
}

export default UserProfile;
