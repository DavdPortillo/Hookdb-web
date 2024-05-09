
import style from '../css/changePasswordWarning.module.css'
import generalize from '../../../../../css/generalize.module.css'
import { useContext } from 'react'
import { UserContext } from '../../../../../context/UserContext'
export const ChangePasswordWarning = ({ changeDisplayWarningPasword, handleChangePassword, savePassword }) => {

    const {language} = useContext(UserContext);
    const tab = language.userProfilePage.generalInformationTab.profileSection.changePasswordModal;

    return (
        <div className={`${style.modalContainer} `}>


            <button className={`${style.modalBackground} ${generalize.buttonStyle}`} onClick={changeDisplayWarningPasword} ></button>
            <div className={`${style.modal}`} >
                <div className={`${style.titleContainer} `}>
                    <div className={`${style.titleDescriptionContainer} `}>
                        <h3 className={`${style.title} `}>{tab.title}</h3>

                        <p className={`${style.warningText} `}>{tab.description}</p>
                    </div>
                    <button className={`${style.closeButton} `} onClick={changeDisplayWarningPasword}>
                        <img src="../../../assets/global/cleanIcon.svg" height={16} width={16} alt="" />
                    </button>
                    <label className={`${style.label} `}>{tab.oldPasswordLabel}
                        <input onChange={handleChangePassword} type="text" className={`${generalize.inputTextStyle} ${style.input}`} id='oldPassword' />
                    </label>
                    <label className={`${style.label} `}>{tab.newPasswordLabel}
                        <input onChange={handleChangePassword} type="text" className={`${generalize.inputTextStyle} ${style.input}`} id='newPassword' />
                    </label>
                    <label className={`${style.label} `}>{tab.repeatNewPasswordLabel}
                        <input onChange={handleChangePassword} type="text" className={`${generalize.inputTextStyle} ${style.input}`} id='newPasswordCheck' />
                    </label>

                    <div className={`${style.buttonContainer} `}>
                        <button className={`${style.button} `} onClick={changeDisplayWarningPasword}>{tab.cancelButton}</button>
                        <button className={`${style.button} `} onClick={savePassword}>{tab.confirmButton}</button>
                    </div>
                </div>




            </div>
        </div>



    )
}

