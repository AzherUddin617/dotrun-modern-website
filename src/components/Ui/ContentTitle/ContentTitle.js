import React from 'react';
import classes from './ContentTitle.module.scss';

const ContentTitle = ({ className, style, children }) => {
  const rootClass = [classes.ContentTitle];
  if (className) rootClass.push(className);

  return (
    <h1 className={rootClass.join(' ')} style={style ? style:{}}>
      {children}
    </h1>
  );
}

export default ContentTitle;