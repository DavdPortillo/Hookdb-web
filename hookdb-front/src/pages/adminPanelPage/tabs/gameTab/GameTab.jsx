import { useContext, useEffect, useRef, useState } from 'react';
import style from '../../css/tab.module.css';
import { UserContext } from '../../../../context/UserContext';
import { deletGameById, findGameByName, getGameById, getGames } from '../../../../helpers/dataAPI';
import generalize from '../../../../css/generalize.module.css'
import { GameItem } from './components/GameItem';
import { CreateGameInfo } from './components/CreateGameInfo';
import { GameInfo } from './components/GameInfo';
export const GameTab = () => {

    const [games, setGames] = useState([]);
    const { user, language } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(true);
    const [showCreateGame, setShowCreateGame] = useState(null)
    const [gameInfo, setGameInfo] = useState(null)
    const [isLoadingGameInfo, setIsLoadingGameInfo] = useState(true)

    const gameTab = language.adminPanelPage.gameTab;

    const scrollElement = useRef(null);
    const [scrollBar, setScrollBar] = useState(false);

    useEffect(() => {
        const scroll = scrollElement.current;
        const hasVerticalScroll = scroll.scrollHeight > scroll.clientHeight;
        (hasVerticalScroll) ? setScrollBar(true) : setScrollBar(false);

    }, []);

    const handleFindNews = async (event) => {
        let fetchResult;

        const searchText = event.target.value;

        if (searchText !== '') {
            const tempFetchResult = await findGameByName(searchText, user.accessToken)
            fetchResult = tempFetchResult.content;

        } else {
            const tempFetchResult = await getGames(user.accessToken)
            fetchResult = tempFetchResult.content;
        }

        setGames(fetchResult);
    }




    const getListNews = async () => {

        const listNews = await getGames(user.accessToken);
        setGames(listNews.content)
        setIsLoading(false)

    }

    useEffect(() => {

        getListNews();

    }, [])

    const editGame = async (idGame, language) => {
        setIsLoadingGameInfo(true)
        setShowCreateGame(false)
        const fetchNewsInfo = await getGameById(idGame, user.accessToken, language);
        setGameInfo(fetchNewsInfo)
        setIsLoadingGameInfo(false)

    }

    const endEditGame = () => {
        setShowCreateGame(true)

    }


    const createNews = () => {
        setShowCreateGame(true)

    }

    const deleteGame = async (idNews) => {
        await deletGameById(idNews, user.accessToken);
        getListNews();
    }

    return (

        <main className={`${style.main} `}>
            <section className={`${style.container1} `}>
                <h1 className={`${style.h1} `}>{gameTab.title}</h1>
                <button className={`${generalize.buttonStyle_unselected} ${style.createNewsButton}`} onClick={createNews}>{gameTab.createGame}</button>
                <div className={`${style.searcher} `}>
                    <input type="text" className={`${style.inputUserSearch} `} placeholder={gameTab.inputSearch} onChange={handleFindNews} />
                </div>
                <section className={`${style.userDescription} ${scrollBar ? style.withScrollBar : style.withoutScrollBar}`}>
                    <div className={`${style.itemDescription} `}>{gameTab.listColumns.id}</div>
                    <div className={`${style.itemDescription} `}>{gameTab.listColumns.name}</div>
                    <div className={`${style.itemDescription} `}>{gameTab.listColumns.actions}</div>
                </section>
                <hr className={`${style.hr} `} />
                <div ref={scrollElement} className={`${style.userResult} `}>

                    {
                        (!isLoading) &&
                        games.map(gameItem => (
                            <GameItem key={gameItem.id} gameItem={gameItem} editGame={editGame} deleteGame={deleteGame} />

                        ))
                    }



                </div>
            </section>
            {
                (!showCreateGame) ? <GameInfo endEditGame={endEditGame} gameInfo={gameInfo} isLoadingGameInfo={isLoadingGameInfo} /> : <CreateGameInfo />

            }
        </main>
    )
}
