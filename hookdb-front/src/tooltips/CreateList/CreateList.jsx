import { useContext, useEffect, useRef, useState } from 'react';
import style from './css/createList.module.css';
import generalize from '../../css/generalize.module.css';
import { createListbyUserId } from '../../helpers/dataAPI';
import { UserContext } from '../../context/UserContext';
import { toast } from 'react-hot-toast';

export const CreateList = ({ showMenu, handleAddNewList, handleClickShow }) => {


    const [nameList, setNameList] = useState('');
    const inputRef = useRef(null);
    const { user, userLoaded, language } = useContext(UserContext);
    const listPage = language.listPage.createListTooltip;
    const warnings = language.warnings;


    const handleChangeNameList = (event) => {
        setNameList(event.target.value);

    }

    useEffect(() => {

        if (showMenu && inputRef.current) {
            inputRef.current.focus();
        }

    }, [showMenu])


    const createList = async () => {
        if (nameList === '' ){
            toast.error(warnings.error.listNameEmpty)
            return;
        }
        
        if (!isNaN(nameList)){
            toast.error(warnings.error.listNameNotNumber)
            return;  
        } 
        if (nameList.length > 40 || nameList.length < 2) {
            toast.error(warnings.error.listNameLength)
            
            return
        }

        const nameListFormatted = nameList.replace(/\s+/g, ' ');

        let response;
        try{
            response = await createListbyUserId(user.id, nameListFormatted, user.accessToken);
            toast.success(warnings.success.createList)

        }catch(error){
            toast.error(warnings.error.listNameExist)
            console.error("Nombre de la lista existente")
        }
        

        if (response) {
            handleAddNewList(response);
            handleClickShow();
        }

    }

    useEffect(() => {

    }, [user, userLoaded])


    return (
        <article className={`${style.list}`}>
            {/* <div className={`${style.closeContainer} `}>
                <button className={`${style.button} `} onClick={handleClickShow}>
                    <img src="../../../assets/global/cleanIcon.svg" alt="" height={13} width={13} />
                </button>

            </div> */}
            <div className={`${style.createListSection} `}>
                <div className={`${style.listChild} ${style.nameList}`}>
                    <input ref={inputRef} className={`${style.inputText} `} type="text" name="" id="" placeholder={listPage.listNamePlaceholder} onChange={handleChangeNameList} />
                </div>
                <section className={`${style.addButttonContainer} ${style.listChild}`}>
                    <button className={`${generalize.buttonStyle_unselected} ${style.addButtton}`} onClick={createList}>{listPage.addButton}</button>
                </section>
            </div>

        </article>
    )
}
