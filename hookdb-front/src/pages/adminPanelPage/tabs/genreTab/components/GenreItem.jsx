import style from "../../../css/itemListInfo.module.css";

export const GenreItem = ({ genreItem, editGenre, deleteGenre }) => {
    return (
        <article className={`${style.userItem} `}>
            <div className={`${style.a} `}>{genreItem.id}</div>
            <div className={`${style.newsTitleContainer} `}>

                <p className={`${style.a} ${style.newsTitle}`}>{genreItem.name}</p>
            </div>
            <div className={`${style.a} ${style.actions}`}>
                <button className={`${style.button} ${style.editButton}`} onClick={() => editGenre(genreItem.id)}>
                    <img src="../../../../../../assets/global/editIcon.svg" alt="" height={14} />
                </button>
                <button className={`${style.button} ${style.deleteButton}`} onClick={() => deleteGenre(genreItem.id)}>
                    <img src="../../../../../../assets/global/deleteIcon.svg" alt="" height={14} />
                </button>
            </div>
        </article>

    )
}
