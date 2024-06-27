import { ActionTypes } from "../constants/action-types";

export const setUsers = (users) => {
    return {
        type: ActionTypes.SET_USERS,
        payload: users
    }
}

export const setSelectedUser = (user) => {
    return {
        type: ActionTypes.SELECTED_USER,
        payload: user
    }
}