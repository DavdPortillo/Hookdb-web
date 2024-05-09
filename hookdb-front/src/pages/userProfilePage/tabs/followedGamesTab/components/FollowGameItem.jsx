import { useContext } from 'react'
import { UserContext } from '../../../../../context/UserContext'
import { setIfFollowOrIgnore } from '../../../../../helpers/dataAPI'
import style from '../css/followGameItem.module.css'

export const FollowGameItem = ({ itemData, handleChangeIsLoading }) => {

    const { user } = useContext(UserContext)

    const deleteFollowGame = async () => {
        await setIfFollowOrIgnore(user.id, itemData.gameId, 0, user.accessToken);
        handleChangeIsLoading()
    }


    return (
        <>
            <article className={`${style.item} `}>
                <div className={`${style.subItem} ${style.imageContainer}`}>
                    <img src={itemData.gameImage} alt="asas" className={`${style.gameImage} `}/>
                </div>
                <div className={`${style.subItem} `}>
                    <p>{itemData.gameName} ({new Date(itemData.gameYear).getFullYear()})</p>
                </div>
                <div className={`${style.subItem} ${style.closeContainer}`}>
                    <button onClick={deleteFollowGame} className={`${style.deleteButton} `}>
                        <img src="../../../../../../assets/global/cleanIcon.svg" alt="" height={14} width={14} className={`${style.image} `} />

                    </button>
                </div>
            </article>
            <hr className={`${style.hr} `} />
        </>

    )
}
