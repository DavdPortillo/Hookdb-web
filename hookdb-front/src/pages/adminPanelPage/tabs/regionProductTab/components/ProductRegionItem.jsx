import style from "../../../css/itemListInfo.module.css";


export const ProductRegionItem = ({ productRegionItem, editProductRegion, deleteProductRegion }) => {
    return (
        <article className={`${style.userItem} `}>
            <div className={`${style.a} `}>{productRegionItem.id}</div>
            <div className={`${style.newsTitleContainer} `}>

                <p className={`${style.a} ${style.newsTitle}`}>{productRegionItem.name}</p>
            </div>
            <div className={`${style.a} ${style.actions}`}>
                <button className={`${style.button} ${style.editButton}`} onClick={() => editProductRegion(productRegionItem.id)}>
                    <img src="../../../../../../assets/global/editIcon.svg" alt="" height={14} />
                </button>
                <button className={`${style.button} ${style.deleteButton}`} onClick={() => deleteProductRegion(productRegionItem.id)}>
                    <img src="../../../../../../assets/global/deleteIcon.svg" alt="" height={14} />
                </button>
            </div>
        </article>

    )
}
