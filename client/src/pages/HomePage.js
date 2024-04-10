import React,{useEffect} from 'react'
import axios from "axios"
const HomePage = () => {
  const getUser = async() =>{
    try{
      await axios.post("http://localhost:8080/api/v1/user/getUser",{},{
        headers:{
          Authorization:"Bearer " + localStorage.getItem("token")
        }
      })
    }catch(error){
      console.log(error);
    }
  }
  //login user data
  useEffect(()=>{
    getUser()
  },[])
  return (
    <div>HomePage</div>
  )
}

export default HomePage