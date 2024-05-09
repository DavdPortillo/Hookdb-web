import { Link } from 'react-router-dom';
import style from '../css/sagaItem.module.css';
import { urlBeautify } from '../../../../../helpers/composeText';

export const SagaItem = ({ information, main}) => {
  //If it is the current game tab, emphasize it with a background color change
  const isMainGame = main ? style.mainGameItem : '';
  return (
      <Link to={`../games/${information.id}/${urlBeautify(information.title)}`} className={`${style.gameItem} ${isMainGame} ` }>
        <h4 className={`${style.name} `}>{information.title}</h4>
        <hr className={`${style.hr} `}/>
        <p className={`${style.year} `}>{new Date(information.date).getFullYear()}</p>
      </Link>

    
  )
}

