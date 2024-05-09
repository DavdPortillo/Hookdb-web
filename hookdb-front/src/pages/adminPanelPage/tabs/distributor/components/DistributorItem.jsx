import style from "../../../css/itemListInfo.module.css";

export const DistributorItem = ({ distributorItem, editDistributor, deleteDistributor }) => {
    return (
        <article className={`${style.userItem} `}>
            <div className={`${style.a} `}>{distributorItem.id}</div>
            <div className={`${style.newsTitleContainer} `}>

                <p className={`${style.a} ${style.newsTitle}`}>{distributorItem.name}</p>
            </div>
            <div className={`${style.a} ${style.actions}`}>
                <button className={`${style.button} ${style.editButton}`} onClick={() => editDistributor(distributorItem.id)}>
                    <img src="../../../../../../assets/global/editIcon.svg" alt="" height={14} />
                </button>
                <button className={`${style.button} ${style.deleteButton}`} onClick={() => deleteDistributor(distributorItem.id)}>
                    <img src="../../../../../../assets/global/deleteIcon.svg" alt="" height={14} />
                </button>
            </div>
        </article>

    )
}