import style from "../../../css/itemListInfo.module.css";

export const ProductVendorItem = ({ productVendorItem, editProductVendor, deleteProductVendor }) => {
    return (
        <article className={`${style.userItem} `}>
            <div className={`${style.a} `}>{productVendorItem.id}</div>
            <div className={`${style.newsTitleContainer} `}>

                <p className={`${style.a} ${style.newsTitle}`}>{productVendorItem.name}</p>
            </div>
            <div className={`${style.a} ${style.actions}`}>
                <button className={`${style.button} ${style.editButton}`} onClick={() => editProductVendor(productVendorItem.id)}>
                    <img src="../../../../../../assets/global/editIcon.svg" alt="" height={14} />
                </button>
                <button className={`${style.button} ${style.deleteButton}`} onClick={() => deleteProductVendor(productVendorItem.id)}>
                    <img src="../../../../../../assets/global/deleteIcon.svg" alt="" height={14} />
                </button>
            </div>
        </article>

    )
}
