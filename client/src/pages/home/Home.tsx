// import css from './Home.module.css';
import UserRegister from '../../components/elemets/userRegister/UserRegister';
import Login from '../../components/elemets/login/Login';

import { getAllUsers } from '../../services/users';
import { useEffect } from 'react';

const Home = () => {

  useEffect(() => {
    if ( localStorage.getItem("token") ) {
      getAllUsers();
    }
  }, []);

  return (
    <div className='container'>

      <UserRegister />

      <Login />
      
    </div>
  );
};

export default Home;
