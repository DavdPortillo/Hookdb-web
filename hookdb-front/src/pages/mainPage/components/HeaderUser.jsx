import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useContext, useEffect, useRef, useState } from "react";

import { InputSearch } from "./";
import { UserMenu } from "../../../tooltips/UserMenu/UserMenu";
import { useCloseTool } from "../../../hooks/useCloseTool";
import { SearchButton } from "./SearchButton";


import style from '../css/header.module.css';
import generalize from '../../../css/generalize.module.css';
import { UserContext } from "../../../context/UserContext";

export const HeaderUser = () => {

    const isSmallScreen = useMediaQuery({ maxWidth: 768 });
    const [showSearcher, setShowSearcher] = useState(false);
    const { language, user } = useContext(UserContext);
    const userMenu = language.header;

    const menuRef = useRef(null);
    const { showMenu, handleClickShow } = useCloseTool(menuRef);

    const handleClickShowSearcher = () => {
        setShowSearcher(!showSearcher);
    }

    useEffect(() => {
        if (!isSmallScreen) {
            setShowSearcher(false);
        }
    }, [isSmallScreen]);

    const headerStyle = isSmallScreen ? (showSearcher ? style.mobileHeader : style.mobileHEader2) : '';
    return (
        <>

            <header className={`${style.header} ${headerStyle}`}>
                {(showSearcher) ? <InputSearch handleClickShowSearcher={handleClickShowSearcher} /> :
                    <>

                        <div className={`${style.link}`}>
                            <Link to="/" className={`${style.logo}`}>
                                <img src="../../../../assets/global/title.svg" alt="" height={25} className={`${style.title}`} />
                                <img src="../../../../assets/global/hookTitle.svg" alt="" height={32} className={`${style.hookTitle} `} />
                            </Link>

                        </div>

                        {
                            (!isSmallScreen) ? <InputSearch handleClickShowSearcher={handleClickShowSearcher} /> : <SearchButton handleClickShowSearcher={handleClickShowSearcher} />
                        }
                        <div className={`${style.link}`}>
                            <div className={`${style.userPanel} `}>
                                <Link to="scores" className={`${generalize.linkStyle} ${style.userPanelChild} ${style.hideUserLinks}`}>{userMenu.myScores}</Link>
                                <Link to="lists" className={`${generalize.linkStyle} ${style.userPanelChild} ${style.hideUserLinks}`}>{userMenu.myLists}</Link>
                                <div className={`${style.userSettingsContainer} ${style.userPanelChild}`}>
                                    <div className={`${style.userSettings} `}>
                                        <div className={`${style.userSection} `}>


                                            <div className={`${style.user} `} onClick={handleClickShow}>
                                                <div className={`${style.imageContainer} `}>
                                                    <img src={`${user.image ? user.image : '../../../../assets/global/userIconAdminPanel.svg'}`} alt="" height={25} width={25} className={`${style.userProfile} `} />

                                                </div>
                                                <div className={`${style.triangle} `}></div>
                                            </div>

                                            {showMenu && <div ref={menuRef}><UserMenu handleClickShow={handleClickShow} /></div>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </>}
            </header>
            <div className="gridLine" />
        </>
    )
}
