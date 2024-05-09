import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../../context/UserContext"
import style from './css/ignoredGamesTab.module.css';
import { getIgnoredGames } from "../../../../helpers/dataAPI";
import { IgnoreGameItem } from "./components/IgnoreGameItem";

export const IgnoredGamesTab = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [followedGames, setFollowedGames] = useState(null)
    const {user, language} = useContext(UserContext)
    const tab = language.userProfilePage.generalInformationTab.ignoredGamesSection;

    useEffect(() => {
        const getFollowedGamesByUser = async () =>{
            const followedGames = await getIgnoredGames(user.id, user.accessToken);
            setFollowedGames(followedGames)
            setIsLoading(false)
        }

        if(isLoading){

            getFollowedGamesByUser()
        }

    }, [])
    
    const handleChangeIsLoading = () =>{
        setIsLoading(true)
    }

    return (
        <>
            <h1 className={`${style.title} `}>{tab.title}</h1>
            <p className={`${style.pDescription} `}>{tab.description}</p>
            {
                !isLoading && followedGames.map((game) =>(
                    <IgnoreGameItem key={game.id} itemData={game} handleChangeIsLoading={handleChangeIsLoading}/>
                ))
            }
        </>
    )
}
