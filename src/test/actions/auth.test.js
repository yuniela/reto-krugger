import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { login, logout, startLoginEmailPassword } from '../../actions/auth';
import { types } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);


describe('Pruebas con las acciones de Auth', () => {
    
    beforeEach(()=> {
        store = mockStore(initState);
    })



    test('login y logout deben de crear la acción respectiva', () => {
       
        const user ={
            uid: '637629610be8a0653a374bcb',
            displayName: 'undefined undefined',
            role: 'USER',
        }

        const loginAction = login(user);
        const logoutAction = logout();

        expect( loginAction ).toEqual({
            type: types.login,
            payload: {
                uid: user.uid,
                displayName: user.displayName,
                role: user.role,
            }
        });

        expect( logoutAction ).toEqual({
            type: types.logout
        });

    })



    test('debe de iniciar el startLoginEmailPassword', async() => {
        
        await store.dispatch( startLoginEmailPassword('yunielasolorzano@gmail.com','lWfjDAaLzd') );

        const actions = store.getActions();
        
        expect( actions[1] ).toEqual({
            type: types.login,
            payload: {
                uid: '637629610be8a0653a374bcb',
                displayName: 'Yuniela Solorzano',
                role: 'USER',
            }
        })

    })
})