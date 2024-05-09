import { useState } from 'react';

import { AsideAdminPanel, HeaderAdminPanel } from './components';
import { UsersTab } from './tabs/usersTab/UsersTab';

import style from './adminPanelPage.module.css';
import { GameTab } from './tabs/gameTab/GameTab';
import { NewsTab } from './tabs/newsTab/NewsTab';
import { PlatformTab } from './tabs/platformTab/PlatformTab';
import { GenreTab } from './tabs/genreTab/GenreTab';
import { LanguageTab } from './tabs/language/LanguageTab';
import { DeveloperTab } from './tabs/developer/DeveloperTab';
import { DistributorTab } from './tabs/distributor/DistributorTab';
import { FeaturesTab } from './tabs/featuresTab/FeaturesTab';
import { ProductPlatformTab } from './tabs/productPlatformTab/ProductPlatformTab';
import { ProductVendorTab } from './tabs/productVendorTab/ProductVendorTab';
import { ProductKeyTab } from './tabs/ProductKeyTab/ProductKeyTab';
import { ProductRegionTab } from './tabs/regionProductTab/ProductRegionTab';
import { ProductEditionTab } from './tabs/editionProductTab/ProductEditionTab';
import { useMediaQuery } from 'react-responsive';
import generalize from '../../css/generalize.module.css';
import { DLCTab } from './tabs/dlcTab/DLCTab';
import { NumberPlayersTab } from './tabs/numberPlayerTab/NumberPlayersTab';


export const AdminPanelPage = () => {

  const [currentTab, setCurrentTab] = useState('userTab');
  const isSmall = useMediaQuery({ maxWidth: 992 })
  const [showAsideNav, setShowAsideNav] = useState(false);

  const changeShowAsideNav = () => {
    setShowAsideNav(!showAsideNav)
  }

  const changeCurrentTab = (nameTab) => {
    setCurrentTab(nameTab);
  }



  return (
    <div className={`${style.adminContainer} `}>

      <HeaderAdminPanel />
      {(!isSmall) ? <AsideAdminPanel changeCurrentTab={changeCurrentTab} currentTab={currentTab} /> : <div className={`${style.buttonContainer} `}><button className={`${style.buttonAside} ${generalize.buttonStyle_active}`} onClick={changeShowAsideNav}> - </button></div>}
      {
        changeTab(currentTab)
      }
      {(showAsideNav && isSmall) &&
        <div className={`${style.modal} `}>
          <button className={`${style.closeButton} `} onClick={changeShowAsideNav}></button>

          <div className={`${style.tooltip} `}>
            <div className={`${style.closeButtonContainer} `}>
              <img src="../../../assets/global/cleanIcon.svg" alt="" height={20} onClick={changeShowAsideNav} />
            </div>
            <AsideAdminPanel changeCurrentTab={changeCurrentTab} currentTab={currentTab} />        </div>

        </div>}



    </div>
  )
}


const changeTab = (nameTab) => {
  switch (nameTab) {
    case 'userTab':
      return <UsersTab />
    case 'gameTab':
      return <GameTab />
    case 'newsTab':
      return <NewsTab />
    case 'platformTab':
      return <PlatformTab />
    case 'genreTab':
      return <GenreTab />
    case 'languageTab':
      return <LanguageTab />
    case 'developerTab':
      return <DeveloperTab />
    case 'distributorTab':
      return <DistributorTab />
    case 'featuresTab':
      return <FeaturesTab />
    case 'productPlatformTab':
      return <ProductPlatformTab />
    case 'productVendorTab':
      return <ProductVendorTab />
    case 'productKeyTab':
      return <ProductKeyTab />

    case 'productRegionTab':
      return <ProductRegionTab />
    case 'productEditionTab':
      return <ProductEditionTab />
    case 'dlcTab':
      return <DLCTab />

      case 'numberPlayer':
        return <NumberPlayersTab />
  
    default:
      break;
  }
}
