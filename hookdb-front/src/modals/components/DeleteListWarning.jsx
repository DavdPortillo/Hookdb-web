import style from '../css/deleteListWarning.module.css'
import generalize from '../../css/generalize.module.css'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'

export const DeleteListWarning = ({ changeDisplayWarning, handleDeleteList, id }) => {

    const {language} = useContext(UserContext)
    const listPage = language.listPage.deleteModal;

    return (
        <div className={`${style.modalContainer} `}>


            <button className={`${style.modalBackground} ${generalize.buttonStyle}`} onClick={changeDisplayWarning} ></button>
            <div className={`${style.modal}`} >
                <div className={`${style.titleContainer} `}>
                    <h3 className={`${style.title} `}>{listPage.title}</h3>

                    <p className={`${style.warningText} `}>{listPage.description}</p>
                    <button className={`${style.closeButton} `} onClick={changeDisplayWarning}>
                        <img src="../../../assets/global/cleanIcon.svg" height={16} width={16} alt="" />
                    </button>

                    <div className={`${style.buttonContainer} `}>
                        <button className={`${style.button} `} onClick={changeDisplayWarning}>{listPage.cancelButton}</button>
                        <button className={`${style.button} `} onClick={() =>handleDeleteList(id)}>{listPage.deleteButton}</button>
                    </div>
                </div>




            </div>
        </div>



    )
}
