import { useState, useRef, useContext, useEffect } from 'react';

import { useCloseTool } from "../../../../../hooks/useCloseTool";

import style from '../css/userScoreReview.module.css';
import { deleteVoteFromGame, setUserScore } from '../../../../../helpers/dataAPI';
import { UserContext } from '../../../../../context/UserContext';
import { UserScoreList } from '../../../../../tooltips/UserScoreList/UserScoreList';

export const UserScoreReview = ({ userData, dataGame, changeUserScore }) => {
    const [score, setscore] = useState(scoreIsNull(userData?.score ?? undefined));

    const menuRef = useRef(null);
    const { showMenu, handleClickShow } = useCloseTool(menuRef);
    const { user, userLoaded } = useContext(UserContext);

    //Change de value of score
    const handleSetScore = async (value) => {
        if(!isNaN(value)){
            await setUserScore(user.id, dataGame.game.id, value, user.accessToken)
        }else{
            await deleteVoteFromGame(user.id, dataGame.game.id, user.accessToken)
        }

        setscore(value);
        changeUserScore(value);

    };

    useEffect(() => {

    }, [user, userLoaded])


    return (

        <div className={`${style.scoreType} ${style.userScoreType}`}  >
            <div className={`${style.cs} `}>
                <div className={`${style.aa} `} onClick={handleClickShow}>
                    <div className={`${style.score}`}>{score}</div>
                    <div className={`${style.scoreInformation} ${style.text}`}>{isPlayed(score)}</div>
                    <span className={`${style.dropdownSymbol} `}></span>
                </div>
                {
                    showMenu && <div ref={menuRef}><UserScoreList handleSetScore={handleSetScore} handleClickShow={handleClickShow} /></div>
                }
            </div>
        </div>

    )
}

//If the user has not rated it, display a dash
const scoreIsNull = (score) => {
    return score ?? '-';
};

//If the user has played the game, change the string to 'played'
const isPlayed = (score) => {
    return (score !== '-') ? 'Jugado' : 'Sin jugar';
};
