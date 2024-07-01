import { ActionTypes } from "../constants/action-types";

export const setUsers = (users) => {
    return {
        type: ActionTypes.SET_USERS,
        payload: users
    }
}

export const setLoggedUser = (user) => {
    return {
        type: ActionTypes.SET_LOGGED_USER,
        payload: user
    }
}

export const setSelectedUser = (user) => {
    return {
        type: ActionTypes.SELECTED_USER,
        payload: user
    }
}