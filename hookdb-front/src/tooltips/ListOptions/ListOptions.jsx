
import { useContext } from 'react';
import style from './css/listOptions.module.css';
import { UserContext } from '../../context/UserContext';

export const ListOptions = ({ stopPropagation, handleEditList, changeDisplayWarning}) => {
    const { language } = useContext(UserContext);
    const listPage = language.listPage;
    
    return (
        <div className={`${style.listOptions} `} onClick={stopPropagation}>
            <button className={`${style.options} `} onClick={handleEditList}>{listPage.listOptions.renameButton}</button>
            <button className={`${style.options} `} onClick={changeDisplayWarning} >{listPage.listOptions.deleteButton}</button>
        </div>
    )
}
