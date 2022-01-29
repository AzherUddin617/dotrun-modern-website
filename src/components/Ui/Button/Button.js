import React from 'react';
import classes from './Button.module.scss';

const Button = ({ big, fill, className, children }) => {
  const rootClass = [classes.Button];
  if (className) rootClass.push(className);
  if (big) rootClass.push(classes.Big);
  if (fill) rootClass.push(classes.Fill);

  return (
    <div className={rootClass.join(' ')}>
      <div className={classes.TextContents}>
        <p className={classes.Text}>{children}</p>
        <p className={[classes.Text, classes.Hover].join(' ')}>{children}</p>
      </div>
    </div>
  );
}

export default Button;
