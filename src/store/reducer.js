
const initialState = {
  loggedIn: false,
  users: []
}

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
      case "REGISTER":
        return {
          ...state,
          user: [...state.users, action.payload]
        }
      case "LOGIN":
        return {
          ...state,
          user: action.payload
        }
      default:
        return state 
  }
}

export default mainReducer