import Swal from 'sweetalert2';
import RegisterAPI from '../helpers/RegisterAPI';
import { types } from '../types/types';

const api = new RegisterAPI();

export const startUserRegister = (infoForm) => {
    return (dispatch) => {
        return api.auth('register',infoForm).then( ({ user }) => {
                dispatch(addNewUser( user.uid, user ));
                Swal.fire('Saved', user.name, 'success');
            })
            .catch( e => {
                console.log(e);
                Swal.fire('Error', e.message, 'error');
            })
    }
}

export const getUsers = () => {
    return ( dispatch ) => {
        return api.getUsers().then((l) =>{
            dispatch()
        })
    }
}

export const addNewUser = ( uid, user ) => ({
    type: types.register,
    payload: {
        uid, ...user
    }
})