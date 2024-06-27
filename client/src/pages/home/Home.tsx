import { useEffect, useState } from 'react';
import './Home.module.css';
import UserRegister from './userRegister/UserRegister';
import { Button } from '@mui/material';

const Home = () => {

  const [openUserRegisterModal, setOpenUserRegisterModal] = useState(false);

  useEffect(() => {
    if (openUserRegisterModal) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }
  }, [openUserRegisterModal]);

  return (
    <div className='container'>
      <Button variant="contained" onClick={() => setOpenUserRegisterModal(true)}>
        User Register
      </Button>

      {
          openUserRegisterModal && <UserRegister 
          isOpen={openUserRegisterModal}
          onClose={() => setOpenUserRegisterModal(false)}
        />
      }
    </div>
  );
};

export default Home;