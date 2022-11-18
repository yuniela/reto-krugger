
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import React, { useState } from 'react';
import { Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import "./InfoForm.css"
import { useDispatch, useSelector } from "react-redux";
import { saveInformation } from "../../actions/auth";
import { removeError, setError } from "../../actions/ui";
import { is_numbers } from "../../helpers/validator";


export const InfoForm = () => {
    const [birthDate, setBirthDate] = useState(new Date());
    const [vaccineDate, setVaccineDate] = useState(new Date());
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [dose, setDose] = useState("");
    const [covidVaccine, setcovidVaccine] = useState("");
    const [vaccineState, setVaccineState] = useState(false);
    const dispatch = useDispatch();
    const { msgError } = useSelector( state => state.ui );
    const token = useSelector((state) => state.auth.token)
    
    function toJSONLocal(date) {
        var local = new Date(date);
        local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return local.toJSON().slice(0, 10);
    }
    const handleSave = (infoForm) => {
        if(isFormValid(infoForm)){
            dispatch( saveInformation(infoForm) );
        }
    }

    const isFormValid = (infoForm) => {
        
        if ( infoForm.phone.length <10 && is_numbers(infoForm.phone)) {
            dispatch( setError('El número de teléfono debe contener 10 dígitos') )
            return false;
        } else if ( infoForm.address.trim().length === 0 ) {
            dispatch( setError('La dirección debe ser válida') )
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
            <Form>
            <FormGroup row className="mb-1">
                <Label for="exampleEmail" sm={4}>Fecha de nacimiento:</Label>
                <Col sm={8}>
                <DatePicker dateFormat="yyyy/MM/dd" selected={birthDate} onChange={(birthDate) => setBirthDate(birthDate)}/>
                </Col>
            </FormGroup>
            <FormGroup row className="mb-1">
                <Label for="examplePassword" sm={4}>Dirección de domicilio:</Label>
                <Col sm={8}>
                <Input type="textarea" name="text" id="exampleText" value={address} onChange={e => setAddress(e.target.value)}/>
                </Col>
            </FormGroup>
            <FormGroup row className="mb-1">
                <Label for="exampleSelect" sm={4}>Teléfono móvil:</Label>
                <Col sm={8}>
                <Input type="text" name="movil" id="exampleSelect" value={phone} onChange={e => setPhone(e.target.value)}/>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="checkbox2" sm={4}>Estado de vacunación</Label>
                <Col sm={{ size: 4 }}>
                <FormGroup check>
                    <Label check>
                    <Input 
                        type="checkbox"
                        id="checkbox2"
                        value={vaccineState}
                        onChange={e => setVaccineState(e.target.value)} 
                    />{' '}
                    Vacunado
                    </Label>
                </FormGroup>
                </Col>
            </FormGroup>

                {
                    vaccineState
                    ? <div>
                        <FormGroup row>
                            <Label for="exampleSelectMulti" sm={4}>Tipo de vacuna: </Label>
                            <Col sm={8}>
                            <Input 
                                type="select"  
                                name="select" 
                                id="exampleSelect"
                                value={covidVaccine}
                                onChange={e => setcovidVaccine(e.target.value)}
                            >
                                <option>Sputnik</option>
                                <option>AstraZeneca</option>
                                <option>Pfizer</option>
                                <option>Jhonson&Jhonson</option>
                            </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="exampleEmail" sm={4}>Fecha de vacunación:</Label>
                            <Col sm={8}>
                            <DatePicker dateFormat="yyyy/MM/dd" selected={vaccineDate} onChange={(date) => setVaccineDate(vaccineDate)}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="exampleText" sm={4}>Número de dosis:</Label>
                            <Col sm={8}>
                            <Input type="text" name="text" id="exampleText" value={dose} onChange={ e => setDose(e.target.value)} />
                            </Col>
                        </FormGroup>
                        <FormGroup check row>
                            <Col sm={{ size: 10, offset: 2 }}>
                            <Button
                                onClick= { () => {
                                    let info = {
                                    birthDate, address, phone, vaccineState, covidVaccine, vaccineDate, dose
                                    }
                                    handleSave(info, token);
                                }}
                            >Guardar</Button>
                            </Col>
                        </FormGroup>
                    </div>
                    : <div>
                        <FormGroup check row>
                            <Col sm={{ size: 10, offset: 2 }}>
                            <Button
                                onClick= { () => {
                                    let bdd = toJSONLocal(birthDate)
                                    let vdd = toJSONLocal(vaccineDate)
                                    let info = {
                                    bdd, address, phone, vaccineState, covidVaccine, vdd, dose
                                }
                                handleSave(info, token);
                            }}
                            >Guardar</Button>
                            </Col>
                        </FormGroup>
                    </div>
                }
            
            </Form>
        </div>
    );
}