import { Link  } from 'react-router-dom';
import style from '../css/searchSuggestion.module.css';
import { urlBeautify } from '../../../helpers/composeText';

export const SearchSuggestion = ({ dataGame }) => {
    
    

    const getYear = () => {
        const currentDate = new Date(dataGame.date)
        return currentDate.getFullYear();
    }
  
    return (

        <Link to={`/games/${dataGame.id}/${urlBeautify(dataGame.title)}`} className={style.link}>

            <article className={`${style.suggestion} `}>
                <div className={`${style.imageContainer} `}>
                    <img src={dataGame.cover} alt={dataGame.alt} className={`${style.image} `} />
                </div>
                <div className={`${style.descriptionContainer} `}>
                    <h2 className={`${style.title} `}> {dataGame.title}</h2>
                    <h3 className={`${style.titleDescription} `}>{getYear()} - {dataGame.developer}</h3>
                </div>
                <div className={`${style.addListContainer} `}>

                </div>

            </article>
        </Link>



    )
}

