import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../../redux/actions/userActions';
import { getUsers } from '../../redux/reducers/userReducer';
import { toast } from "react-toastify";

let fetchPromise: Promise<void> | null = null;

const useFetchUser = (url: string) => {
    const dispatch = useDispatch();
    const { users } = useSelector((state) => ({
        users: getUsers(state)
    }));

    const fetchData = async () => {
        if (!fetchPromise) {
            fetchPromise = new Promise<void>(async (resolve, reject) => {
                // TO DO : !!!!!!!! You will get Auth failed from server side because token have 1 hour expired time!!! But from the client side you have localstorage saved yet - you need to do re login to delete localstrage with expired token
                await axios.get(url, {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                })
                .then((response) => {
                    dispatch(setUsers(response.data));
                    resolve();
                })
                .catch((error) => {
                    console.log(toast.error('Error fetching data:', error));
                    reject(error);
                })
            });
        }
        await fetchPromise;
    };

    useEffect(() => {
        if ( localStorage.getItem("token") ) {
            fetchData();
        }
    }, [localStorage.getItem("token")]);

    return users;
};

export default useFetchUser;