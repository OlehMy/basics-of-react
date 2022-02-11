import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context';
import MyButton from '../button/MyButton';
import classes from './Navbar.module.css'

function Navbar() {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('auth');
  }

  return (
    <div className={classes.navbar}>
      <div className={classes.navbar__user}>
        {isAuth
          ? <MyButton onClick={logout}>Sign Out</MyButton>
          : < ></>
        }
      </div>
      <div className={classes.navbar__links}>
        <Link className={classes.navbar__link} to='/'>Home</Link>
        {isAuth
          ? < Link className={classes.navbar__link} to='posts'>Posts</Link>
          : < Link className={classes.navbar__link} to='sign-in'>Sign In</Link>
        }
      </div>
    </div >
  );
}

export default Navbar;