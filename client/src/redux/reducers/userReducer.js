import { ActionTypes } from "../constants/action-types";

const initialState = {
    users: [],
    loggedUser: null
}

export const userReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_USERS:
            return {...state, users:payload}
        case ActionTypes.SET_LOGGED_USER:
            return {...state, loggedUser:payload}
        case ActionTypes.SELECTED_USER:
            return {...state, selectedUser:payload}
    
        default:
            return state
    }
}

// Selectors
export const getUsers = (state) => state.userReducer.users;
export const getLoggedUser = (state) => state.userReducer.loggedUser;
export const getSelectedUser = (state) => state.userReducer.selectedUser;