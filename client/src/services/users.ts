import axios from 'axios';
import { User } from '../types/Users';

const apiUrl = process.env.REACT_APP_API_URL;

type LoginData = {
    email: string,
    password: string
}

export const signup = (user: User, cb: any) => {
    axios.post(`${apiUrl}users/signup`, user)
    .then((result) => {
        // users.push(result.data);
        cb();
        // dispatch(setUsers(users));
    })
    .catch((err) => {
        console.log(err)
    })
}

export const login = (user: LoginData, cb: any) => {
    axios.post(`${apiUrl}users/login`, user)
    .then((result) => {
        localStorage.setItem("token", result.data.token);
        return result.data;
        // users.push(result.data);
        // cb();
        // dispatch(setUsers(users));
    })
    .catch((err) => {
        console.log(err)
    })
}

export const getAllUsers = () => {
    axios.get(`${apiUrl}users`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }).then((result) => {
        console.log('11111111', result.data)
    })
    .catch((err) => {
        console.log(err)
    })
}
