import { useState, ChangeEvent, FormEvent } from 'react';
import Modal from 'react-modal';
import css from './UserRegister.module.css';
// import { useDispatch } from 'react-redux';

// TO DO this paths
// import { setUsers } from '../../../redux/actions/userActions';
import UserRegisterValidation from './UserRegisterValidation';
import { User, UserValidation } from '../../../types/Users';
import { signup } from '../../../services/users';
import { Button } from '@mui/material';

const userInitialState: User = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: ''
}

Modal.setAppElement('#root');

const UserRegister = () => {

    // const dispatch = useDispatch();

    const [user, setUser] = useState<User>(userInitialState);
    const [userErrors, setUserErrors] = useState<UserValidation>({
        isValid: false,
        response: userInitialState
    });
    const [openUserRegisterModal, setOpenUserRegisterModal] = useState(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setUser({
            ...user, [name]: value
        });
    };

    const onClickSignup = (e: FormEvent) => {
        e.preventDefault();
        const validation = UserRegisterValidation(user);
        setUserErrors(validation);
        if (!validation.isValid) {
            return
        }

        signup(user, setOpenUserRegisterModal(false));
    };

    return (
        <>
            <Button variant="contained" onClick={() => setOpenUserRegisterModal(true)}>
                User Register
            </Button>

            {openUserRegisterModal && 
                <Modal isOpen={openUserRegisterModal} onRequestClose={() => setOpenUserRegisterModal(false)}>
                    <form onSubmit={onClickSignup}>
                        <h2>User Register form</h2>
                        <input
                            type="text"
                            name="first_name"
                            value={user.first_name}
                            onChange={handleInputChange}
                            placeholder="Enter User first name"
                        />
                        <span className={css.error}>{userErrors.response?.first_name}</span>
                        <br />

                        <input
                            type="text"
                            name="last_name"
                            value={user.last_name}
                            onChange={handleInputChange}
                            placeholder="Enter User last name"
                        />
                        <span className={css.error}>{userErrors.response?.last_name}</span>
                        <br />

                        <input
                            type="text"
                            name="email"
                            value={user.email}
                            onChange={handleInputChange}
                            placeholder="Enter User email"
                        />
                        <span className={css.error}>{userErrors.response?.email}</span>
                        <br />

                        <input
                            type="text"
                            name="password"
                            value={user.password}
                            onChange={handleInputChange}
                            placeholder="Enter User password"
                        />
                        <span className={css.error}>{userErrors.response?.password}</span>
                        <br />

                        <input
                            type="text"
                            name="confirm_password"
                            value={user.confirm_password}
                            onChange={handleInputChange}
                            placeholder="Enter User confirm password"
                        />
                        <span className={css.error}>{userErrors.response?.confirm_password}</span>
                        <br />

                        <button type='submit'>Create</button>
                        <button onClick={() => setOpenUserRegisterModal(false)}>Cancel</button>
                    </form>
                </Modal>
            }
        </>
    );
};

export default UserRegister;
