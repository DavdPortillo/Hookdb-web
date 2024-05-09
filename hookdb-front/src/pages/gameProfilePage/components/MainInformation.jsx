import { useContext, useEffect, useRef, useState } from 'react';

import { PlatformTag, Nav, GameplayFeatures, Score, UserScore } from './';
import { Lists } from '../../../tooltips/List/Lists';
import { useCloseTool } from '../../../hooks/useCloseTool';

import style from '../css/mainInformation.module.css';
import generalize from '../../../css/generalize.module.css';
import { setIfFollowOrIgnore } from '../../../helpers/dataAPI';
import { Authentication } from '../../../modals/components';
import { UserContext } from '../../../context/UserContext';

export const MainInformation = ({ changeTab, dataGame, userData, idGame }) => {
    const { user, userLoaded } = userData;
    const menuRef = useRef(null);

    const { showMenu, handleClickShow } = useCloseTool(menuRef);
    const [buttons, setButtons] = useState(null);
    
    const { language } = useContext(UserContext);
    const page = language.gameProfilePage;
    
    const [showAuth, setShowAuth] = useState(false);

    const changeShowAuth = () => {
        setShowAuth(!showAuth);
    }

    const isAuthenticate = () => {
        if (userLoaded) {
            handleClickShow();
        } else {
            changeShowAuth();
        }
    }



    const handleClickButton = async (value) => {
        if (!userLoaded) {
            changeShowAuth()
            return;
        }

        switch (value) {
            case page.ignoreButton:
                await setIfFollowOrIgnore(user.id, dataGame.game.id, -1, userData.user.accessToken)
                setButtons(page.ignoredButton);
                break;

            case page.ignoredButton:
                await setIfFollowOrIgnore(user.id, dataGame.game.id, 0, userData.user.accessToken)
                setButtons(page.ignoreButton);
                break;

            case page.followButton:
                await setIfFollowOrIgnore(user.id, dataGame.game.id, 1, userData.user.accessToken)
                setButtons(page.followingButton);
                break

            case page.followingButton:
                await setIfFollowOrIgnore(user.id, dataGame.game.id, 0, userData.user.accessToken)
                setButtons(page.followButton);

        }


    }

    useEffect(() => {
        if (userLoaded) {
            if (dataGame.isFollowing == -1) {
                setButtons(page.ignoredButton)
            } else if (dataGame.isFollowing == 1) {
                setButtons(page.followingButton)
            }
        }

    }, [dataGame.isFollowing, userLoaded])



    const ignoreButtonValue = (buttons === page.ignoredButton) ? page.ignoredButton : page.ignoreButton;
    const followButtonValue = (buttons === page.followingButton) ? page.followingButton : page.followButton;




    return (
        <main className={`${style.mainInformation}`}>

            <div className={`${style.titleContainer}`}>
                <h1 className={`${style.title}`}>{dataGame.game.title}</h1>
                {isReleased(dataGame.game.date)}
            </div>
            <div className={`${style.gameDetailsContainer}`}>
                <section className={`${style.coverContainer}`}>
                    <img src={dataGame.game.cover} alt={dataGame.game.alt} height={215} width={460} className={`${style.cover}`} />
                </section>

                <section className={`${style.actionButtonSection} `}>
                    <div className={`${style.actionButtonContainer}`}>
                        <div className={`${style.buttonContainer} `}>
                            <button className={`${style.button} ${generalize.buttonStyle_unselected} `} onClick={isAuthenticate}>{page.addToListButton}</button>
                            {showMenu && userLoaded && <div ref={menuRef} className={`${style.listContainer} `}><Lists idGame={idGame} handleClickShow={handleClickShow} /></div>}
                        </div>
                        <div className={`${style.buttonContainer} `}>
                            <button className={`${style.button} ${buttons === page.ignoredButton ? generalize.buttonStyle_selected : generalize.buttonStyle_unselected}`}
                                onClick={() => handleClickButton(ignoreButtonValue)}>{ignoreButtonValue}</button>

                        </div>
                        <div className={`${style.buttonContainer} `}>
                            <button className={`${style.button} ${buttons === page.followingButton ? generalize.buttonStyle_selected : generalize.buttonStyle_unselected}`}
                                onClick={() => handleClickButton(followButtonValue)}>
                                {followButtonValue}
                            </button>
                        </div>
                    </div>
                </section>
                <section className={`${style.gameInformation}`}>


                    <div className={`${style.providersContainer}`}>
                        <p className={`${style.text} ${generalize.textDescription}`}>{page.developer}: <span>{linkDistributorsAndDevelopers(dataGame.game.developers)}</span> </p>
                        <p className={`${style.text} ${generalize.textDescription}`}>{page.distributor}: <span>{linkDistributorsAndDevelopers(dataGame.game.distributors)}</span> </p>
                        <p className={`${style.text}`}>{page.platform}:</p>
                        <div className={`${style.platformContainer}`}>
                            {dataGame.game.platforms.map(platform => (
                                <PlatformTag key={platform.id} platform={platform.name} />
                            ))}
                        </div>
                    </div>
                    <div className={`${style.scoreContainer}`}>
                        <Score data={dataGame.generalScore} titleDescription={page.overallScore} />
                        <Score data={dataGame.recentScore} titleDescription={page.recentScore} />
                        <UserScore userData={dataGame.userScore} idGame={idGame} />
                    </div>
                </section>


                <GameplayFeatures dataGame={dataGame} />

                <section className={`${style.rightSide}`}>
                    <div className={`${style.aa} `}>
                        <video controls autoPlay muted>
                            <source src={dataGame.game.trailer} type="video/webm" />

                        </video>
                    </div>
                </section>

                <Nav tabInfo={dataGame.tabs} news={dataGame.game.news.length} changeTab={changeTab} />
            </div>

            {showAuth && <Authentication onClickAuth={changeShowAuth} />}

        </main>

    )
}

const isReleased = (date) => {
    const releaseDate = new Date(date);
    const currentDate = new Date();

    if (releaseDate > currentDate) {
        return <h2 className={`${style.releaseDate}`}>Fecha de lanzamiento: {releaseDate.toLocaleDateString()}</h2>;
    } else {
        const difference = currentDate - releaseDate;
        if (difference < 0) {
            return <h2 className={`${style.releaseDate}`}>Fecha de lanzamiento: {releaseDate.toLocaleDateString()}</h2>;
        } else {
            return null; 
        }
    }
};

const linkDistributorsAndDevelopers = (linkArray) => {

    let temp = '';


    if (linkArray.length == 1) {
        temp = linkArray[0].name;
    } else {
        for (const distributor of linkArray) {
            temp += `${distributor.name}, `;
        }
        temp = temp.slice(0, -2);
    }

    return temp;
}