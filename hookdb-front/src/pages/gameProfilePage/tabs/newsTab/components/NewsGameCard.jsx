import style from '../css/newsGameCard.module.css';
import generalize from '../../../../../css/generalize.module.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../../../../context/UserContext';
import { calculateTime } from '../../../../../helpers/calculateTimeByLanguage';

export const NewsGameCard = ({data}) => {
    const { language } = useContext(UserContext);
    const languageCode = language.language;

    return (
        <Link to={`/news/${data.id}/${data.headline}`}>
            <article className={`${style.newsCard}`}>
                <div className={`${style.imageContainer} `}>
                    <img src={data.image} alt={data.alt} className={`${style.image}`} />

                </div>

                <div className={`${style.news}`}>
                    <div className={`${style.content}`}>

                        <h3 className={`${style.headline} ${generalize.linkStyle}`}>{data.headline}</h3>
                        <p className={`${style.subtitle}`}>{data.subtitle}</p>


                    </div>

                    <div className={`${style.newsInformation}`}>
                        <p className={`${style.author} ${generalize.textDescription}`}>{`${data.authorName} ${data.authorSurname}`}</p>
                        <span className={`${style.time} ${generalize.textDescription}`}>-</span>
                        <time className={`${style.time} ${generalize.textDescription}`}>{calculateTime(languageCode, data.date)} </time>

                        <span className={`${style.time} ${generalize.textDescription}`}> - </span>

                        <div className={`${style.flex}`}>
                            <img src="../../../assets/global/commentsIcon.svg" alt="" height={15} width={15} />
                            <p className={`${style.time} ${generalize.textDescription}`}>{data.commentCount} </p>
                        </div>


                    </div>
                </div>


            </article>
        </Link>
    )
}

