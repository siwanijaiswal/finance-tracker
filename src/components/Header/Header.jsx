import React, { useEffect } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, signOutUser } from '../../utils/firebase/firebase';
import { toast } from 'react-toastify';
import userImg from '../../assets/user.svg';

const Header = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, loading]);

  const logoutFunc = () => {
    try {
      signOutUser()
        .then(() => {
          toast.success('user logged out');
          navigate('/');
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='navbar-menu'>
      <p className='logo'> Financely </p>
      {user && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img
            src={user.photoURL ? user.photoURL : userImg}
            style={{ height: '1.5rem', width: '1.5rem', borderRadius: '50%' }}
          />
          <p className='logo link' onClick={logoutFunc}>
            Logout
          </p>
        </div>
      )}
    </div>
  );
};

export default Header;
