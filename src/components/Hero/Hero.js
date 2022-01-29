import React, { useState, useEffect } from 'react';
import classes from './Hero.module.scss';

import img1 from '../../assets/showimgs/1.jpg';
import img2 from '../../assets/showimgs/2.jpg';
import img3 from '../../assets/showimgs/3.jpg';
import img4 from '../../assets/showimgs/4.jpg';
const imgs = [img1, img2, img3, img4];

const Hero = ({ scrollListener }) => {
  const [scrollP, setScrollP] = useState(0);

  useEffect(()=> {
    const scrollHandler = ()=> {
      const Rect = {
        top: - window.pageYOffset,
        height: window.innerHeight
      };

      if (Rect.top <= 0 && Rect.top + Rect.height >= 0) {
        const bgY1 = window.pageYOffset + Rect.top;
        const bgY2 = bgY1 + Rect.height;
        const bgYP = (window.pageYOffset - bgY1) / (bgY2 - bgY1) * 100;
        setScrollP(bgYP);
      }
    }
    scrollListener.add(scrollHandler);
    return ()=> scrollListener.remove(scrollHandler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log('scrollP :>> ', scrollP);

  return (
    <div className={classes.Hero}>
      <div className={[classes.Container, 'container'].join(' ')}>
        {imgs.map((img, i)=> (
          <div className={classes.ShowImage} key={i} style={{
            "--transY": ((i<2 ? 1:-1) * 50 * scrollP/100) + '%'
          }}>
            <img src={img} alt="IMG" className={classes.Image} />
          </div>
        ))}
        <div className={classes.Contents}>

          <div className={classes.TextContents}>
            <p className={classes.Greet}>Welcome</p>
            <h1 className={classes.Title}>
              Story and <br/>
              Gameplay
            </h1>
            <p className={classes.Details}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque amet non aut animi velit beatae voluptate sunt quod facere aperiam. Dolore non qui cum culpa.</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Hero;