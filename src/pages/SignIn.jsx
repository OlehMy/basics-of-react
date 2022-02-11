import React, { useContext } from 'react';
import MyButton from '../components/UI/button/MyButton';
import MyInput from '../components/UI/input/MyInput';
import { AuthContext } from '../context';

function SignIn() {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const login = e => {
    e.preventDefault();
    setIsAuth(true);
    localStorage.setItem('auth', 'true');
  }

  return (
    <div className='sign-in'>
      <h1 className='sign-in__title'> Sign In </h1>
      <form onSubmit={login}>
        <MyInput
          type='text'
          placeholder='Login' />
        <MyInput
          type='password'
          placeholder='Password' />
        <MyButton>Sign In</MyButton>
      </form>
    </div>
  );
}

export default SignIn;