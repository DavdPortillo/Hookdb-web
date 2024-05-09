import { useContext, useEffect, useState } from 'react';
import style from './css/scoresPage.module.css';
import { getUserScores } from '../../helpers/dataAPI';
import { UserContext } from '../../context/UserContext';
import { ScoreGameCard } from './components/ScoreGameCard';
import { generateKey } from '../../helpers/composeText';

export const ScoresPage = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [gameScore, setGameScore] = useState(null)
  const { user } = useContext(UserContext);

  useEffect(() => {

    const getUserScoreData = async () => {

      const data = await getUserScores(user.id, user.accessToken)
      const groupGames = data.reduce((map, obj) => {
        const { date } = obj.gameScore;
        let formatedDate = date.split('T')[0];
        if (!map.has(formatedDate)) {
          map.set(formatedDate, []);
        }
        map.get(formatedDate).push(obj);
        return map;
      }, new Map());
      setGameScore(groupGames);
      setIsLoading(false);
    }


    getUserScoreData();


  }, [])


  return (
    <>
      <h1 className={`${style.title} `}>Scores</h1>
      <hr className={`${style.hr} `}/>
      <div className={`${style.container} `}>
      {
        (!isLoading) &&
        Array.from(gameScore.keys()).map(date => (
          <div key={date} className={`${style.gameScoresContainer} `}>
            <h2 className={`${style.date} `}>{date}</h2>
            <hr className={`${style.hrSecondary} `}/>
            {gameScore.get(date).map(element => (
              <ScoreGameCard key={generateKey()} data={element} />
            ))}
          </div>
        ))
      }

      
      </div> 
    </>
  )
}
