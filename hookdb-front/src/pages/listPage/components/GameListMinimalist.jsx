import { useContext, useRef } from 'react';

import style from '../css/gameListMinimalist.module.css';
import { deleteGameFromList } from '../../../helpers/dataAPI';
import { UserContext } from '../../../context/UserContext';
import { Link } from 'react-router-dom';
import { urlBeautify } from '../../../helpers/composeText';

export const GameListMinimalist = ({ gameData, numberList, showCurrentList }) => {

    const gameRef = useRef(null);
    const { user } = useContext(UserContext);

    const handleDeleteGame = async () => {
        await deleteGameFromList(user.id, showCurrentList, gameData.id, user.accessToken);
        gameRef.current.style.display = "none";

    }





    return (
        <Link to={`/games/${gameData.id}/${urlBeautify(gameData.name)}`} >
            <article ref={gameRef} className={`${style.game} `}>

                {/* <div className={`${style.numberList} `}>{numberList}</div> */}
                <div className={`${style.gameContent} `}>
                    <div className={`${style.imageContainer} `}>
                        <img src={gameData.image} alt="" className={`${style.gameImage} `} />
                    </div>
                    <div className={`${style.gameDescription} `}>
                        <div className={`${style.linkContainer} `}>
                            <h3 to={`/games/${gameData.id}/${urlBeautify(gameData.name)}`} className={`${style.title} `}>{gameData.name} <span className={`${style.year} `}>({gameData.year})</span> </h3>

                        </div>
                        <p className={`${style.p} `}>{showGenresAndPlatforms(gameData.genres)}</p>
                        <p className={`${style.p} `}> {showGenresAndPlatforms(gameData.platforms)}</p>

                        <div className={`${style.ratingDescription} `}>

                            <div className={`${style.ratingContainer} `}>
                                <p className={`${style.rating} `}>{rateGame(gameData.rate.averageScore)}</p>
                            </div>

                        </div>
                    </div>
                    <div className={`${style.deleteButtonContainer} `}>
                        <button className={`${style.deleteGameButton} `} onClick={handleDeleteGame}>
                            <img src="../../../../assets/global/cleanIcon.svg" alt="" height={15} width={15} />
                        </button>
                    </div>

                </div>



            </article>
        </Link>
    )
}


const rateGame = (averageScore) => {
    return (averageScore !== null) ? averageScore : '-';

}

const showGenresAndPlatforms = (itemArray) => {
    let temp = '';

    if (itemArray.length == 1) {
        temp = itemArray[0];
    } else {
        for (const item of itemArray) {
            temp += `${item}, `;
        }
        temp = temp.slice(0, -2);
    }
    return temp;
}
