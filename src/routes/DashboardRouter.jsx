import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { NavBarA } from '../components/Navbar.js/Navbar';
import { Sidebar } from '../components/Sidebar/Sidebar';
import CreateUsers from '../container/create/CreateUsers';
import { Profile } from '../container/profile/ProfileInformation';
import Users from '../container/users/Users';


const DashboardRouter = ({route}) => {
  
  return (
    <div className="flex">
        <Sidebar/>
        <div className="content w-100 h-100">
          <NavBarA/>
          <Routes>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/create-users" element={<CreateUsers/>}/>
            <Route path="/edit-users" element={<Users/>}/>
            <Route
              path="*"
              element={<Navigate to="/dashboard/profile" />}
            /> 
          </Routes>
        </div>
      </div>
  )
}

export default DashboardRouter;