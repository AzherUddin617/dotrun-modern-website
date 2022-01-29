import React, { useState, useEffect, useRef } from 'react';
import Button from '../Ui/Button/Button';
import ContentTitle from '../Ui/ContentTitle/ContentTitle';
import classes from './Office.module.scss';
function importAll(r) {
  return r.keys().map(r);
}
const images = importAll(require.context('../../assets/office/', false, /\.(png|jpe?g|svg)$/));
const changeInterval = 1500;

const Office = ({ scrollListener }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const imgContRef = useRef();
  
  useEffect(()=> {
    const interval = setInterval(()=> setActiveIndex(
      prevIndex => prevIndex < images.length-1 ? prevIndex+1 : 0
    ), changeInterval);

    return ()=> {
      clearInterval(interval);
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.Office}>
      <div className={[classes.Container, 'container'].join(' ')}>

        <div className={[classes.Contents, classes.Left].join(' ')}>
          <ContentTitle className={classes.Title}>Our office</ContentTitle>

          <p className={classes.Details}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi est nobis quis nulla praesentium eum quas delectus, dignissimos facere cupiditate? Quasi accusamus animi dolore fuga libero eius pariatur explicabo quod!</p>

          <Button big fill>CHECK IT OUT</Button>
        </div>

        <div className={[classes.Contents, classes.Right].join(' ')} ref={imgContRef}>
          <div className={classes.Images}>
            {images.map((img, i) => {
              const classNames = [classes.ImageContainer];
              if (i === activeIndex-1) classNames.push(classes.Back);
              if (activeIndex === 0 && i === images.length - 1) classNames.push(classes.Back);
              if (i === activeIndex) classNames.push(classes.Active);

              if (i % 2 === 0) classNames.push(classes.Right);

              return (
                <div className={classNames.join(' ')} key={i} style={{ "--transY": 0 + '%' }}>
                  <img src={img} alt="IMG" className={classes.Image} />
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Office;