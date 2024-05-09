import { Link } from "react-router-dom";

import style from '../css/gameCard.module.css';
import { urlBeautify } from "../../../helpers/composeText";

export const GameCard = ({ data }) => {
  return (
    <article to="/" className={`${style.gameCard}`}>
      <Link to={`/games/${data.id}/${urlBeautify(data.title)}`}>
        <img src={data.cover} alt={data.alt} className={`${style.image}`} />
        <div className={`${style.gameInformation}`}>
          <h3 className={`${style.name}`}>{data.title}</h3>
          <p className={`${style.date}`}>{data.date}</p>

        </div>
      </Link>

    </article>
  )
}

