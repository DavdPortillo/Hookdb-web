import { useState, useRef, useContext, useEffect } from 'react';

import { UserScoreList } from '../../../tooltips/UserScoreList/UserScoreList';
import { useCloseTool } from "../../../hooks/useCloseTool";

import style from '../css/score.module.css';
import { deleteVoteFromGame, setUserScore } from '../../../helpers/dataAPI';
import { UserContext } from '../../../context/UserContext';
import { Authentication } from '../../../modals/components';

export const UserScore = ({ userData, idGame }) => {
    const [score, setscore] = useState(scoreIsNull(userData?.score ?? undefined));

    const menuRef = useRef(null);
    const { showMenu, handleClickShow } = useCloseTool(menuRef);
    const { user, userLoaded, language } = useContext(UserContext);
    const [showAuth, setShowAuth] = useState(false);

    const page = language.gameProfilePage;

    //Change de value of score
    const handleSetScore = async (value) => {

        if (!isNaN(value)) {
            await setUserScore(user.id, idGame, value, user.accessToken)
        } else {
            if (score === '-' || score === undefined) return
            await deleteVoteFromGame(user.id, idGame, user.accessToken)

        }

        setscore(value);
    };

    useEffect(() => {

    }, [user, userLoaded])

    useEffect(() => {
        if (showMenu) {
            menuRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })

        }
    }, [showMenu])

    const isAuthenticate = () => {
        if (userLoaded) {
            handleClickShow();
        } else {
            changeShowAuth();
        }
    }

    const changeShowAuth = () => {
        setShowAuth(!showAuth);
    }

    //If the user has played the game, change the string to 'played'
    const isPlayed = (score) => {
        return (score !== '-') ? page.played : page.notPlayed;
    };

    return (

        <div className={`${style.scoreType} ${style.userScoreType}`}  >
            <div className={`${style.cs} `}>
                <div className={`${style.aa} `} onClick={isAuthenticate}>
                    <div className={`${style.score}`}>{score}</div>
                    <div className={`${style.scoreInformation} ${style.text} ${style.userScoreText}`}>{isPlayed(score)}</div>
                    <span className={`${style.dropdownSymbol} `}></span>
                </div>
                {
                    (showMenu && userLoaded) && <div ref={menuRef}><UserScoreList handleSetScore={handleSetScore} handleClickShow={handleClickShow} notPlayed={page.notPlayed}/></div>
                }
            </div>
            {showAuth && <Authentication onClickAuth={changeShowAuth} />}
        </div>

    )
}

//If the user has not rated it, display a dash
const scoreIsNull = (score) => {
    return score ?? '-';
};


