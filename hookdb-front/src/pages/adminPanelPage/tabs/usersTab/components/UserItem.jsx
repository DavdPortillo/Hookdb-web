
import style from "../../../css/itemListInfo.module.css";


export const UserItem = ({ dataUser, editUser,deleteUser }) => {

    
    return (

        <article className={`${style.userVariantItem} `}>
            <div className={`${style.a} ${style.id}`}>{dataUser.id}</div>
            <div className={`${style.a} `}>{dataUser.username}</div>
            <div className={`${style.a} ${style.email}`}>{dataUser.email}</div>
            <div className={`${style.a} ${style.actions}`}>
                <button className={`${style.button} ${style.editButton}`} onClick={() => editUser(dataUser.id)}>
                    <img src="../../../../../../assets/global/editIcon.svg" alt="" height={14} />
                </button>
                <button className={`${style.button} ${style.deleteButton}`} onClick={() =>deleteUser(dataUser.id)}>
                    <img src="../../../../../../assets/global/deleteIcon.svg" alt="" height={14} />
                </button>
            </div>
        </article>

    )
}