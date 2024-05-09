import {
  loginRequest,
  signupRequest,
  updateUserData,
} from "../../helpers/dataAPI";

import style from '../css/access.module.css';
import generalize from '../../css/generalize.module.css';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { toast } from 'react-hot-toast';

export const SignUp = ({ handleClick, handleClickAuth }) => {

  const { changeTokenValue, changeUser, language } = useContext(UserContext);
  const signIn = language.modals.authentication.signIn;
  const warnings = language.warnings;

  const checkSignup = async (event, handleClickAuth) => {
    event.preventDefault();

    const userInput = document.getElementById("userInput");
    const emailInput = document.getElementById("emailInput");
    const passwordInput = document.getElementById("passwordInput");
    const confirmPasswordInput = document.getElementById("confirmPasswordInput");
    const checkbox = document.getElementById('remember');



    if (fieldsValidation(userInput, emailInput, passwordInput, confirmPasswordInput)) {
      const formData = new FormData();
      formData.append('username', userInput.value);
      formData.append('email', emailInput.value);
      formData.append('password', passwordInput.value);


      if (!checkbox.checked) {
        toast.error(warnings.error.acceptTerms);
        return;
      }

      try {
        await signupRequest(formData);
        toast.success(warnings.success.login, { duration: 2000 })



        const languageCode = navigator.language.split('-')[0];
        let language;
        if (languageCode === 'es') {
          language = 'spanish'
        } else {
          language = 'english'
        }
        const userInfo = await loginRequest(emailInput.value, passwordInput.value)

        const formDataLanguage = new FormData();
        formDataLanguage.append('updatedUser.language', language);
        await updateUserData(userInfo.id, formDataLanguage, userInfo.accessToken)

        const data = await loginRequest(emailInput.value, passwordInput.value)
        if (data) {

          localStorage.setItem("token", JSON.stringify(data.accessToken));
          changeTokenValue();
          changeUser(data)
          handleClickAuth();
        }
        handleClickAuth();



      } catch (error) {
        toast.error(warnings.error.signUpError);

      }



    }
  }

  const fieldsValidation = (username, email, password, confirmPassword) => {
    if (username.value === "") {
      toast.error(warnings.error.usernameEmpty);
      return false;
    }

    if (!/^[a-zA-Z]/.test(username.value)) {
      toast.error(warnings.error.usernameFirstLetter);
      return false;
    }

    if (!/^[a-zA-Z0-9_]{3,}$/.test(username.value)) {
      toast.error(warnings.error.usernameCharacters);
      return false;
    }

    if (email.value == "") {
      toast.error(warnings.error.emailEmpty);
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      toast.error(warnings.error.emailValid);

      return false;
    }

    if (password.value == "" || confirmPassword.value == "") {
      toast.error(warnings.error.passwordEmpty);

      return false;
    }

    if (password.value.length < 6) {
      toast.error(warnings.error.passwordCharacters);

      return false;
    }
    if (!/[!@#$%&(),.\-_]+/.test(password.value)) {
      toast.error(warnings.error.passwordSymbol);

      return false;
    }

    if (!/\d/.test(password.value)) {
      toast.error(warnings.error.passwordNumber);

      return false;
    }

    if (password.value != confirmPassword.value) {
      toast.error(warnings.error.passwordMatch);

      return false;
    }

    return true;
  }
  return (
    <div className={`${style.access}`}>
      <form action="" className={`${style.access_form}`}>
        <h3 className={`${style.title}`}>{signIn.logInH2}</h3>

        <div className={`${style.inputContainer}`}>
          <input
            type="text"
            placeholder={signIn.userInput}
            id="userInput"
            className={`${style.inputText2} ${generalize.inputTextStyle}`}
          />
          <input
            type="text"
            placeholder={signIn.emailInput}
            id="emailInput"
            className={`${style.inputText2} ${generalize.inputTextStyle}`}
          />
          <input
            type="text"
            placeholder={signIn.passwordInput}
            id="passwordInput"
            className={`${style.inputText2} ${generalize.inputTextStyle}`}
          />
          <input
            type="text"
            placeholder={signIn.confirmPasswordInput}
            id="confirmPasswordInput"
            className={`${style.inputText2} ${generalize.inputTextStyle}`}
          />
        </div>
        <div className={`${style.options_container} ${style.termsContainer} ${style.linkText}`}>
          <label className={`${style.checkboxLabel}`}>
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className={` ${style.inputCheckbox}`}
            />
            <span className={`${style.checkmark}`}></span>
            {signIn.acceptTermsAndConditionsCheckbox}
          </label>
        </div>


        <button
          type="submit"
          value={signIn.createAccountButton}
          className={`${style.button} ${style.signupButton} `}
          onClick={(event) => checkSignup(event, handleClickAuth)}
        >
          {signIn.createAccountButton}
        </button>
      </form>

      <p className={`${style.linkText}`}>
        {signIn.haveAcountText}
        <button
          className={`${generalize.linkStyle} ${style.linkTextEnphasis}`}
          onClick={handleClick}
        >
          {signIn.logInLink}
        </button>
      </p>
    </div>
  );


}


