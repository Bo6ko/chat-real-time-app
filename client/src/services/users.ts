import axios from 'axios';
import { User } from '../types/Users';

const apiUrl = process.env.REACT_APP_API_URL;

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