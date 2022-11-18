import { NavLink } from "react-router-dom"
import "./Sidebar.css"
import * as FaIcons from "react-icons/fa"
import { useSelector } from "react-redux"
export const Sidebar = () => {

    const role = useSelector(state => state.auth.role)
    return (
        <div className="sidebar">
            <ul>
                <li>
                    REGISTRO DE USUARIOS
                </li>
                <li>
                    <NavLink 
                        to="/dashboard/profile" 
                        exact = "true" 
                        className="rounded py-2 w-100 d-inline-block"
                        activeclassname="active"
                        ><FaIcons.FaUserCog className="me-2"/>Información personal</NavLink>
                </li>
                {
                    (role === "ADMIN")
                    ? <li>
                        <NavLink to="/dashboard/create-users" className="rounded py-2 w-100 d-inline-block"><FaIcons.FaUsers className="me-2"/>Crear usuarios</NavLink>
                     </li>
                    :
                    <></>
                }
                <li>
                    <NavLink to="/dashboard/edit-users" className="rounded py-2 w-100 d-inline-block"><FaIcons.FaUsers className="me-2"/>Editar usuarios</NavLink>
                </li>
            </ul>
        </div>
    )
}