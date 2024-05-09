import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import { InputSearch } from "./";

import style from '../css/header.module.css';
import generalize from '../../../css/generalize.module.css';
import { useContext, useEffect, useState } from "react";
import { SearchButton } from "./SearchButton";
import { UserContext } from "../../../context/UserContext";
export const HeaderGuest = ({ onClickAuth }) => {

  const isSmallScreen = useMediaQuery({ maxWidth: 768 });
  const [showSearcher, setShowSearcher] = useState(false);
  const { language } = useContext(UserContext)
  const handleClickShowSearcher = () => {
    setShowSearcher(!showSearcher);
  }

  useEffect(() => {
    if (!isSmallScreen) {
      setShowSearcher(false);
    }
  }, [isSmallScreen]);



  return (



    <>

      <header className={`${style.header} 
        ${(isSmallScreen && !showSearcher) ? style.mobileHEader2 : ''} 
        ${(isSmallScreen && showSearcher) ? style.mobileHeader : ''}`}>
        {(showSearcher) ? <InputSearch handleClickShowSearcher={handleClickShowSearcher} /> :
          <>
            <div className={`${style.link}`}>
              <Link to="/" className={`${style.logo}`} >
                <img src="../../../../assets/global/title.svg" alt="" height={25} className={`${style.title}`}/>
                <img src="../../../../assets/global/hookTitle.svg" alt="" height={32} className={`${style.hookTitle} `}/>
              </Link>

            </div>
            {
              (!isSmallScreen) ? <InputSearch handleClickShowSearcher={handleClickShowSearcher} /> : <SearchButton handleClickShowSearcher={handleClickShowSearcher} />

            }
            <div className={`${style.link}`}>
              <div className={`${style.identify} `}>
                <Link className={`${generalize.linkStyle}`} onClick={onClickAuth}>{language.header.identify}</Link>
              </div>

            </div>
          </>
        }
      </header>
      <div className="gridLine" />
    </>




  )
}

