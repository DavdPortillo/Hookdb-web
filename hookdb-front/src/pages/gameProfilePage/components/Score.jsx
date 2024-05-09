import { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import style from '../css/score.module.css';

export const Score = ({ data, titleDescription }) => {
    const { language } = useContext(UserContext);
    const page = language.gameProfilePage;
    return (
        <div className={`${style.scoreType}`}>
            <div className={`${style.score}`} style={setColorScore(data.averageScore)}>{data.averageScore != null ? data.averageScore : '-'}</div>
            <div className={`${style.scoreInformation}`}>
                <h4 className={`${style.text}`}>{titleDescription}</h4>
                <p className={`${style.text}`}>{data.scoreCount} {page.votes}</p>
            </div>

        </div>
    )
}

//Set the color of score 
function setColorScore(score) {
    let color = 0;
    let style;
    if (score != null) {
        if (score < 10 && score > 8) {
            color = 120 * 10 / 10;
        } else if (score <= 8 && score > 6) {
            color = 120 * 8 / 10;
        } else if (score <= 6 && score > 4) {
            color = 120 * 5 / 10;
        } else if (score <= 4 && score > 2) {
            color = 120 * 2 / 10;
        } else if (score <= 2 && score > 0) {
            color = 120 * 0 / 10;
        }

        style = {
            borderColor: `hsl(${color}, ${100}%, ${50}%)`,
        };
    } else {
        style = {
            borderColor: 'white',
        };
    }

    return style;
}
