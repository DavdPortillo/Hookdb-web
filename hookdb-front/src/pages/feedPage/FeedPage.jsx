import { useContext, useEffect, useState } from 'react'
import style from './css/feedPage.module.css'
import { getNewsFromFollowedGames } from '../../helpers/dataAPI';
import { UserContext } from '../../context/UserContext';
import { NewsCard } from '../mainPage/components';

export const FeedPage = () => {

    const [isLoading, setIsLoading] = useState(true);
    const {language, user, languageCode} = useContext(UserContext);
    const feedPage = language.feedPage;
    const [followedNews, setFollowedNews] = useState(null);

    useEffect(() => {
        const getNewsFollowed = async() =>{
            const fetchData = await getNewsFromFollowedGames(user.id, user.accessToken, languageCode)
            setFollowedNews(fetchData);
            setIsLoading(false)
        }

        if(isLoading){

            getNewsFollowed();
        }

    }, [])
    


    return (
        
        <>
            <h1 className={`${style.title} `}>{feedPage.title}</h1>
            <hr className={`${style.hr} `}/>
            <div className={`${style.container} `}>
                {
                    (!isLoading && followedNews.length > 0) ? followedNews.map(news =>(
                        <NewsCard key={news.id} data={news} />
                    ))
                    :
                    <h1 className={`${style.noNewswarning} `}>{feedPage.warnings.noExistsNews}</h1>
                }

            </div>
        </>
    )
}
