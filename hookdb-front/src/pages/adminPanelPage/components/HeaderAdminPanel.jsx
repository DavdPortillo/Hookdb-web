import { useContext, useEffect, useState } from 'react';
import style from '../css/headerAdminPanel.module.css';
import { UserContext } from '../../../context/UserContext';
import { getUserInformation } from '../../../helpers/dataAPI';

export const HeaderAdminPanel = () => {

    const { user, userLoaded, language } = useContext(UserContext);
    const [isLoading, setIsloading] = useState(true);
    const [adminInfo, setAdminInfo] = useState(null)

    const adminPanelPage = language.adminPanelPage;

    useEffect(() => {

        const getAdminData = async () => {
            const adminData = await getUserInformation(user.id, user.accessToken);

            setAdminInfo(adminData)
            setIsloading(false);

        }

        if (userLoaded) {
            getAdminData();

        }


    }, [user, userLoaded])


    return (

        <header className={`${style.header} `}>
            <div className={`${style.logo} `}>HookDB</div>

            <div className={`${style.user} `}>
                {
                    (!isLoading) &&
                    <>
                        <div className={`${style.userImage} `}>
                            <img src={adminInfo.image} alt={adminInfo.alt} height={40} className={`${style.image} `} />
                        </div>
                        <div className={`${style.userDescription} `}>
                            <h2 className={`${style.username} `}>{user.name}</h2>
                            <h3 className={`${style.role} `}>{adminPanelPage.role}</h3>
                        </div>
                    </>
                }

            </div>
        </header>


    )
}
