import { useContext, useEffect, useState } from "react";
import { getLastNews, getMostRecentGames, getPersonalizedNews, getTopFivePopularGames } from "../../helpers/dataAPI";
import { LatestNews, MainNews, UpcomingReleases } from "./components";

import style from './mainPage.module.css';
import { UserContext } from "../../context/UserContext";

export const MainPage = () => {
  const { userLoaded, user, languageCode } = useContext(UserContext);
  const [isLoading, setisLoading] = useState(true);
  const [newsData, setNewsData] = useState(null);
  const [topPopularGames, setTopPopularGames] = useState(null);
  const [mostRecentGames, setMostRecentGames] = useState(null);

  const fetchData = async () => {
    let lastNewsInfo;
    let topPopularGamesInfo;
    if (!userLoaded) {
      lastNewsInfo = await getLastNews(languageCode);

    } else if(userLoaded){
      
      lastNewsInfo = await getPersonalizedNews(user.id, user.accessToken, languageCode);
    }



    topPopularGamesInfo = await getTopFivePopularGames(languageCode);
    const mostRecentGamesInfo = await getMostRecentGames(languageCode);


    setNewsData(lastNewsInfo);
    setMostRecentGames(mostRecentGamesInfo)
    setTopPopularGames(topPopularGamesInfo)
    setisLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [userLoaded]);



  return (
    <>
      <main className={`${style.container}`}>
        {(!isLoading) && <MainNews mainNews={newsData[0]} />}
        {(!isLoading) && <UpcomingReleases upcomingReleases={[topPopularGames, mostRecentGames]} />}
      </main>
      {(!isLoading) && <LatestNews news={newsData.slice(1)} />}
    </>
  )
}
