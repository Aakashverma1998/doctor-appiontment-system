import React from 'react'
import Layout from '../components/Layout'
import { Tabs } from 'antd'
import { useSelector} from "react-redux";

function Notofication() {
    const {user} = useSelector(state=>state.user)
    const handleMarkAllRead = async()=>{

    }
    const handleDeleteAllRead = async()=>{

    }
  return (
    <Layout>
        <h4 className='p-2 text-center'>Notofication</h4>
        <Tabs>
            <Tabs.TabPane tab="unRead" key={0}>
                <div className='d-flex justify-content-end'>
                <h4 className='p-2' onClick={handleMarkAllRead}>
                    Mark All Read
                </h4>
                </div>
             
            </Tabs.TabPane>
            <Tabs.TabPane tab="Read" key={1}>
                <div className='d-flex justify-content-end'>
                <h4 className='p-2' onClick={handleDeleteAllRead}>
                    Delete All Read
                </h4>
                </div>
             
            </Tabs.TabPane>
        </Tabs>
    </Layout>
  )
}

export default Notofication