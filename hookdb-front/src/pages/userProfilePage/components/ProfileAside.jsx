import { Link } from 'react-router-dom';

import { removeLocalStorage } from '../../../helpers/localStorageData';

import style from '../css/profileAside.module.css';
import generalize from '../../../css/generalize.module.css';
import { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';


export const ProfileAside = ({ handlChangeTab }) => {
    const { cleanTokenValue, language} = useContext(UserContext);
    const aside = language.userProfilePage.asideSection;

    const handleLogout = () => {
        removeLocalStorage('token');
        cleanTokenValue();
    }
    return (

        <aside className={`${style.navigationPanel} `}>
            <nav className={`${style.nav} `}>
                <button className={`${generalize.buttonStyle} ${generalize.linkStyle} ${style.navButton}`} onClick={() => handlChangeTab('general')}>{aside.generalInformationLink}</button>
                <button className={`${generalize.buttonStyle} ${generalize.linkStyle} ${style.navButton}`} onClick={() => handlChangeTab('seguidos')}>{aside.followedGamesLink}</button>
                <button className={`${generalize.buttonStyle} ${generalize.linkStyle} ${style.navButton}`} onClick={() => handlChangeTab('ignorados')}>{aside.ignoredGamesLink}</button>
                <button className={`${generalize.buttonStyle} ${generalize.linkStyle} ${style.navButton}`} onClick={() => handlChangeTab('cuenta')}>{aside.personalInformationLink}</button>
            </nav>
            <Link to="/" className={`${generalize.buttonStyle_active} ${style.logoutButton}`} onClick={handleLogout}>{aside.logOutButton}</Link>
        </aside>

    )
}
