import React, { useState, useEffect } from 'react';
import './App.scss';

import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import LeftButton from './components/Ui/LeftButton/LeftButton';
import RightLinks from './components/Ui/RightLinks/RightLinks';

import smokeVideo from './assets/smoke-2.mp4';
import AboutVideo from './components/AboutVideo/AboutVideo';
import Projects from './components/Projects/Projects';
import Office from './components/Office/Office';
import Companies from './components/Companies/Companies';
import News from './components/News/News';
import { animateScroll as scroll, Events } from 'react-scroll';
import Footer from './components/Footer/Footer';

function enableSmoothScroll(disable) {
  function easeOut (t, b, c, d) {
    t /= d;
    return -c * t*(t-2) + b;
  };
  
  function smoothScroll(delta, duration) {
    let scrollAmount = 0, scrolled = 0, startPosition = 0;
    let scrolling = false;
    scrollAmount += delta - (scrolled - startPosition);
    startPosition = window.pageYOffset;
    let startTime = null;
    console.log('scrollAmount :>> ', scrollAmount, delta, scrolled);
    
    const animationFrame = (timestamp)=> {
      if (startTime === null) {
        startTime = timestamp;
      }
      const timeElapsed = timestamp - startTime;
      const scrollValue = easeOut(timeElapsed, startPosition, scrollAmount, duration);
      scrolled = scrollValue;
      // console.log('scrollValue :>> ', scrollValue, timestamp, timeElapsed, startTime, startPosition, delta, duration);
      window.scrollTo(0, scrollValue);
      // window.scrollBy(0, scrollValue);
      
      if (timeElapsed < duration) {
        window.requestAnimationFrame(animationFrame);
      } else {
        scrollAmount = 0;
        scrolled = 0;
        scrolling = false;
      }
    }
    window.cancelAnimationFrame(animationFrame)
    window.requestAnimationFrame(animationFrame);
    if (!scrolling) {
      scrolling = true;
    }
  }

  function preventDefault(e) {
    e.preventDefault();
    // console.log('e :>> ', e);
    let dir = 1;
    if (e.deltaY < 0) dir = -1;
    smoothScroll(Math.max(120 * dir, e.deltaY), 600);
  }
  
  // modern Chrome requires { passive: false } when adding event
  var supportsPassive = false;
  try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
      get: function () { supportsPassive = true; } 
    }));
  } catch(e) {}
  
  var wheelOpt = supportsPassive ? { passive: false } : false;
  var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
  
  // call this to Disable
  function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    // window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  }
  
  // call this to Enable
  function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
    // window.removeEventListener('touchmove', preventDefault, wheelOpt);
  }

  disableScroll();
  if (disable) enableScroll();
}

let firstTime = true;
const scrollEvent = (disable) => {
  
  function wheelScrollHandler(e) {
    e.preventDefault();

    let dir = 1;
    if (e.deltaY < 0) dir = -1;
    // const delta = Math.max(100, Math.abs(e.deltaY));
    const delta = Math.abs(e.deltaY) * 1.4;
    smoothScroll(delta * dir);
  }

  // modern Chrome requires { passive: false } when adding event
  var supportsPassive = false;
  try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
      get: function () {
        supportsPassive = true;
        return supportsPassive;
      }
    }));
  } catch (e) {}

  var wheelOpt = supportsPassive ? {
    passive: false
  } : false;
  var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

  // call this to Disable
  function disableScroll() {
    // window.addEventListener('DOMMouseScroll', wheelScrollHandler, false); // older FF
    // window.addEventListener(wheelEvent, wheelScrollHandler, wheelOpt); // modern desktop
    window.addEventListener('wheel', wheelScrollHandler, wheelOpt);
  }
  // call this to Enable
  function enableScroll() {
    window.removeEventListener('DOMMouseScroll', wheelScrollHandler, false);
    window.removeEventListener(wheelEvent, wheelScrollHandler, wheelOpt); 
    // window.removeEventListener('touchmove', preventDefault, wheelOpt);
  }

  if (!disable) disableScroll();
  if (disable) enableScroll();
}

let winY = window.pageYOffset;
let scrollValue = 0;
let scrollEnd = true, scrolling = false, scrollTimeout = null;

Events.scrollEvent.register('start', ()=> {

  scrolling = true;
});
Events.scrollEvent.register('end', ()=> {
  if (scrollTimeout) clearTimeout(scrollTimeout);

  scrollTimeout = setTimeout(()=> {
    if (!scrolling) {
      scrollEnd = true;
      scrolling = false;
    }
  }, 400);
});

function smoothScroll (delta) {
  if (
    firstTime || scrollEnd ||
    window.pageYOffset <= 0 ||
    Math.abs((window.pageYOffset + window.innerHeight) - document.body.getBoundingClientRect().height) <= 1
  ) {
    winY = window.pageYOffset;
    scrollValue = 0;
    firstTime = false;
  }

  scrollEnd = false;

  const offset = window.pageYOffset - winY;
  winY = window.pageYOffset;
  scrollValue -= offset;
  scrollValue += delta * 1.8;

  const settings = {
    duration: 1000,
    smooth: 'easeOutCubic'
  };

  if (scrollValue + window.pageYOffset < 0) {
    scrollValue = -window.pageYOffset;
  } else if (scrollValue + window.pageYOffset > document.body.getBoundingClientRect().height) {
    scrollValue = document.body.getBoundingClientRect().height - window.pageYOffset;
  }

  if (delta > 0) {
    scroll.scrollMore(scrollValue, settings);
  }
  else if (delta < 0) {
    scroll.scrollMore(scrollValue, settings);
  }
}

// Chrome 1 - 79
var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

function App() {
  const [scrollHandlers, setScrollHandlers] = useState([]);

  // useEffect(()=> {
  //   if (isChrome)
  //     scrollEvent();
  //   return ()=> isChrome && scrollEvent(true);
  // }, []);

  useEffect(()=> {
    const scrollEvent = ()=> scrollHandlers.forEach(handler => handler());
    window.addEventListener('scroll', scrollEvent);

    return ()=> window.removeEventListener('scroll', scrollEvent);
  }, [scrollHandlers]);

  const addScrollHandler = handler => {
    setScrollHandlers(prev => prev.concat(handler));
  }
  const removeScrollHandler = handler => {
    const removeIndex = scrollHandlers.indexOf(handler);
    setScrollHandlers(prev => prev.filter((h, i) => i !== removeIndex ));
  }
  const scrollListener = {
    add: addScrollHandler,
    remove: removeScrollHandler
  };

  return (
    <div className="App">
      <div className="video_bg">
        <div className="shade"></div>
        <div className="shade2"></div>
        <video className='videoTag' autoPlay loop muted>
          <source src={smokeVideo} type='video/mp4' />
        </video>  
      </div>

      <Header scrollListener={scrollListener} />
      <LeftButton />
      <RightLinks />

      <Hero scrollListener={scrollListener} />
      <AboutVideo scrollListener={scrollListener} />
      <Projects />
      <Office scrollListener={scrollListener} />
      <Companies scrollListener={scrollListener} />
      <News />

      <Footer />
    </div>
  );
}

export default App;
