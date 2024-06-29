import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Modal from 'react-modal';
import css from './Login.module.css';
// import { useDispatch } from 'react-redux';

// TO DO this paths
// import { setUsers } from '../../../redux/actions/userActions';
import LoginValidation, { LoginValidationType } from './LoginValidation';
import { login } from '../../../services/users';
import { Button } from '@mui/material';

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

    // const dispatch = useDispatch();

    const [loginData, setLoginData] = useState<LoginData>(loginDataInitial);
    const [loginDataErrors, setLoginDataErrors] = useState<LoginValidationType>({
        isValid: false,
        response: loginDataInitial
    });
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isUserLogin, setIsUserLogin] = useState<boolean>(localStorage.getItem("token") ? true : false);

    useEffect(() => {
        console.log(isUserLogin)
    }, [isUserLogin])

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

        login(loginData, setIsModalOpen(false));
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsUserLogin(false)
    }

    return (
        <>
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
