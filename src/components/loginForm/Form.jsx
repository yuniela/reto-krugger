import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startLoginEmailPassword } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
import "./Form.css";

export const Form = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [ formValues, handleInputChange ] = useForm({
        email: '',
        password: ''
    });

    const auth = useSelector(state => state.auth.uid)
    const { email, password } = formValues;
   
    
    const onLogin = (email, password) => {
        dispatch( startLoginEmailPassword( email, password) );
        navigate("dashboard");
    }

    return (
        <div className="login-form">
            <h2 className="header-title">Inicio de Sesión</h2>
            <div className="login-fields">
                <div className="login-row">
                    <label>Usuario o email</label>
                    <input 
                        className= "input-form"
                        name="email" 
                        type="text" 
                        placeholder="Ingresa tu usuario"
                        onChange = {handleInputChange}
                    />
                </div> 
                <div className="login-row">
                    <label>Contraseña</label>
                    <input 
                        className= "input-form" 
                        name="password"
                        type="password" x
                        placeholder="Ingresa tu contraseña"
                        onChange = {handleInputChange}
                    />
                </div> 
                <div className="login-row">
                    <button 
                        className="login-button"
                        onClick= {() => onLogin(email, password)}
                    >
                        Ingresar
                    </button>
                </div>
            </div>
            
        </div>

        
    )

}