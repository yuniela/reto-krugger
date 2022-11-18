import 'react-datepicker/dist/react-datepicker.css'
import React from 'react';
import { Button, Col, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import "../information/InfoForm.css"
import { startUserRegister } from "../../actions/users";
import { useDispatch, useSelector } from "react-redux";
import { removeError, setError } from "../../actions/ui";
import { is_letters, is_numbers } from "../../helpers/validator";
import validator from 'validator';
import { useForm } from "../../hooks/useForm";

export const UsersForm = () => {
    const dispatch = useDispatch();
    const [ formValues, handleInputChange ] = useForm({
        ci: 0,
        name: "",
        lastName:"",
        email: "",
    });
    
    const { msgError } = useSelector( state => state.ui );


    const handleSubmit = (e) => {
        e.preventDefault();
        if(isFormValid(formValues))
        dispatch( startUserRegister(formValues) );
    }

    const isFormValid = (registerForm) => {
        if ( registerForm.ci.length <10 && is_numbers(registerForm.ci)) {
            dispatch( setError('El número de cédula debe contener 10 dígitos') )
            return false;
        } else if ( registerForm.name.trim().length === 0 && is_letters(registerForm.name) ) {
            dispatch( setError('El nombre debe ser válido') )
            return false;
        } else if ( registerForm.lastName.trim().length === 0 && is_letters(registerForm.lastName) ) {
            dispatch( setError('El apellido debe ser válido') )
            return false;
        } else if ( !validator.isEmail( registerForm.email ) ) {
            dispatch( setError('Email no es válido') )
            return false;
        }
        dispatch( removeError() );
       return true;
    }

   

    return (
        <div className="profile-form">
            {
                    msgError &&
                    (
                        <div className="alert-error">
                            { msgError }
                        </div>
                    )
                } 
            <Form onSubmit={handleSubmit}  >
            <FormGroup row className="mb-1">
                <Label for="exampleEmail" sm={4}>Cédula:</Label>
                <Col sm={8}>
                <Input type="text" name="ci" id="exampleText" valid 
                    onChange = {handleInputChange}
                />
                <FormFeedback>Ingresa un número de cédula válido</FormFeedback>
                </Col>
            </FormGroup>
            <FormGroup row className="mb-1">
                <Label for="exampleEmail" sm={4}>Nombres:</Label>
                <Col sm={8}>
                <Input type="text" name="name" id="exampleText" 
                    onChange = {handleInputChange}
                />
                </Col>
            </FormGroup>
            <FormGroup row className="mb-1">
                <Label for="exampleEmail" sm={4}>Apellidos:</Label>
                <Col sm={8}>
                <Input type="text" name="lastName" id="exampleText" 
                    onChange = {handleInputChange}
                />
                </Col>
            </FormGroup>
            <FormGroup row className="mb-1">
                <Label for="exampleEmail" sm={4}>Correo electrónico:</Label>
                <Col sm={8}>
                <Input type="email" name="email" id="exampleText" 
                    onChange = {handleInputChange}
                 />
                </Col>
            </FormGroup>
            <FormGroup check row>
                <Col sm={{ size: 10, offset: 2 }}>
                <Button
                    onClick={handleSubmit}
                >Crear usuario</Button>
                </Col>
            </FormGroup>
            </Form>
        </div>
    );
}