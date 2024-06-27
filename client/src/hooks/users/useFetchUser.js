import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../../redux/actions/userActions';
import { getUsers } from '../../redux/reducers/userReducer';

let fetchPromise = null;

const useFetchUser = (url) => {
    const dispatch = useDispatch();
    const { users } = useSelector((state) => ({
        users: getUsers(state)
    }));

    const fetchData = async () => {
        if (!fetchPromise) {
            fetchPromise = new Promise(async (resolve, reject) => {
                await axios.get(url)
                .then((response) => {
                    dispatch(setUsers(response.data));
                    resolve();
                })
                .catch((error) => {
                    console.log(error('Error fetching data:', error));
                    reject(error);
                })
            });
        }
        await fetchPromise;
    };

    useEffect(() => {
        fetchData();
    }, []);

    return users;
};

export default useFetchUser;