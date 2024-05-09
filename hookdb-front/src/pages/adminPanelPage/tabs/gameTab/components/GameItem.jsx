import style from "../../../css/itemListInfo.module.css";

export const GameItem = ({ gameItem, editGame, deleteGame }) => {
    return (
        <article className={`${style.userItem} `}>
            <div className={`${style.a} `}>{gameItem.id}</div>
            <div className={`${style.newsTitleContainer} `}>

                <p className={`${style.a} ${style.newsTitle}`}>{gameItem.title}</p>
            </div>
            <div className={`${style.a} ${style.actions}`}>
                <button className={`${style.button} ${style.editButton}`} onClick={() => editGame(gameItem.id, gameItem.translation.id)}>
                    <img src="../../../../../../assets/global/editIcon.svg" alt="" height={14} />
                </button>
                <button className={`${style.button} ${style.deleteButton}`} onClick={() => deleteGame(gameItem.id)}>
                    <img src="../../../../../../assets/global/deleteIcon.svg" alt="" height={14} />
                </button>
            </div>
        </article>

    )
}
