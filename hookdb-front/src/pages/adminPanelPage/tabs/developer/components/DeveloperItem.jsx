import style from "../../../css/itemListInfo.module.css";

export const DeveloperItem = ({ developerItem, editDeveloper, deleteDeveloper }) => {
    return (
        <article className={`${style.userItem} `}>
            <div className={`${style.a} `}>{developerItem.id}</div>
            <div className={`${style.newsTitleContainer} `}>

                <p className={`${style.a} ${style.newsTitle}`}>{developerItem.name}</p>
            </div>
            <div className={`${style.a} ${style.actions}`}>
                <button className={`${style.button} ${style.editButton}`} onClick={() => editDeveloper(developerItem.id)}>
                    <img src="../../../../../../assets/global/editIcon.svg" alt="" height={14} />
                </button>
                <button className={`${style.button} ${style.deleteButton}`} onClick={() => deleteDeveloper(developerItem.id)}>
                    <img src="../../../../../../assets/global/deleteIcon.svg" alt="" height={14} />
                </button>
            </div>
        </article>

    )
}