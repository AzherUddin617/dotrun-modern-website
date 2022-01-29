import React from 'react';
import ContentTitle from '../Ui/ContentTitle/ContentTitle';
import NavLink from '../Ui/NavLink/NavLink';
import classes from './News.module.scss';
import img1 from '../../assets/games/1.jpg';
import img2 from '../../assets/games/2.jpg';

const newsItems = [
  { img: img1, date: 'May 17, 2020', title: 'Chess Game @ EA Play 2020' },
  { img: img2, date: 'Aug 25, 2020', title: 'Battle Royal Out on Steam' },
];

const News = () => {
  return (
    <div className={classes.News}>
      <div className={[classes.Container, 'container'].join(' ')}>

        <div className={classes.Head}>
          <ContentTitle className={classes.Title}>Latest news</ContentTitle>
          <NavLink>SEE ALL POSTS</NavLink>
        </div>

        <div className={classes.Items}>
          {newsItems.map((item, i)=> (
            <div className={classes.Item} key={i}>
              <div className={classes.ImageContainer}>
                <img src={item.img} alt="IMG" className={classes.Image} />
              </div>
              <p className={classes.Date}>{item.date}</p>
              <h3 className={classes.Title}>{item.title}</h3>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default News;