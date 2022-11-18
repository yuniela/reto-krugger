import RegisterAPI from "../helpers/RegisterAPI";
import Swal from 'sweetalert2';
import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui";
import { useNavigate } from "react-router-dom";

const api = new RegisterAPI();
export const startLoginEmailPassword = (email, password) => {
    let formLogin = {email,password};
    return (dispatch) => {
        dispatch( startLoading() );
        return api.auth('login',formLogin).then( (l) => {
                localStorage.setItem('user', JSON.stringify(l))
                dispatch(login( l.user, l.token ));
                dispatch( finishLoading() );
            })
            .catch( e => {
                console.log(e);
                dispatch( finishLoading() );
                Swal.fire('Error', "Usuario o contraseña incorrecta", 'error');
            })
    }
}
export const saveInformation = (formInfo) => {
    return (dispatch) => {
        return api.users(formInfo).then( (l) => {
                dispatch(save(l.user));
                Swal.fire('Saved', "Se guardó tu información", 'success');
            })
            .catch( e => {
                console.log(e);
                dispatch( finishLoading() );
                Swal.fire('Error', e.message, 'error');
            })
    }
}
export const login = (user) => ({
    type: types.login,
    payload: {
        uid: user.uid,
        displayName: `${user.name} ${user.lastName}`,
        role: user.role,
    }
});

export const save = (user) => ({
    type: types.save,
    payload: {
        ...user
    }

});



export const logoutSesion =() => {
    localStorage.clear();
    return (dispatch) => {
        dispatch(logout)
    }
}
export const logout = () => ({
    type: types.logout
})