import { types } from "../types/types";
const initialState = {
    users: [],
}
export const usersReducer = ( state = initialState, action ) => {
    
    switch ( action.type ) {
        case types.register:
            return {
                ...state,
                users: [ action.payload, ...state.users ]
            }
        default:
            return state;
    }

}