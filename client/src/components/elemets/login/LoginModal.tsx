import { useState, ChangeEvent, FormEvent } from 'react';
import Modal from 'react-modal';
import css from './LoginModal.module.css';
// import { useDispatch } from 'react-redux';

// TO DO this paths
// import { setUsers } from '../../../redux/actions/userActions';
import LoginValidation, { LoginValidationType } from './LoginModalValidation';
import { Button } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLoggedUser } from '../../../redux/actions/userActions';
import { User } from '../../../types/Users';
import { jwtDecode } from 'jwt-decode';

const apiUrl = process.env.REACT_APP_API_URL;

type LoginData = {
    email: string,
    password: string,
}

const loginDataInitial: LoginData = {
    email: '',
    password: '',
}

Modal.setAppElement('#root');

const Login = () => {

    const dispatch = useDispatch();

    const [loginData, setLoginData] = useState<LoginData>(loginDataInitial);
    const [loginDataErrors, setLoginDataErrors] = useState<LoginValidationType>({
        isValid: false,
        response: loginDataInitial
    });
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isUserLogin, setIsUserLogin] = useState<boolean>(localStorage.getItem("token") ? true : false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setLoginData({
            ...loginData, [name]: value
        });
    };

    const onClickLogin = (e: FormEvent) => {
        e.preventDefault();
        const validation = LoginValidation(loginData);
        setLoginDataErrors(validation);
        if (!validation.isValid) {
            return
        }

        // login(loginData, setIsModalOpen(false));
        axios.post(`${apiUrl}users/login`, loginData)
        .then((result) => {
            localStorage.setItem("token", result.data.token);

            // this make reactivity for some reason because I think I make change to global state. Yes I never use
            // this state to get logged user from global state but because the change home component is reactivity
            const decodedUser = jwtDecode<User>(result.data.token);
            dispatch(setLoggedUser(decodedUser));
            setIsUserLogin(true);
            setIsModalOpen(false);

            return result.data;
            // users.push(result.data);
        })
        .catch((err) => {
            console.log(err)
        })
    };

    const logout = () => {
        localStorage.removeItem("token");
        dispatch(setLoggedUser(null));
        setIsUserLogin(false)
    }

    return (
        <>
            {/* TO DO - the logic is not good */}
            { !isUserLogin &&
                <Button variant="contained" onClick={() => setIsModalOpen(true)}>
                    Login 
                </Button>
            }

            { isUserLogin &&
                <Button variant="contained" onClick={logout}>
                    Logout
                </Button>
            }

            {isModalOpen && 
                <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                    <form onSubmit={onClickLogin}>                     
                        <input
                            type="text"
                            name="email"
                            value={loginData.email}
                            onChange={handleInputChange}
                            placeholder="Enter User email"
                        />
                        <span className={css.error}>{loginDataErrors.response?.email}</span>
                        <br />

                        <input
                            type="text"
                            name="password"
                            value={loginData.password}
                            onChange={handleInputChange}
                            placeholder="Enter User password"
                        />
                        <span className={css.error}>{loginDataErrors.response?.password}</span>
                        <br />

                        <button type='submit'>Login</button>
                        <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                    </form>
                </Modal>
            }
        </>
    );
};

export default Login;
