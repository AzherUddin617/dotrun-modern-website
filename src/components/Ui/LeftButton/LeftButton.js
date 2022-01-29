import React from 'react';
import classes from './LeftButton.module.scss';
import NavLink from '../NavLink/NavLink';

const LeftButton = ({ className, style }) => {
  const rootClass = [classes.LeftButton];
  if (className) rootClass.push(className);

  return (
    <div className={rootClass.join(' ')} style={style ? style:{}}>
      <NavLink className={classes.Link}>GET IN TOUCH</NavLink>
    </div>
  );
}

export default LeftButton;