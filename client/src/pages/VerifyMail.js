import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function VerifyMail() {
  const {id} = useParams()
  const getUser = async()=>{
    try{
      const res = await axios.get(`/api/v1/user/userVerifyMail/${id}`, {id})
      console.log(res);
    }catch(err){

    }
        
  }
  useEffect(()=>{
    getUser()
    // eslint-disable-next-line
  },[])
  
  return (
    <h2 className='m-2 text-center'>User Email Verify Successfully.!</h2>
  )
}

export default VerifyMail