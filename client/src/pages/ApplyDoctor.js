import React from 'react'
import Layout from "../components/Layout"
import { Col, Form, Input, Row } from 'antd'

function ApplyDoctor() {
    const handleFinish = async(values)=>{
        console.log(values);
    }
  return (
    <Layout>
        <h1 className='text-center'>Apply Doctor</h1>
        <Form layout='vertical' onFinish={handleFinish} className='m-2'>
        <h6 className='text-dark'>Personal Details:</h6>
            <Row gutter={20}>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="firstName" required>
                        <Input type='text'  placeholder='Enter firstName'></Input>
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                <Form.Item label="lastName" required>
                        <Input type='text'  placeholder='Enter lastName'></Input>
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="email" required>
                        <Input type='email'  placeholder='Enter email'></Input>
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="phone" required>
                        <Input type='text'  placeholder='Enter phone'></Input>
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="specialization" required>
                        <Input type='text'  placeholder='Enter specialization'></Input>
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="experience" required>
                        <Input type='text'  placeholder='Enter experience'></Input>
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="feesPerCunsaltation" required>
                        <Input type='text'  placeholder='Enter feesPerCunsaltation'></Input>
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="firstName" required>
                        <Input type='text'  placeholder='Enter firstName'></Input>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </Layout>

  )
}

export default ApplyDoctor