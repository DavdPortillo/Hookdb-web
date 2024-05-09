import { Link } from "react-router-dom";

import { getUserInformation, loginRequest } from "../../helpers/dataAPI";
import googleIcon from "../../../assets/global/google-icon.svg";
import style from "../css/access.module.css";
import generalize from "../../css/generalize.module.css";
import { UserContext } from "../../context/UserContext";
import { useContext, useEffect } from "react";
import { toast } from 'react-hot-toast';

export const LogIn = ({ handleClick, handleClickAuth }) => {
  const { changeTokenValue, changeUser, language } = useContext(UserContext);
  const logIn = language.modals.authentication.logIn;
  const warnings = language.warnings;


  const checkLogin = async (event, handleClickAuth, changeTokenValue, changeUser) => {
    event.preventDefault();

    const emailValue = document.getElementById('emailInput').value;
    const passwordValue = document.getElementById('passwordInput').value;
    let data
    try {
      data = await loginRequest(emailValue, passwordValue)
      toast.success(warnings.success.login)
    } catch (error) {
      toast.error(warnings.error.login)
    }

    try {
      const userInfo = await getUserInformation(data.id, data.accessToken);
      data.userImage = userInfo.image

    } catch (error) {
      console.error('error al obtener la info del user')
    }



    if (data) {


      localStorage.setItem("token", JSON.stringify(data.accessToken));
      changeTokenValue();
      changeUser(data)
      handleClickAuth();
    }

  }



  return (
    <div className={`${style.access}`}>
      <form action="" className={`${style.access_form}`}>
        <h3 className={`${style.title}`}>{logIn.logInH2}</h3>



        <input
          type="text"
          placeholder={logIn.emailInput}
          id="emailInput"
          className={`${style.inputText} ${generalize.inputTextStyle}`}
        />


        <input
          type="text"
          placeholder={logIn.passwordInput}
          id="passwordInput"
          className={`${style.inputText} ${generalize.inputTextStyle}`}
        />


        <div className={`${style.buttonContainer} `}>

          <button
            type="submit"
            className={`${style.button} ${style.loginButton}`}
            onClick={(event) =>
              checkLogin(event, handleClickAuth, changeTokenValue, changeUser)
            }
          >
            {logIn.accessButton}
          </button>

          <button type="submit" className={`${style.button}`}>
            <span>
              <img src={googleIcon} alt="" />
            </span>
            {logIn.accessGoogleButton}
          </button>
        </div>
      </form>

      <p className={`${style.linkText}`}>
        {logIn.dontHaveAcountText}
        <button
          className={`${generalize.linkStyle} ${style.linkTextEnphasis}`}
          onClick={handleClick}
        >
          {logIn.signInLink}
        </button>
      </p>
    </div>
  );
};

