import React from 'react'
import "../styles/LayoutStyle.css"
import {Link, useLocation} from "react-router-dom"
import { sidebarMenu } from '../Data/data'
import {useSelector} from "react-redux"
const Layout = ({children}) => {
    const {user} = useSelector(state => state.user)
    const location = useLocation()
  return (
   <>
   <div className='main'>
        <div className='layout'>
            <div className='sidebar'>
                <div className='logo'>
                    <h6>Doc-App</h6>
                    <hr/>
                </div>
                <div className='menu'>{sidebarMenu.map(menue =>{
                    const isActive = location.pathname === menue.path
                    return (
                        <>
                        <div className={`menu-item ${isActive && 'active'}`}>
                            <i className={menue.icon}></i>
                            <Link to={menue.path}>{menue.name}</Link>
                        </div>
                        </>
                    )
                })}</div>
            </div>
            <div className='content'>
                <div className='header'>{user?.name}</div>
                <div className='body'>{children}</div>
            </div>
        </div>
   </div>
   </>
  )
}

export default Layout