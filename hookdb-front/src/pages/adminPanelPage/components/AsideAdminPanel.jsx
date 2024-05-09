import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../../context/UserContext';
import { removeLocalStorage } from '../../../helpers/localStorageData';

import style from '../css/asideAdminPanel.module.css';

export const AsideAdminPanel = ({changeCurrentTab, currentTab}) => {

    const { cleanTokenValue, language } = useContext(UserContext);
    const navigate = useNavigate();

    const adminPanelPage = language.adminPanelPage;

    const handleLogout = () =>{
        removeLocalStorage('token');
        cleanTokenValue();
        navigate("/");
    }

    return (

        <aside className={`${style.aside} `}>
            <section className={`${style.asideContainer} `}>
                <h2 className={`${style.titleSection} `}>{adminPanelPage.mainMenu.toUpperCase()}</h2>
                <nav className={`${style.navContainer} `}>
                    <button className={`${style.navItem} ${currentTab === 'userTab' && style.navItemSelected} `} onClick={() => changeCurrentTab('userTab')}>
                        <img src="../../../assets/global/userIconAdminPanel.svg" alt="" height={20} />
                        <p className={`${style.navItemDescription} `}>{adminPanelPage.nameTabs.users}</p>
                    </button>
                    <button className={`${style.navItem} ${currentTab === 'gameTab' && style.navItemSelected} `} onClick={() => changeCurrentTab('gameTab')}>
                        <img src="../../../assets/global/userIconAdminPanel.svg" alt="" height={20} />
                        <p className={`${style.navItemDescription} `}>{adminPanelPage.nameTabs.games}</p>
                    </button>
                    <button className={`${style.navItem} ${currentTab === 'newsTab' && style.navItemSelected} `} onClick={() => changeCurrentTab('newsTab')}>
                        <img src="../../../assets/global/userIconAdminPanel.svg" alt="" height={20} />
                        <p className={`${style.navItemDescription} `}>{adminPanelPage.nameTabs.news}</p>
                    </button>
                    <button className={`${style.navItem} ${currentTab === 'platformTab' && style.navItemSelected} `} onClick={() => changeCurrentTab('platformTab')}>
                        <img src="../../../assets/global/userIconAdminPanel.svg" alt="" height={20} />
                        <p className={`${style.navItemDescription} `}>{adminPanelPage.nameTabs.platforms}</p>
                    </button>
                    <button className={`${style.navItem} ${currentTab === 'genreTab' && style.navItemSelected} `} onClick={() => changeCurrentTab('genreTab')}>
                        <img src="../../../assets/global/userIconAdminPanel.svg" alt="" height={20} />
                        <p className={`${style.navItemDescription} `}>{adminPanelPage.nameTabs.genres}</p>
                    </button>
                    <button className={`${style.navItem} ${currentTab === 'languageTab' && style.navItemSelected} `} onClick={() => changeCurrentTab('languageTab')}>
                        <img src="../../../assets/global/userIconAdminPanel.svg" alt="" height={20} />
                        <p className={`${style.navItemDescription} `}>{adminPanelPage.nameTabs.languages}</p>
                    </button>
                    <button className={`${style.navItem} ${currentTab === 'developerTab' && style.navItemSelected} `} onClick={() => changeCurrentTab('developerTab')}>
                        <img src="../../../assets/global/userIconAdminPanel.svg" alt="" height={20} />
                        <p className={`${style.navItemDescription} `}>{adminPanelPage.nameTabs.developers}</p>
                    </button>
                    <button className={`${style.navItem} ${currentTab === 'distributorTab' && style.navItemSelected} `} onClick={() => changeCurrentTab('distributorTab')}>
                        <img src="../../../assets/global/userIconAdminPanel.svg" alt="" height={20} />
                        <p className={`${style.navItemDescription} `}>{adminPanelPage.nameTabs.distributors}</p>
                    </button>
                    <button className={`${style.navItem} ${currentTab === 'featuresTab' && style.navItemSelected} `} onClick={() => changeCurrentTab('featuresTab')}>
                        <img src="../../../assets/global/userIconAdminPanel.svg" alt="" height={20} />
                        <p className={`${style.navItemDescription} `}>{adminPanelPage.nameTabs.features}</p>
                    </button>
                    <button className={`${style.navItem} ${currentTab === 'productPlatformTab' && style.navItemSelected} `} onClick={() => changeCurrentTab('productPlatformTab')}>
                        <img src="../../../assets/global/userIconAdminPanel.svg" alt="" height={20} />
                        <p className={`${style.navItemDescription} `}>{adminPanelPage.nameTabs.productPlatforms}</p>
                    </button>
                    <button className={`${style.navItem} ${currentTab === 'productVendorTab' && style.navItemSelected} `} onClick={() => changeCurrentTab('productVendorTab')}>
                        <img src="../../../assets/global/userIconAdminPanel.svg" alt="" height={20} />
                        <p className={`${style.navItemDescription} `}>{adminPanelPage.nameTabs.productVendors}</p>
                    </button>
                    <button className={`${style.navItem} ${currentTab === 'productKeyTab' && style.navItemSelected} `} onClick={() => changeCurrentTab('productKeyTab')}>
                        <img src="../../../assets/global/userIconAdminPanel.svg" alt="" height={20} />
                        <p className={`${style.navItemDescription} `}>{adminPanelPage.nameTabs.productKeys}</p>
                    </button>
                    <button className={`${style.navItem} ${currentTab === 'productRegionTab' && style.navItemSelected} `} onClick={() => changeCurrentTab('productRegionTab')}>
                        <img src="../../../assets/global/userIconAdminPanel.svg" alt="" height={20} />
                        <p className={`${style.navItemDescription} `}>{adminPanelPage.nameTabs.productRegions}</p>
                    </button>
                    <button className={`${style.navItem} ${currentTab === 'productEditionTab' && style.navItemSelected} `} onClick={() => changeCurrentTab('productEditionTab')}>
                        <img src="../../../assets/global/userIconAdminPanel.svg" alt="" height={20} />
                        <p className={`${style.navItemDescription} `}>{adminPanelPage.nameTabs.productEditions}</p>
                    </button>
                    <button className={`${style.navItem} ${currentTab === 'dlcTab' && style.navItemSelected} `} onClick={() => changeCurrentTab('dlcTab')}>
                        <img src="../../../assets/global/userIconAdminPanel.svg" alt="" height={20} />
                        <p className={`${style.navItemDescription} `}>{adminPanelPage.nameTabs.dlcs}</p>
                    </button>
                    <button className={`${style.navItem} ${currentTab === 'numberPlayer' && style.navItemSelected} `} onClick={() => changeCurrentTab('numberPlayer')}>
                        <img src="../../../assets/global/userIconAdminPanel.svg" alt="" height={20} />
                        <p className={`${style.navItemDescription} `}>{adminPanelPage.nameTabs.numberPlayer}</p>
                    </button>
                    
                </nav>
            </section>
            <section>
                <h2 className={`${style.titleSection} `}>{adminPanelPage.settings.toUpperCase()}</h2>
                <nav>

                    <div className={`${style.navItem} `}  onClick={handleLogout}>
                        <img src="../../../assets/global/logoutIconAdminPanel.svg" alt="" height={20} width={20} />
                        <p className={`${style.navItemDescription} `}>{adminPanelPage.logOut}</p>
                    </div>
                </nav>
            </section>
        </aside>


    )
}
