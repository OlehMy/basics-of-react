import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from '../pages/Home';
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import PostId from '../pages/PostId';
import SignIn from '../pages/SignIn';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context';
import MyLoader from './UI/loader/MyLoader';

function AppRouter() {
  const { isAuth, isLoading } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    return isAuth
      ? navigate('posts')
      : navigate('sign-in')
  }, [isAuth]);

  if (isLoading) {
    return <MyLoader />
  }

  return (
    isAuth
      ? < Routes >
        <Route path='/' element={<Home />} />
        <Route path='posts' element={<Posts />} />
        <Route path='posts/:id' element={<PostId />} />
        <Route path='*' element={<Error />} />
      </Routes >
      : < Routes >
        <Route path='/' element={<Home />} />
        <Route path='sign-in' element={<SignIn />} />
        <Route path='*' element={<Error />} />
      </Routes >
  );
}

export default AppRouter;