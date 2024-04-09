import React from 'react'
import { Form, Input, message } from "antd"
import "../styles/SignupStyle.css"
import axios from "axios"
import {Link, useNavigate} from "react-router-dom"
function Signup() {
    const navigate = useNavigate()
    const onfinishHandler = async(values) =>{
        try{
            const res = await axios.post("http://localhost:8080/api/v1/user/register",values)
            if(res.data.success){
                message.success("User Rgeister Successfully")
                navigate("/login")

            }else{
                message.error(res.data.message)
            }

        }catch(err){
            console.log(err);
            message.error("something went worng.")
        }
    }
  return (
    <>
    <div className='form-container'>
        <Form layout='vertical' onFinish={onfinishHandler} className='register-form'>
        <h1 className='title'>Signup Form</h1>
        <Form.Item label = "Name" name="name">
            <Input type='text' required/>
        </Form.Item>
        <Form.Item label = "Email" name="email">
            <Input type='email' required/>
        </Form.Item>
        <Form.Item label = "Password" name="password">
            <Input type='password' required/>
        </Form.Item>
        <Form.Item label = "Phone" name="phone">
            <Input type='number' required/>
        </Form.Item>
        <Link to={"/login"} className='p-2'>Already user login here</Link>
        <button className='btn btn-primary' type="submit">Signup</button>
        </Form>
    </div>
    </>
  )
}

export default Signup