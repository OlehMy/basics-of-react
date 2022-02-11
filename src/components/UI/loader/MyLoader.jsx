import React from 'react';
import classes from './MyLoader.module.css'

function MyLoader() {
  return (
    <div className={classes.myLoader}>
      <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
    </div>
  );
}

export default MyLoader;