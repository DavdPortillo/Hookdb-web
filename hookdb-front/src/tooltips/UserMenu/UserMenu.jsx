import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

import { removeLocalStorage } from "../../helpers/localStorageData";

import style from './css/userMenu.module.css';
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

export const UserMenu = ({ handleClickShow }) => {
    const isMediumScreen = useMediaQuery({ maxWidth: 992 });
    const { cleanTokenValue, user, userLoaded, language } = useContext(UserContext);
    const userMenu = language.header;

    const handleLogout = () => {
        handleClickShow();
        removeLocalStorage('token');
        cleanTokenValue();
    }

    const { name } = user;

    return (

        (userLoaded) && 
        (<div className={`${style.userOptions} `}>
            {(isMediumScreen) && <Link to="scores" className={`${style.userLink} `} onClick={handleClickShow}>{userMenu.myScores}</Link>}
            {(isMediumScreen) && <Link to="lists" className={`${style.userLink} `} onClick={handleClickShow}>{userMenu.myLists}</Link>}
            <Link to={`myFeed`} className={`${style.userLink} `} onClick={handleClickShow}>Mi feed</Link>
            <Link to={`profile/${name}`} className={`${style.userLink} `} onClick={handleClickShow}>{userMenu.settings}</Link>
            <Link to="/" className={`${style.userLink} `} onClick={handleLogout}>{userMenu.signOut}</Link>
        </div>)




    )
}
