import style from "../../../css/itemListInfo.module.css";

export const ProductPlatformItem = ({ productPlatformItem, editProductPlatform, deleteProductPlatform }) => {
    return (
        <article className={`${style.userItem} `}>
            <div className={`${style.a} `}>{productPlatformItem.id}</div>
            <div className={`${style.newsTitleContainer} `}>

                <p className={`${style.a} ${style.newsTitle}`}>{productPlatformItem.name}</p>
            </div>
            <div className={`${style.a} ${style.actions}`}>
                <button className={`${style.button} ${style.editButton}`} onClick={() => editProductPlatform(productPlatformItem.id)}>
                    <img src="../../../../../../assets/global/editIcon.svg" alt="" height={14} />
                </button>
                <button className={`${style.button} ${style.deleteButton}`} onClick={() => deleteProductPlatform(productPlatformItem.id)}>
                    <img src="../../../../../../assets/global/deleteIcon.svg" alt="" height={14} />
                </button>
            </div>
        </article>

    )
}
