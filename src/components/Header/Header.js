import React, { useState, useEffect } from 'react';
import classes from './Header.module.scss';

import MenuIcon from '@material-ui/icons/Menu';
import MainLogo from '../Ui/MainLogo/MainLogo';
import Button from '../Ui/Button/Button';
import NavLink from '../Ui/NavLink/NavLink';

const Header = ({ scrollListener }) => {
  const navItems = ['about', 'games', 'dotrun', 'careers', 'news'];
  const [logoSmall, setLogoSmall] = useState(0);

  useEffect(()=> {
    const scrollHandler = ()=> {
      // console.log('window.pageYOffset :>> ', window.pageYOffset);
      if (window.pageYOffset > window.innerHeight/2) {
        setLogoSmall(true);
      }
      else {
        setLogoSmall(false);
      }
    };
    scrollListener.add(scrollHandler);

    return ()=> scrollListener.remove(scrollHandler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className={classes.Header}>
      <div className={classes.Shade}></div>
      <div className={classes.Contents}>
        <div className={classes.Top}>

          <div className={classes.MenuIcon}>
            <MenuIcon color="inherit" fontSize="inherit" />
          </div>

          <nav className={[classes.Nav, logoSmall ? classes.Hide:''].join(' ')}>
            <ul className={classes.List}>
              {navItems.slice(0, 3).map((item, i) => (
                <li
                  key={i}
                  className={classes.Item}
                >
                  <NavLink>{item}</NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <MainLogo className={[classes.Logo, logoSmall ? classes.Small:''].join(' ')}/>

          <div className={classes.Button}>
            <Button className={classes.Btn}>JOIN US</Button>
          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;
