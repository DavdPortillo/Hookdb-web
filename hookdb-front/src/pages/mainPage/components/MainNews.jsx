import { Link } from 'react-router-dom';

import style from '../css/mainNews.module.css';
import { urlBeautify } from '../../../helpers/composeText';

export const MainNews = ({ mainNews }) => {

  return (
    <article className={`${style.topNews}`}>
      <Link to={`/news/${mainNews.id}/${urlBeautify(mainNews.headline)}`}>
        <img className={`${style.image}`} src={mainNews.image} alt={mainNews.alt} />
        <div className={`${style.overlay} `}>
          <h1 className={`${style.title}`}>{mainNews.headline}</h1>
          <div className={`${style.mask}`}></div>
          <div className={`${style.sasa} `}></div>
        </div>
      </Link>
    </article>
  )
}
