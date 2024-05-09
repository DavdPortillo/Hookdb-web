import { useEffect, useRef, useState } from 'react';

import style from '../css/dlc.module.css';

export const Dlc = ({ dlcData }) => {

  const [isTextTruncated, setIsTextTruncated] = useState(null);
  const [showButton, setShowButton] = useState(isTextTruncated);
  const [change, setChange] = useState(false);

  const contentRef = useRef(null);

  const handleClickSeeMore = () => {
    setChange(!change)
  }

  useEffect(() => {
    const checkOverflow = () => {
      const isTextOverflowing = contentRef.current.scrollHeight > contentRef.current.clientHeight;
      setIsTextTruncated(isTextOverflowing);
      setShowButton(isTextOverflowing);
    };
  
    window.addEventListener('load', checkOverflow);
  
    return () => window.removeEventListener('load', checkOverflow);
  }, []);

  return (
    <article className={`${style.dlcContainer} ${change ? style.dlcContainerFlexible : ''} `}>
      <section className={`${style.imageContainer} ${change ? style.imageContainerFlexible : ''}`}>
        <img src="../../../../../assets/alanWake.webp" alt="" className={`${style.image} `} />
      </section>
      <section className={`${style.dlcInfo}  ${!isTextTruncated ? '' : style.dlcInfoFlexible} `}>
        <h2 className={`${style.dlcTitle} `}>{dlcData.name} ({getYear(dlcData.date)})</h2>
        <p ref={contentRef} className={`${style.dlcContent}  ${change ? style.dlcContentNotTrucated : ''}`}>{dlcData.sinopsis}</p>
        {
          showButton &&
          <div className={`${style.readMoreContainer} `}>
            <button className={`${style.readMoreButton} `} onClick={handleClickSeeMore}>Leer más</button>

          </div>
        }
      </section>

    </article>
  )
}

const getYear = (date) => {
  const formatDate = new Date(date)

  return formatDate.getFullYear();
}