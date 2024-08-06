import React from 'react';
import './SignUp.css';
import { useState } from 'react';
import FormInput from '../FormInput/FormInput.jsx';
import Button from '../Button/Button.jsx';
import {
  createAuthUserWithEmailAndPassword,
  signInWithGooglePopUp,
} from '../../utils/firebase/firebase.js';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const defaultFormFields = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
};
const SignUpSignIn = () => {
  const [loading, setLoading] = useState(false);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { fullName, email, password, confirmPassword } = formFields;
  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const signUpWithEmail = async (event) => {
    event.preventDefault();
    setLoading(true);

    const signUpSuccess = await createAuthUserWithEmailAndPassword(
      fullName,
      email,
      password,
      confirmPassword,
      setLoading
    );

    if (signUpSuccess) {
      toast.success('User created');
      setLoading(false);
      setTimeout(() => {
        resetFormFields();
        navigate('/dashboard');
      }, 2000);
    }
  };

  const signUpWithGoogle = () => {
    signInWithGooglePopUp(setLoading, fullName);
    navigate('/dashboard');
  };

  return (
    <div className='wrapper'>
      <div className='signup-wrapper'>
        <h2 className='signUp-header'>
          {' '}
          Sign Up On <span style={{ color: 'var(--theme)' }}>Financely.</span>
        </h2>
        <form>
          <FormInput
            label={'Full Name'}
            placeholder={'John Doe'}
            type='text'
            required
            name='fullName'
            onChange={handleChange}
            value={fullName}
          />
          <FormInput
            label={'Email'}
            placeholder={'JohnDoe@gmail.com'}
            type='email'
            required
            name='email'
            onChange={handleChange}
            value={email}
          />
          <FormInput
            label={'Password'}
            placeholder={'Your Password'}
            type='password'
            required
            name='password'
            onChange={handleChange}
            value={password}
          />
          <FormInput
            label={'Confirm Password'}
            placeholder={'Confirm Password'}
            type='password'
            required
            name='confirmPassword'
            onChange={handleChange}
            value={confirmPassword}
          />
          <Button type='button' disabled={loading} onClick={signUpWithEmail}>
            {loading ? 'Loading...' : 'Signup With Email'}
          </Button>
          <p style={{ textAlign: 'center', margin: 0 }}>Or</p>
          <Button blue={true} disabled={loading} onClick={signUpWithGoogle}>
            {loading ? 'Loading...' : 'Signup With Google'}
          </Button>
          <Link className='p-login' to='/'>
            Or Have an Account Already? Click here
          </Link>
        </form>
      </div>{' '}
    </div>
  );
};

export default SignUpSignIn;
