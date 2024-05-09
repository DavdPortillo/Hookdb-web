import { useEffect, useRef, useState } from 'react';
import style from '../../css/tab.module.css';
import { NewsItem } from './components/NewsItem';
import { deleteNewsById, findNewsByName, getAllNewsAdmin, getNewsById } from '../../../../helpers/dataAPI';
import { useContext } from 'react';
import { UserContext } from '../../../../context/UserContext';
import generalize from '../../../../css/generalize.module.css';
import { NewsInfo } from './components/NewsInfo';
import { CreateNewsInfo } from './components/CreateNewsInfo';
import toast from 'react-hot-toast';

export const NewsTab = () => {


    const [news, setNews] = useState(null);
    const { user, language } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(true);
    const [showCreateNews, setShowCreateNews] = useState(null)
    const [newsInfo, setNewsInfo] = useState(null)
    const [isLoadingNewsInfo, setIsLoadingNewsInfo] = useState(true)

    const newsTab = language.adminPanelPage.newsTab;
    const warnings = language.warnings;

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

            try {
                fetchResult = await findNewsByName(searchText, user.accessToken)
            } catch (error) {
                console.error('Fallo al buscar una noticia por nombre')
                toast.error(warnings.error.searchByName)
            }

        } else {

            try {
                fetchResult = await getAllNewsAdmin(user.accessToken)
            } catch (error) {
                console.error('Fallo al obtener todas las noticias')
                toast.error(warnings.error.newsRetrieve)
            }
        }

        setNews(fetchResult);
    }


    const getListNews = async () => {
        try {
            const listNews = await getAllNewsAdmin(user.accessToken);
            setNews(listNews)
            setIsLoading(false)
        } catch (error) {
            console.error('Fallo al obtener todas las noticias')
            toast.error(warnings.error.newsRetrieve)
        }


    }

    useEffect(() => {

        getListNews();

    }, [])

    const editNews = async (idNews) => {


        try {
            setIsLoadingNewsInfo(true)
            setShowCreateNews(false)
            const fetchNewsInfo = await getNewsById(idNews, user.accessToken);
            setNewsInfo(fetchNewsInfo)
            setIsLoadingNewsInfo(false)
        } catch (error) {
            console.error('Fallo al obtener la información de la noticias')
            toast.error(warnings.error.newsInfoRetrieve)
        }

    }

    const endEditUser = () => {
        setShowCreateNews(true)

    }


    const createNews = () => {
        setShowCreateNews(true)

    }

    const deleteNews = async (idNews) => {
        try {
            await deleteNewsById(idNews, user.accessToken);
            toast.success(warnings.success.deleteNews)
            getListNews()

        } catch (error) {
            console.error("Fallo al eliminar la noticia")
            toast.error(warnings.error.newsDelete)
        }

    }

    return (

        <main className={`${style.main} `}>
            <section className={`${style.container1} `}>
                <h1 className={`${style.h1} `}>{newsTab.title}</h1>
                <button className={`${generalize.buttonStyle_unselected} ${style.createNewsButton}`} onClick={createNews}>{newsTab.createNews}</button>
                <div className={`${style.searcher} `}>
                    <input type="text" className={`${style.inputUserSearch} `} placeholder={newsTab.inputSearch} onChange={handleFindNews} />
                </div>
                <section className={`${style.userDescription} ${scrollBar ? style.withScrollBar : style.withoutScrollBar}`}>
                    <div className={`${style.itemDescription} `}>{newsTab.listColumns.id}</div>
                    <div className={`${style.itemDescription} `}>{newsTab.listColumns.name}</div>
                    <div className={`${style.itemDescription} `}>{newsTab.listColumns.actions}</div>
                </section>
                <hr className={`${style.hr} `} />
                <div ref={scrollElement} className={`${style.userResult} `}>

                    {
                        (!isLoading) &&
                        news.map(newsItem => (
                            <NewsItem key={newsItem.id} newsItem={newsItem} editNews={editNews} deleteNews={deleteNews} />

                        ))
                    }



                </div>
            </section>
            {
                (!showCreateNews) ? <NewsInfo endEditUser={endEditUser} newsInfo={newsInfo} isLoadingNewsInfo={isLoadingNewsInfo} /> : <CreateNewsInfo getListNews={getListNews} />

            }
        </main>
    )
}
