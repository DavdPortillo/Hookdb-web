import style from '../css/gamesSearchResults.module.css';
import { GameSearch } from './GameSearch';

export const GamesSearchResults = ({results}) => {
  return (
    <section className={`${style.gameSearchResults} `}>
      {
        results.map(result => <GameSearch key={result.id} result={result}/>)
      }




    </section>
  )
}
