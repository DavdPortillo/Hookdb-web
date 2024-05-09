
import { CriticsTab, DlcsTab, GeneralTab, PricesTab } from '../tabs';

import style from '../css/tab.module.css';
import { NewsGameTab } from '../tabs/newsTab/NewsGameTab';

export const Tab = ({ activeTab, dataGame }) => {
  const contentTab = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralTab dataGame={dataGame}/>;
      case 'precios':
        return <PricesTab dataGame={dataGame.game.products}/>;
      case 'criticas':
        return <CriticsTab dataGame={dataGame}/>;
      case 'dlcs':
        return <DlcsTab dataGame={dataGame}/>;
      case 'noticias':
        return <NewsGameTab data={dataGame}/>;
    }
  };

  return (

    <div className={`${style.tab}`}>
      <div className={`${style.tabContainer}`}>

        {
          contentTab()
        }
      </div>

    </div>


  )
}

