import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllPopularGames, getAllRecentGames } from "../../helpers/dataAPI";
import { FollowingGamesResults } from "./components/FollowingGamesResults";
import style from './css/followingGamesPage.module.css'
import { UserContext } from "../../context/UserContext";
export const FollowingGamesPage = () => {

    const { group } = useParams();
    const {languageCode} = useContext(UserContext)
    const [results, setResults] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [titleName, setTitleName] = useState(group === 'popular' ? 'populares' : 'recientes')

    useEffect(() => {
        const fetchFollowingGame = async () => {
            let tempResult;

            if (group === 'popular') {
                tempResult = await getAllPopularGames(languageCode);
            } else {
                tempResult = await getAllRecentGames(languageCode);

            }

            setResults(tempResult);
            setIsLoading(false)
        }

        fetchFollowingGame();

    }, [group])

    return (
        <>
            <div className={`${style.container} `}>
                <h1 className={`${style.h1} `}>Proximos lanzamientos {titleName}</h1>
                <hr className={`${style.hr} `}/>

                {!isLoading && <FollowingGamesResults results={results} />}

            </div>
        </>
    )
}
