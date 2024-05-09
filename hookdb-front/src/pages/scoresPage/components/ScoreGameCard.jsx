import { Link } from "react-router-dom"
import style from '../css/scoreGameCard.module.css';
import { urlBeautify } from "../../../helpers/composeText";
import { UserScoreData } from "./UserScoreData";

export const ScoreGameCard = ({ data }) => {

  return (
    <Link to={`/games/${data.id}/${urlBeautify(data.name)}`}>
      <article className={`${style.gameSearch} `}>
        <section className={`${style.mainInformation} `}>
          <div className={`${style.imageContainer} `}>
            <img className={`${style.gameImage} `} src={data.image} alt={data.alt} />
          </div>


        </section>
        <section className={`${style.secondaryInformationContainer} `}>
          <div className={`${style.gameDescription} `}>
            <div>
              <h3 className={`${style.h3} `}>{data.name}</h3>
              <p className={`${style.p} `}>{(new Date(data.date).getFullYear())} - {data.developer}</p>
            </div>


          </div>
          <UserScoreData data={data} />
        </section>

      </article>
    </Link>
  )
}
