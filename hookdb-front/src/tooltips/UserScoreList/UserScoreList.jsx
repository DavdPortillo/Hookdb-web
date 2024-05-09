
import style from './css/userScoreList.module.css';

export const UserScoreList = ({ handleSetScore, handleClickShow, notPlayed }) => {

    return (

        <div className={`${style.bb} `}>
            <button className={`${style.button} `} onClick={(event) => {handleSetScore(event.target.value); handleClickShow()}} value={'-'}>{notPlayed}</button>

            {
                createButtonScore(handleSetScore, handleClickShow)
            }
        </div>


    )
}

//Generates the different user rating buttons
const createButtonScore = (handleSetScore, handleClickShow) => {
    let buttons = [];

    for (let i = 10; i > 0; i--) {
        buttons = [...buttons, <button key={i} className={`${style.button} `} onClick={(event) => { handleSetScore(event.target.value, event); handleClickShow() }} value={i}>{i}</button>];
    }

    return buttons;
};
