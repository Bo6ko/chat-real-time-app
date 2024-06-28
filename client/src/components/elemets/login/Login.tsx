import { useState, ChangeEvent, FormEvent } from 'react';
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

    const [user, setUser] = useState<LoginData>(loginDataInitial);
    const [loginDataErrors, setLoginDataErrors] = useState<LoginValidationType>({
        isValid: false,
        response: loginDataInitial
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setUser({
            ...user, [name]: value
        });
    };

    const onClickLogin = (e: FormEvent) => {
        e.preventDefault();
        const validation = LoginValidation(user);
        setLoginDataErrors(validation);
        if (!validation.isValid) {
            return
        }

        login(user, setIsModalOpen(false));
    };

    return (
        <>
            <Button variant="contained" onClick={() => setIsModalOpen(true)}>
                Login 
            </Button>

            <Button variant="contained" onClick={() => localStorage.removeItem("token")}>
                Logout
            </Button>

            {isModalOpen && 
                <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                    <form onSubmit={onClickLogin}>                     
                        <input
                            type="text"
                            name="email"
                            value={user.email}
                            onChange={handleInputChange}
                            placeholder="Enter User email"
                        />
                        <span className={css.error}>{loginDataErrors.response?.email}</span>
                        <br />

                        <input
                            type="text"
                            name="password"
                            value={user.password}
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
