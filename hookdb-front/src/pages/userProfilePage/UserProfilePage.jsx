import { useState } from 'react';

import { ProfileAside } from './components';
import { AccountTab, GeneralInformationTab } from './tabs';

import style from './css/userProfilePage.module.css';
import generalize from '../../css/generalize.module.css';
import { UserTabMenu } from '../../tooltips/userTabMenu/UserTabMenu';
import { FollowedGamesTab } from './tabs/followedGamesTab/FollowedGamesTab';
import { IgnoredGamesTab } from './tabs/ignoredGamesTab/IgnoredGamesTab';



export const UserProfilePage = () => {



    const [activeTab, setActiveTab] = useState('general');

    const [showTabMenu, setShowTabMenu] = useState(false);
    const handlChangeTab = (nameTab) => {
        setActiveTab(nameTab);
    }

    const changeShowTabMenu = () => {
        setShowTabMenu(!showTabMenu)
    }




    //Switches components based on the given parameter
    const changeTab = (activeTab) => {

        switch (activeTab) {
            case 'general':
                return <GeneralInformationTab/>; 
            case 'cuenta':
                return <AccountTab />;
            case 'seguidos':
                return <FollowedGamesTab />;
            case 'ignorados':
                return <IgnoredGamesTab />;

            default:
                throw Error("No cumple ninguna opción");
        }

    };


    return (
        <div className={`${style.profile} `}>
            <button className={`${style.tabButton} ${generalize.buttonStyle_active}`} onClick={changeShowTabMenu}>Pestañas</button>
            {showTabMenu && <UserTabMenu changeShowTabMenu={changeShowTabMenu} handlChangeTab={handlChangeTab} />}
            <div className={`${style.profileAsideContainer} `}>
                <ProfileAside handlChangeTab={handlChangeTab} />

            </div>
            <main className={`${style.content} `}>
                {

                    changeTab(activeTab)

                }
            </main>


        </div>
    )
}

