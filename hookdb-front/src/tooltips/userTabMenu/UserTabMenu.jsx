import { ProfileAside } from '../../pages/userProfilePage/components';
import style from './css/userTabMenu.module.css';

export const UserTabMenu = ({ changeShowTabMenu, handlChangeTab }) => {
    return (
        <div className={`${style.modal} `}>
            <button className={`${style.closeButton} `} onClick={changeShowTabMenu}></button>

            <div className={`${style.tooltip} `}>
                <div className={`${style.closeButtonContainer} `}>
                    <img src="../../../assets/global/cleanIcon.svg" alt="" height={20} onClick={changeShowTabMenu}/>
                </div>
                <ProfileAside handlChangeTab={handlChangeTab} />
            </div>

        </div>

    )
}
