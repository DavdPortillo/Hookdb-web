import style from "../../../css/itemListInfo.module.css";

export const ProductEditionItem = ({ productEditionItem, editProductEdition, deleteProductEdition }) => {
    return (
        <article className={`${style.userItem} `}>
            <div className={`${style.a} `}>{productEditionItem.id}</div>
            <div className={`${style.newsTitleContainer} `}>

                <p className={`${style.a} ${style.newsTitle}`}>{productEditionItem.name}</p>
            </div>
            <div className={`${style.a} ${style.actions}`}>
                <button className={`${style.button} ${style.editButton}`} onClick={() => editProductEdition(productEditionItem.id)}>
                    <img src="../../../../../../assets/global/editIcon.svg" alt="" height={14} />
                </button>
                <button className={`${style.button} ${style.deleteButton}`} onClick={() => deleteProductEdition(productEditionItem.id)}>
                    <img src="../../../../../../assets/global/deleteIcon.svg" alt="" height={14} />
                </button>
            </div>
        </article>

    )
}
