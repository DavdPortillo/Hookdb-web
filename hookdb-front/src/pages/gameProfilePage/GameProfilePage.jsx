import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Tab, MainInformation } from "./components";

import { getGameData, getGeneralScoreGame, getIfGameIsFollowed, getRecentScoreGame, getUserScore } from "../../helpers/dataAPI";
import { UserContext } from "../../context/UserContext";

export const GameProfilePage = () => {


  const [activeTab, setActiveTab] = useState('general');
  const [dataGame, setDataGame] = useState({});
  const { user, userLoaded, languageCode } = useContext(UserContext);

  const changeTab = (numberTab) => {
    setActiveTab(numberTab);
  };

  const [isLoading, setisLoading] = useState(true);
  const {id} = useParams();



  const fetchDataGame = async (idGame, user) => {

    let tempData = await getGameData(idGame, languageCode);
    const generalScore = await getGeneralScoreGame(idGame);
    const recentScore = await getRecentScoreGame(idGame);

    const userScore = await getUserScore(user.id, idGame, user.accessToken)
    const isFollowing = await getIfGameIsFollowed(user.id, idGame, user.accessToken);
    tempData = {
      ...tempData,
      generalScore: generalScore,
      recentScore: recentScore[0],
      tabs: {
        prices: tempData.game.products.length,
        critics: tempData.game.reviewCount,
        dlcs: tempData.game.dlcs.length,
        news: tempData.game.news.length,
      },
      userScore,
      isFollowing,
    };

    setDataGame(tempData);
    setisLoading(false);

  }

  const fetchDataGameGuest = async (idGame) => {
    let tempData = await getGameData(idGame);

    const generalScore = await getGeneralScoreGame(idGame);
    const recentScore = await getRecentScoreGame(idGame);
    tempData = {
      ...tempData,
      generalScore: generalScore,
      recentScore: recentScore[0],

    };

    tempData.tabs = {
      prices: tempData.game.products.length,
      critics: tempData.game.reviewCount,
      dlcs: tempData.game.dlcs.length,
      news: tempData.game.newsCommentCount,
    }


    tempData = { ...tempData, isFollowing: null };
    setDataGame(tempData);
    setisLoading(false);
  }



  useEffect(() => {

    if (userLoaded === true && isLoading) {

      fetchDataGame(id, user, userLoaded);
    } else if (userLoaded === false && isLoading) {
      fetchDataGameGuest(id)

    }


  }, [user, userLoaded, isLoading, id])


  useEffect(() => {
    setisLoading(true)
  }, [id])
   


  return (
    <>
      {(isLoading) ? <p>Cargando...</p> :
        <>
          <MainInformation changeTab={changeTab} dataGame={dataGame} userData={{ user, userLoaded }} idGame={id} />
           <Tab activeTab={activeTab} dataGame={dataGame} />
         </>
      }

    </>

  )
}
