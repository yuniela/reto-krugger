import React from 'react'
import UserList from '../../components/UsersData/UsersActions';
import "./Users.css"
const Users = () => {


  
  return (
    <div className='users-table'>
      <h1 className='users-tittle'>Listado de usuarios registrados</h1>
     <UserList/>
    </div>
  )
}

export default Users
