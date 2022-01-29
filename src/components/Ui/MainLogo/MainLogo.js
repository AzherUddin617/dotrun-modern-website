import React from 'react';
import classes from './MainLogo.module.scss';

const MainLogo = ({ className }) => {
  return (
    <div className={[classes.MainLogo, className].join(' ')}>
      <h1 className={classes.LogoText}>DOTRUN</h1>
    </div>
  );
}

export default MainLogo;
