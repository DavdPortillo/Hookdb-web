import style from '../../css/userProfilePage.module.css';
import generalize from '../../../../css/generalize.module.css';
import { useContext, useEffect, useState } from 'react';
import { removeLocalStorage } from '../../../../helpers/localStorageData';
import { UserContext } from '../../../../context/UserContext';
import { deleteUserData } from '../../../../helpers/dataAPI';

export const AccountTab = () => {

  const [input, setInput] = useState('')
  const { user, cleanTokenValue, language } = useContext(UserContext)
  const [enableDeleteButton, setEnableDeleteButton] = useState(true)
  const listPage = language.userProfilePage.accountTab;


  const handleInputChange = (event) => {
    const inputText = event.target.value;
    setInput(inputText)


  }

  const deleteAccount = async () => {

    await deleteUserData(user.id, user.accessToken)
    removeLocalStorage('token');
    cleanTokenValue();


  }

  useEffect(() => {
    if (input == user.name) {
      setEnableDeleteButton(true)
    } else {
      setEnableDeleteButton(false)
    }
  }, [input, user])


  return (
    <>
      <h1 className={`${style.title} `}>{listPage.tabTitle}</h1>
      <p className={`${style.pDescription} `}>{listPage.tabDescription}</p>
      <section className={`${style.section}`}>
        <h2 className={`${style.subtitle} `}>{listPage.deleteAccount.title}</h2>
        <hr className={`${style.hr} `} />
        <p className={`${style.deleteAccountDescription} `}>{listPage.deleteAccount.description}</p>

        <div className={`${style.deleteAccount} `}>

          <input type="text" name="" id="" className={`${generalize.inputTextStyle} ${style.inputDeleteAccount}`} value={input} onChange={handleInputChange} placeholder={listPage.deleteAccount.deleteInput} />
          <button className={` ${style.deleteButton} ${enableDeleteButton ? generalize.buttonStyle_active : generalize.buttonStyle_disabled}`} onClick={deleteAccount} disabled={!enableDeleteButton} >{listPage.deleteAccount.deleteAccountButton}</button>

        </div>
      </section>

    </>
  )
}
