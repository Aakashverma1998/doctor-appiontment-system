import React from 'react'
import Layout from "../components/Layout"
import { Col, Form, Row } from 'antd'

function ApplyDoctor() {
    const handleFinish = async(values)=>{
        console.log(values);
    }
  return (
    <Layout>
        <h1 className='text-center'>Apply Doctor</h1>
        <Form layout='vertical' onFinish={handleFinish}>
            <Row>
                <Col xs={24} md={24}>
                </Col>
            </Row>
        </Form>
    </Layout>

  )
}

export default ApplyDoctor