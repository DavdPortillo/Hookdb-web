import style from "../../../css/itemListInfo.module.css";

export const ProductKeyItem = ({ productKeyItem, editProductKey, deleteProductKey }) => {
    return (
        <article className={`${style.userItem} `}>
            <div className={`${style.a} `}>{productKeyItem.id}</div>
            <div className={`${style.newsTitleContainer} `}>

                <p className={`${style.a} ${style.newsTitle}`}>{productKeyItem.name}</p>
            </div>
            <div className={`${style.a} ${style.actions}`}>
                <button className={`${style.button} ${style.editButton}`} onClick={() => editProductKey(productKeyItem.id)}>
                    <img src="../../../../../../assets/global/editIcon.svg" alt="" height={14} />
                </button>
                <button className={`${style.button} ${style.deleteButton}`} onClick={() => deleteProductKey(productKeyItem.id)}>
                    <img src="../../../../../../assets/global/deleteIcon.svg" alt="" height={14} />
                </button>
            </div>
        </article>

    )
}
