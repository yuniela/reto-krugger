import React, { useState } from 'react'
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
// import store from '../redux/store';
// import { Provider } from 'react-redux';
import DashboardRouter from './DashboardRouter';
import Login from '../container/login/Login';
import { useSelector } from 'react-redux';

const AppRouter = () => {
  const path = window.location.href;
  const [route] = useState(path);
  const auth = useSelector(state => state.auth.uid);
  return (
      <BrowserRouter>      
          <Routes>
              <Route path="/*" element={ <Login />} />
              <Route path="/dashboard/*" element={ <DashboardRouter route={route} />} />
          </Routes>
      </BrowserRouter>
  )
}

export default AppRouter