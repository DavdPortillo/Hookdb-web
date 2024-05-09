import { useContext, useState } from 'react';

import { deleteGameFromList } from '../../../helpers/dataAPI';
import { UserContext } from '../../../context/UserContext';

import style from '../css/listToolTip.module.css';

export const ListToolTip = ({ listData, fetchAddGameToList, idGame }) => {

    const [isChecked, setIsChecked] = useState(listData.isThisGameInList);
    const {user} = useContext(UserContext);

    const handleCheckboxChange = async () => {
        setIsChecked(!isChecked);
        if(!isChecked){
            await fetchAddGameToList(listData.id);
        }else{
            await deleteGameFromList(user.id, listData.id, idGame, user.accessToken)
        }
        
    };
    
    return (

        <div className={`${style.list} ${style.linkText}`}>
            <label className={`${style.checkboxLabel}`}>
                <input type="checkbox" id="remember" name="remember" className={` ${style.inputCheckbox}`} 
                    checked={isChecked}
                    onChange={handleCheckboxChange} />
                <span className={`${style.checkmark}`}></span>
                <p className={`${style.inputText} `}>{listData.name}</p>
            </label>
        </div>

    )
}
