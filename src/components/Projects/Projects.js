import React, { useState, useEffect, useRef } from 'react';
import ContentTitle from '../Ui/ContentTitle/ContentTitle';
import classes from './Projects.module.scss';

import img1 from '../../assets/games/1.jpg';
import img2 from '../../assets/games/2.jpg';
import img3 from '../../assets/games/3.jpg';
import img4 from '../../assets/games/4.jpg';
import img5 from '../../assets/games/5.jpg';

const projects = [
  { img: img1, title: 'Chess Game' },
  { img: img2, title: 'Battle Royal' },
  { img: img3, title: 'Card Game' },
  { img: img4, title: 'Poker' },
  { img: img5, title: 'Animal Planet' },
];

const Projects = () => {
  const [transX, setTransX] = useState(0);
  const [onTouch, setOnTouch] = useState(false);
  const [contentHeight, setContentHeight] = useState(100);
  const contentBodyRef = useRef();

  useEffect(()=> {
    const start = {x: 0, y: 0};
    let moveTimeout = null, sideOffset = 0, contentWidth = 100, timeStamp = 0, timeDelta = 0;
    let deltas = [];
    const mouseMove = e => {
      e.preventDefault();
      
      if (moveTimeout === null) {
        moveTimeout = null;
        const x = e.pageX;
        const dx = x - start.x;
        start.x = x;

        if (timeStamp > 0)
          timeDelta = e.timeStamp - timeStamp;
        timeStamp = e.timeStamp;
        deltas.push(timeDelta / Math.abs(dx));

        setTransX(prevX => prevX + dx);
        moveTimeout = setTimeout(()=> moveTimeout = null, 100);
      }
    }
    const mouseUp = e => {
      console.log('e :>> ', timeDelta);
      let dd;
      if (timeDelta > 0)
        dd = timeDelta;
      else
        dd = e.timeStamp - timeStamp;
      
      const dx = e.pageX - start.x;
      start.x = e.pageX;
      const dt = Math.abs(dx) / (dd === 0 ? 1 : dd);
      console.log('dt :>> ', dt);
      timeStamp = 0;
      timeDelta = 0;
      deltas = [];
      setTransX(prevX => {
        let extra = 0;
        if (isFinite(dt + dx) & !isNaN(dt + dx)) {
          extra = (dx * (dt > 1 ? dt * 2 : 1));
        }
        let newX = prevX + extra;
        if (newX > 0) newX = 0;
        if (newX < - contentWidth + (window.innerWidth - sideOffset)) 
          newX = -contentWidth + (window.innerWidth - sideOffset);
        return newX;
      });
      setOnTouch(false);
      if (contentBodyRef.current) {
        // contentBodyRef.current.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
        // contentBodyRef.current.removeEventListener('mouseup', mouseUp);
        document.removeEventListener('mouseleave', mouseUp);
      }
    }
    const mouseDown = (e) => {
      e.preventDefault();
      start.x = e.pageX;
      start.y = e.pageY;
      if (contentBodyRef.current) {
        // contentBodyRef.current.addEventListener('mousemove', mouseMove);
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('touchmove', mouseMove);

        document.addEventListener('mouseup', mouseUp);
        document.addEventListener('touchup', mouseUp);

        document.addEventListener('mouseleave', mouseUp);
        document.addEventListener('touchleave', mouseUp);
      }
      setOnTouch(true);
    }

    if (contentBodyRef.current) {
      const rect = contentBodyRef.current.getBoundingClientRect();
      sideOffset = rect.left;
      contentWidth = rect.width;
      contentBodyRef.current.addEventListener('mousedown', mouseDown);
      contentBodyRef.current.addEventListener('touchdown', mouseDown);
      setContentHeight(rect.height);
    }
    const resizeHandler = ()=> {
      if (contentBodyRef.current) {
        setContentHeight(contentBodyRef.current.getBoundingClientRect().height);
      }
    }
    window.addEventListener('resize', resizeHandler);
    return ()=> window.removeEventListener('resize', resizeHandler);
  }, []);


  return (
    <div className={classes.Projects}>
      <div className={[classes.Container, 'container'].join(' ')}>

        <ContentTitle className={classes.Title}>Our games</ContentTitle>

        <div className={classes.Contents} style={{ height: contentHeight }}>
          <div className={classes.Body} ref={contentBodyRef} style={{
            transform: `translateX(${transX}px)`
          }}
          >
            {projects.map((project, i) => {
              const classNames = [classes.Project];
              if (onTouch) classNames.push(classes.OnTouch);

              return (
                <div className={classNames.join(' ')} key={i}>
                  <div className={classes.ImageContainer}>
                    <img src={project.img} alt="IMG" className={classes.Image} />
                  </div>

                  <h3 className={classes.Title}>{project.title}</h3>
                </div>
              )
            })}

          </div>
        </div>

      </div>
    </div>
  );
}

export default Projects;