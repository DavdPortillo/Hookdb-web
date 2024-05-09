import { useState } from 'react';


import { Authentication } from '../../../modals/components';

import style from '../css/userScoreData.module.css'

export const UserScoreData = ({ data }) => {
    const [score, setscore] = useState(scoreIsNull(data?.gameScore.score ?? undefined));

    const [showAuth, setShowAuth] = useState(false);


    const changeShowAuth = () => {
        setShowAuth(!showAuth);
    }

    return (

        <div className={`${style.scoreType} ${style.userScoreType}`}  >
            <div className={`${style.cs} `}>
                <div>

                    <div className={`${style.aa} `}>
                        <div className={`${style.score}`}>{score}</div>
                        <p className={`${style.text} `}>Tu nota</p>
                    </div>
                </div>
            </div>
            {showAuth && <Authentication onClickAuth={changeShowAuth} />}
        </div>

    )
}

//If the user has not rated it, display a dash
const scoreIsNull = (score) => {
    return score ?? '-';
};


