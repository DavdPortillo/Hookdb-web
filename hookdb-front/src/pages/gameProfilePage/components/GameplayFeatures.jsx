
import { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import style from '../css/gameplayFeatures.module.css';

export const GameplayFeatures = ({ dataGame }) => {

    const { language } = useContext(UserContext);
    const page = language.gameProfilePage;

    return (

        <section className={`${style.gameplayFeatures}`}>
            <div className={`${style.gameDuration}`}>
                <div className={`${style.containerAligment}`}>
                    <h3 className={`${style.h3}`}>{page.storyTime}</h3>
                    <h3 className={`${style.h3}`}>{calculateTime(dataGame.game.storyTime)}</h3>
                </div>
                <hr className={`${style.separator}`} />
                <div className={`${style.containerAligment}`}>
                    <h3 className={`${style.h3}`}>{page.CompletionTime}</h3>
                    <h3 className={`${style.h3}`}>{calculateTime(dataGame.game.completeTime)}</h3>
                </div>
            </div>
            <div className={`${style.crossplay}`}>
                <div className={`${style.containerAligment}`}>
                    <h3 className={`${style.h3}`}>Crossplay</h3>
                    <img src={hasCrossplay(dataGame.game.hasCrossplay)} alt="" height={18} />
                </div>

            </div>
        </section>

    )
}

function hasCrossplay(crossplay) {
    return (crossplay) ? '../../../assets/global/hasCrossplay.svg' : '../../../assets/global/hasNotCrossplay.svg';
}

function calculateTime(amount) {
    if (!amount) return;

    let hours = Math.floor(amount / 60);
    let minutes = amount % 60;

    if (hours < 1) {
        return `${minutes}m`;
    } else {
        return `${hours}h ${minutes}m`;
    }
}

