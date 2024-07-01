import css from './Home.module.css';
import UserRegister from '../../components/elemets/userRegister/UserRegisterModal';
import LoginModal from '../../components/elemets/login/LoginModal';

import useFetchUser from '../../hooks/users/useFetchUser';
import { User } from '../../types/Users';
import { LoggedUser } from '../../utils/utils';
import { useEffect, useState } from 'react';

const apiUrl = process.env.REACT_APP_API_URL;

const Home = () => {
  const users = useFetchUser(`${apiUrl}users`);
  const user = LoggedUser();

  const onClickChat = () => {
    console.log('chat open')
  }
  
  return (
    <div className='container'>

      <UserRegister />

      <LoginModal />

      { user &&
        "user: " + user.email
      }
      <br />
      <br />

      <div>
        { !user &&
          <div>
            Please Login to see all users and chat
          </div>
        }

        { user &&
          <>
            <h1>Chat rooms</h1>
            {
              users.map((userItem: User, index: number) => (
                userItem.email !== user.email &&
                <div key={index} className={css.chatbox}>
                  <h3>{userItem.email}</h3>
                  <button onClick={onClickChat}>chat</button>
                </div>
              ))
            }
          </>
        }

      </div>
      
    </div>
  );
};

export default Home;
