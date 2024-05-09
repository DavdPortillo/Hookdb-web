import { useState } from 'react';

import { LogIn, SignUp } from './';

import style from '../css/authentication.module.css';
import generalize from '../../css/generalize.module.css';


export const Authentication = ({ onClickAuth }) => {

  const [showAccess, setShowAccess] = useState(true);

  const handleClick = () => {
    setShowAccess(!showAccess);
  };

  return (

    <div className={`${style.modalContainer} `}>


      <button className={`${style.modalBackground} ${generalize.buttonStyle}`} onClick={onClickAuth} ></button>
      <div className={`${style.modal}`} >
        <div className={`${style.titleContainer} `}>
          <h2 className={`${style.logo}`}>Peanut</h2>


          <button className={`${style.closeButton} `} onClick={onClickAuth}>
            <img src="../../../assets/global/cleanIcon.svg" height={16} width={16} alt="" />
          </button>

        </div>


        {(showAccess) ? <LogIn handleClick={handleClick} handleClickAuth={onClickAuth}/> : <SignUp handleClick={handleClick} handleClickAuth={onClickAuth}/>}

      </div>
    </div>

  )
}


