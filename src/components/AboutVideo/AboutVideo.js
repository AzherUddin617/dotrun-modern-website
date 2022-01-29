import React, { useState, useEffect, useRef } from 'react';
import classes from './AboutVideo.module.scss';
import video from '../../assets/video.mp4';
import { Player, BigPlayButton } from 'video-react';

import {
  PlayArrow,
  Close
} from '@material-ui/icons';

const AboutVideo = ({ scrollListener }) => {
  const [showModal, setShowModal] = useState(false);
  const [hideModal, setHideModal] = useState(false);
  const [transY, setTransY] = useState(0);
  const videoRef = useRef();

  useEffect(()=> {
    const scrollHandler = ()=> {
      const Rect = {
        top: window.innerHeight - window.pageYOffset,
        height: window.innerHeight
      };

      if (Rect.top - window.innerHeight <= 0 && Rect.top + Rect.height >= 0) {
        const maxTransY = 25;
        const bgY1 = window.pageYOffset + Rect.top - Rect.height;
        const bgY2 = bgY1 + window.innerHeight + Rect.height;
        const bgYP = (window.pageYOffset - bgY1) / (bgY2 - bgY1) * 100;
        const bgTransY = maxTransY * bgYP / 100 - maxTransY;
        setTransY(bgTransY);
      }
    }

    scrollListener.add(scrollHandler);
    return ()=> scrollListener.remove(scrollHandler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const videoModalClasses = [classes.VideoModal];
  if (showModal) videoModalClasses.push(classes.Show);
  if (hideModal) videoModalClasses.push(classes.Hide);

  const openVideoModal = ()=> {
    if (!showModal && !hideModal) {
      document.body.style.overflow = 'hidden';
      setShowModal(true);
      setTimeout(()=> {
        if (videoRef.current) {
          videoRef.current.play();
        }
      }, 900);
    }
  }
  const closeVideoModal = () => {
    if (showModal && !hideModal) {
      setHideModal(true);
      setTimeout(()=> {
        document.body.style.overflow = 'auto';
        setHideModal(false);
        setShowModal(false);
        if (videoRef.current) {
          videoRef.current.load();
          // videoRef.current.pause();
        }
      }, 600);
    }
  }
  
  return (
    <div className={classes.AboutVideo}>
      <div className={[classes.Container, 'container'].join(' ')}>
        <div className={classes.VideoContainer}>
          
          {/* <video src={video} className={classes.Video} autoPlay loop muted>
            <source src={video} type='video/mp4' /> 
          </video> */}
          <div className={classes.Video} style={{
            transform: `translateY(${transY}%)`
          }} dangerouslySetInnerHTML={{ __html: `
              <video playsinline loop autoPlay muted autobuffer>
              <source src="${require('../../assets/video.mp4')}" type="video/mp4" />
              <source src="${video}" type="video/mp4" />
              Your browser does not support the video tag. I suggest you upgrade your browser.
          </video>            
          ` }}></div>

          <div className={classes.Playback}>
            <div className={classes.Backdrop}></div>
            <span className={classes.PlayButton} onClick={openVideoModal}>
              <span className={classes.Circle}>
                <svg height="120" width="120" stroke="white" strokeWidth="2" fill="none">
                  <circle cx="60" cy="60" r="55" />
                </svg>
              </span>

              <span className={classes.Logo}>
                <PlayArrow color="inherit" fontSize="inherit" />
              </span>
            </span>
          </div>

        </div>
      </div>

      <div className={videoModalClasses.join(' ')}>
        <div className={classes.Backdrop}></div>
        <button className={classes.CloseButton} onClick={closeVideoModal}>
          <Close color="inherit" fontSize="inherit" />
        </button>

        <div className={classes.VideoContainer}>
          {/* <video src={video} className={classes.Video}>
            <source src={video} type='video/mp4' /> 
          </video> */}
          <div className={classes.Video}>
            <Player ref={videoRef}>
              <source src={video} type='video/mp4' />
              <BigPlayButton position="center" className={classes.BigPlayButton} />
            </Player>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutVideo;
