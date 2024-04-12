import React from 'react'
import {Navigate} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import axios from "axios"
import { hideLoading, showLoading } from '../redux/features/alertSlice'
import { setUser } from '../redux/features/userSlice'
export default function ProtectedRoute({children}) {
  const dispatch = useDispatch()
  const {user} = useSelector(state=>state.user) 
  //getUser
  const getUser = async()=>{
    try{
      dispatch(showLoading)
      const res = await axios.post("http://localhost:8080/api/v1/user/getUser",
      {token:localStorage.getItem("token")},
      {headers:{
        Authorization : `Bearer ${localStorage.getItem("token")}`
      }}

    )
    dispatch(hideLoading)
    if(res.data.success){
      dispatch(setUser)
    }
    }catch(err){
      console.log(err);
      dispatch(hideLoading)
    }
  }
  if(localStorage.getItem("token")){
    return children
  }else{
    return <Navigate to="/login"/>
  }
}
