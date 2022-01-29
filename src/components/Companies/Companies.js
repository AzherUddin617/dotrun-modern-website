import React, { useState, useEffect, useRef } from 'react';
import classes from './Companies.module.scss';

const companies = ["DOTRUN", "BLANDO", "WEBDEV", "GOOGLE", "MICROSOFT", "YOUTUBE", "FACEBOOK"];
const getAmount = ()=> {
  const n1 = window.innerWidth / 200 + 1;
  const n2 = n1 > companies.length ? n1 / companies.length : 1;
  return Math.round(n2 * 2);
};
const compAmount = getAmount();
const compAmoundArr = Array.apply(null, new Array(compAmount)).map(()=> 0);

const Companies = ({ scrollListener }) => {
  const [transX, setTransX] = useState(0);
  const contentRef = useRef();

  useEffect(()=> {
    const scrollHandler = ()=> {
      if (contentRef.current) {
        const Rect = contentRef.current.getBoundingClientRect();

        if (Rect.top - Rect.height - window.innerHeight <= 0 && Rect.top + Rect.height >= 0) {
          const minTransY = 0, maxTransY = window.innerWidth * 0.5;
          const bgY1 = window.pageYOffset + Rect.top - window.innerHeight - Rect.height;
          const bgY2 = bgY1 + window.innerHeight + Rect.height;
          const bgYP = (window.pageYOffset - bgY1) / (bgY2 - bgY1) * 100;
          const bgTransY = (maxTransY - minTransY) * bgYP / 100;
          setTransX(bgTransY);
        }
      }
    }
    scrollListener.add(scrollHandler);
    return ()=> scrollListener.remove(scrollHandler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.Companies}>
      <div className={classes.Contents} ref={contentRef} style={{
        transform: `translateX(-${transX}px)`
      }}>
        {compAmoundArr.map((_, i) => companies.map((company, j)=> (
          <h1 className={[classes.Title, j%2 ? classes.Odd:''].join(' ')} key={i+'-'+j}>{company}</h1>
        )))}
      </div>
    </div>
  );
}

export default Companies;