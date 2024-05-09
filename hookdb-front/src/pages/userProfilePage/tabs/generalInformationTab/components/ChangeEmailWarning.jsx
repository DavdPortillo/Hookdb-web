import style from '../css/changeEmailWarning.module.css'
import generalize from '../../../../../css/generalize.module.css'
import { useContext } from 'react';
import { UserContext } from '../../../../../context/UserContext';

export const ChangeEmailWarning = ({ changeDisplayWarning, handleChangeValue, saveInfo }) => {

    const {language } = useContext(UserContext);
    const tab = language.userProfilePage.generalInformationTab.profileSection.changeEmailModal;

    return (
        <div className={`${style.modalContainer} `}>


            <button className={`${style.modalBackground} ${generalize.buttonStyle}`} onClick={changeDisplayWarning} ></button>
            <div className={`${style.modal}`} >
                <div className={`${style.titleContainer} `}>
                    <h3 className={`${style.title} `}>{tab.title}</h3>

                    <p className={`${style.warningText} `}>{tab.description}</p>
                    <button className={`${style.closeButton} `} onClick={changeDisplayWarning}>
                        <img src="../../../assets/global/cleanIcon.svg" height={16} width={16} alt="" />
                    </button>
                    <input onChange={handleChangeValue} type="text" className={`${generalize.inputTextStyle} ${style.input}`}  id='password'/>

                    <div className={`${style.buttonContainer} `}>
                        <button className={`${style.button} `} onClick={changeDisplayWarning}>{tab.cancelButton}</button>
                        <button className={`${style.button} `} onClick={saveInfo}>{tab.confirmButton}</button>
                    </div>
                </div>




            </div>
        </div>



    )
}

