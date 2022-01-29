import React from 'react';
import classes from './RightLinks.module.scss';

import {
  Twitter,
  Facebook,
  Instagram
} from '@material-ui/icons';

const links = [
  { Icon: Instagram, url: '/' },
  { Icon: Facebook, url: '/' },
  { Icon: Twitter, url: '/' },
]

const RightLinks = ({ className, style }) => {
  const rootClass = [classes.RightLinks];
  if (className) rootClass.push(className);

  return (
    <div className={rootClass.join(' ')} style={style ? style:{}}>
      {links.map((link, i) => (
        <a className={classes.Link} key={i} href={link.url}>
          <span className={classes.Circle}></span>
          <span className={classes.Icon}>
            <link.Icon color="inherit" fontSize="inherit" />
          </span>
        </a>
      ))}
    </div>
  );
}

export default RightLinks;