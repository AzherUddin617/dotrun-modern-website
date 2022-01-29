import React from 'react';
import classes from './NavLink.module.scss';

const NavLink = ({ children, className }) => {
  return (
    <div className={[classes.NavLink, className].join(' ')}>
      <p className={classes.Text}>{children}</p>
      <div className={classes.Border}></div>
    </div>
  );
}

export default NavLink;
