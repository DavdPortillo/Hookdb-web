import { useContext, useEffect, useState } from 'react';
import { FollowGameItem } from './components/FollowGameItem';
import style from './css/followedGamesTab.module.css';
import { UserContext } from '../../../../context/UserContext';
import { getFollowedGames } from '../../../../helpers/dataAPI';
export const FollowedGamesTab = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [followedGames, setFollowedGames] = useState(null)
    const {user} = useContext(UserContext)
    const { language } = useContext(UserContext);
    const tab = language.userProfilePage.generalInformationTab.followedGamesSection;


    useEffect(() => {
        const getFollowedGamesByUser = async () =>{
            const followedGames = await getFollowedGames(user.id, user.accessToken);
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
                    <FollowGameItem key={game.id} itemData={game} handleChangeIsLoading={handleChangeIsLoading}/>
                ))
            }
        </>
    )
}
