import React from 'react';
import MainLogo from '../Ui/MainLogo/MainLogo';
import NavLink from '../Ui/NavLink/NavLink';
import classes from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={classes.Footer}>
      <div className={[classes.Container, 'container'].join(' ')}>

        <div className={[classes.Contents, classes.Left].join(' ')}>
          <MainLogo />

          <div className={classes.TextItem}>
            <p className={classes.Title}>Office Location</p>
            <a href="/" className={classes.Link}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero, dolores.</a>
          </div>

          <div className={classes.TextItem}>
            <p className={classes.Title}>Office Location</p>
            <div className={classes.NavLink}>
              <NavLink>Facebook</NavLink>
            </div>
            <div className={classes.NavLink}>
              <NavLink>Twiter</NavLink>
            </div>
            <div className={classes.NavLink}>
              <NavLink>Instagram</NavLink>
            </div>
          </div>

          
        </div>
        
        <div className={[classes.Contents, classes.Right].join(' ')}>
          <div className={classes.BottomTexts}>
            <p className={classes.Text}>&copy; 2020 DotRun <br/> All Right Reserved.</p>
            <p className={classes.Text}>Created by <a href="https://www.facebook.com/azher.uddin.617">Azher Uddin</a>.</p>
            <p className={classes.Text}>Inspired by <a href="https://www.hazelight.se/">hazelight.se</a></p>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;