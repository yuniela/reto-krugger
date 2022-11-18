import React, {useState} from 'react';
import * as FaIcons from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, 
  Col} from 'reactstrap';
import { logoutSesion } from '../../actions/auth';
import "./Navbar.css"

export const NavBarA = () => {

  const [ isOpen, setIsOpen ] =  useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggle = () => setIsOpen(!isOpen);
  const name = useSelector( state => state.auth.name );  
  const onLogout = () => {
    dispatch(logoutSesion)
    navigate("/")
  }
    return (
      <div>
        <Navbar color="light" light expand="md" className="navbar">
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ms-auto" navbar>  
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {name}
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem >
                    <div onClick={onLogout}>
                      <FaIcons.FaSignOutAlt onClick={onLogout} className="me-2"/>Salir
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
}