import { NewsGameCard } from "./components/NewsGameCard";
import style from "./css/newsGameTab.module.css";
export const NewsGameTab = ({ data }) => {
    return (
        <>
            <article className={`${style.newsItem} `}>
                {
                    data.game.news.map(news => (<NewsGameCard key={news.id} data={news} />))
                }
            </article>


        </>
    )
}
