import { useContext, useEffect, useState } from 'react';

import { GameCard } from './GameCard';

import style from '../css/upcomingReleases.module.css';
import generalize from '../../../css/generalize.module.css';
import { UserContext } from '../../../context/UserContext';
import { urlBeautify } from '../../../helpers/composeText';
import { useNavigate } from 'react-router-dom';

export const UpcomingReleases = ({ upcomingReleases }) => {
    const [topPopularGames, mostRecentGames] = upcomingReleases;
    const [activePopularTab, setActivePopularTab] = useState(true);
    const [activeTabName, setActiveTabName] = useState('popular');
    const { language } = useContext(UserContext);
    const mainPage = language.mainPage;
    const navigate = useNavigate();


    useEffect(() => {
        setActiveTabName(activePopularTab ? 'popular' : 'recent');
    }, [activePopularTab])
    
    const handleShowGames = () =>{
        navigate(`/followingGames/${urlBeautify(activeTabName)}`);
        window.scrollTo(0, 0);
    }

    const handleChangeTab = () => {
        setActivePopularTab(!activePopularTab);
    };

    return (
        <section className={`${style.container}`}>
            <h2 className={`${style.title}`}>{mainPage.upcomingReleases}</h2>
            <hr className={`${style.hr}`} />
            <div className={`${style.buttonListSection}`}>
                <button type="button" className={`${style.button} ${(activePopularTab) ? generalize.buttonStyle_active : generalize.buttonStyle_unselected} `} onClick={handleChangeTab}>{mainPage.popularTabText}</button>
                <button type="button" className={`${style.button} ${(activePopularTab) ? generalize.buttonStyle_unselected : generalize.buttonStyle_active}`} onClick={handleChangeTab}>{mainPage.newReleasesTabText}</button>
            </div>
            <div className={`${style.upcomingReleasesSection}`}>

                {
                    (activePopularTab) ?
                        topPopularGames.map(dataItem => (
                            <GameCard key={dataItem.id} data={dataItem} />
                        ))
                        :
                        mostRecentGames.map(dataItem => (
                            <GameCard key={dataItem.id} data={dataItem} />
                        ))



                }

                <button type="button" className={`${style.moreButton} ${generalize.buttonStyle_unselected} `} onClick={handleShowGames}>{mainPage.seeAllButton}</button>

            </div>

        </section>
    )
}
