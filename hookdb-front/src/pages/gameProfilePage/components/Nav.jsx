import { useContext, useState } from 'react';

import style from '../css/nav.module.css';
import { UserContext } from '../../../context/UserContext';

const tabs = ['general', 'prices', 'critics', 'dlcs', 'news'];
//['general', 'precios', 'criticas', 'dlcs', 'noticias']
const tabItems = ['general', 'precios', 'criticas', 'dlcs', 'noticias'];


export const Nav = ({ tabInfo, changeTab, news }) => {

  const [selectedTab, setSelectedTab] = useState('general');
  const { language } = useContext(UserContext);
  const page = language.gameProfilePage;
  const tabLanguage = page.tabNames;

  const isActive = (tab) => {
    return (selectedTab === tab) ? style.selectedTab : '';
  }


  return (

    <nav className={`${style.navitagtion}`}>
      <ul className={`${style.listLink}`}>

        {

          tabItems.map((tab, i) => {

            return <li className={`${style.listItem} ${isActive(tab)}`}
              onClick={() => { setSelectedTab(tab); changeTab(tab) }}
              key={tab}>{tabLanguage[i].charAt(0).toUpperCase() + tabLanguage[i].slice(1)} {hasData(tabs[i], tabInfo)}</li>

          })
        }
      </ul>
    </nav>
  )
}


const hasData = (tab, tabInfo) => {

  return Object.prototype.hasOwnProperty.call(tabInfo, tab) ? `[${tabInfo[tab]}]` : '';
};
