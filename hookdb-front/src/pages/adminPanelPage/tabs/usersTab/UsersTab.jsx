import { useContext, useEffect, useRef, useState } from 'react';

import { UserItem } from './components/UserItem';
import { UserContext } from '../../../../context/UserContext';
import { deleteUserData, getAllUsers, getUserInfo, searchUserByEmail, searchUserById, searchUserByUsername } from '../../../../helpers/dataAPI';
import { UserInfo } from './components/UserInfo';
import { UserStatistics } from './components/UserStatistics';
import { toast } from 'react-hot-toast';

import style from './usersTab.module.css';

const filters = [{ id: 'Id' }, { user: 'Usuario' }, { email: 'Email' }];

export const UsersTab = () => {

    const scrollElement = useRef(null);
    const [scrollBar, setScrollBar] = useState(false);
    const [users, setUsers] = useState(null);
    const [activeFilter, setActiveFilter] = useState('Usuario');
    const [filterShow, setFilterShow] = useState(false);
    const [showUserInfo, setShowUserInfo] = useState(false);
    const { user, language } = useContext(UserContext)
    const [callAPI, setCallAPI] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(null)
    const [isLoadingUserInfo, setIsLoadingUserInfo] = useState(true)
    const warnings = language.warnings;

    const userTab = language.adminPanelPage.userTab;


    useEffect(() => {
        const scroll = scrollElement.current;
        const hasVerticalScroll = scroll.scrollHeight > scroll.clientHeight;
        (hasVerticalScroll) ? setScrollBar(true) : setScrollBar(false);

    }, []);



    const handleFindUsers = async (event) => {
        setIsLoading(true)
        let fetchResult;

        const searchText = event.target.value;

        if (searchText !== '') {
            try {
                const tempResult = await callAPI(searchText, user.accessToken)

                if (tempResult.content) {
                    fetchResult = tempResult.content;
                } else {
                    (Array.isArray(fetchResult)) ? fetchResult = tempResult : fetchResult = [tempResult];
                }

            } catch (error) {
                console.error('Fallo al obtener los usuarios por el campo especificado');
                toast.error(warnings.error.userFindByField)
            }


        } else {
            try{
                fetchResult = await getAllUsers(user.accessToken);
                fetchResult = fetchResult.content

            }catch(error){
                console.error('Fallo al obtener todos los usuarios');
                toast.error(warnings.error.userRetrieve)
            }

        }

        setUsers(fetchResult);
        setIsLoading(false)
    }

    const handleClickEnabled = () => {
        setFilterShow(!filterShow);
    }


    

    const changeActiveFilter = (activeFilter, filterName) => {
        let selectedAPI;

        switch (filterName) {
            case 'id':
                selectedAPI = searchUserById;
                break;
            case 'username':
                selectedAPI = searchUserByUsername;
                break;
            case 'email':
                selectedAPI = searchUserByEmail;
                break;
            default:
                break;
        }
        setCallAPI(() => selectedAPI)
        setActiveFilter(activeFilter);

    }


    useEffect(() => {
        changeActiveFilter('Usuario', 'username');


    }, [])



    const editUser = async (idUser) => {
        setIsLoadingUserInfo(true)
        setShowUserInfo(true)
        let fetchUserInfo;

        try {
            fetchUserInfo = await getUserInfo(idUser, user.accessToken);
            setUserInfo(fetchUserInfo)
            setIsLoadingUserInfo(false)
        } catch (error) {
            console.error('No se ha podido obtener la información del usuario')
            toast.error(warnings.error.userInfoRetrieve)
        }
    }

    const endEditUser = () => {
        setShowUserInfo(false)


    }

    const getListUser = async () => {

        try{
            const listUsers = await getAllUsers(user.accessToken);

            setUsers(listUsers.content)
            setIsLoading(false)

        }catch(error){
            console.error('Fallo al obtener todos los usuarios');
            toast.error('warnings.error.userRetrieve')
        }

    }
    useEffect(() => {

        getListUser();

    }, [])

    const deleteUser = async (idUser) => {
        try {
            await deleteUserData(idUser, user.accessToken);
            
            getListUser();
            toast.success(warnings.success.deleteUSer)

        } catch (error) {
            toast.error(warnings.error.userDelete)
        }
    }



    return (



        <main className={`${style.main} `}>
            <div className={`${style.container1} `}>

                <div>
                    <h1 className={`${style.h1} `}>{userTab.title}</h1>
                    <div className={`${style.searcher} `}>
                        <input type="text" className={`${style.inputUserSearch} `} placeholder={userTab.inputSearch} onChange={handleFindUsers} />
                        <div className={`${style.selectByType} `} onClick={handleClickEnabled}>
                            <div className={`${style.filters} `}>{activeFilter}</div>
                            {
                                (filterShow) &&
                                <div className={`${style.filterContainer} `}>
                                    {filters.map((currentKey) => {
                                        const key = Object.keys(currentKey)[0];
                                        const element = currentKey[key];

                                        return <div key={element} className={`${style.filterItem} `} onClick={() => changeActiveFilter(element, key)}>{element}</div>
                                    })}
                                </div>
                            }
                        </div>

                    </div>

                </div>
                <section className={`${style.userDescription} ${scrollBar ? style.withScrollBar : style.withoutScrollBar}`}>
                    <div className={`${style.itemDescription} `}>{userTab.listColumns.id}</div>
                    <div className={`${style.itemDescription} `}>{userTab.listColumns.username}</div>
                    <div className={`${style.itemDescription} `}>{userTab.listColumns.email}</div>
                    <div className={`${style.itemDescription} `}>{userTab.listColumns.actions}</div>
                </section>
                <hr className={`${style.hr} `} />
                <div ref={scrollElement} className={`${style.userResult} `}>



                    {
                        (!isLoading) &&
                        users.map(user => (
                            <UserItem key={user.id} dataUser={user} editUser={editUser} deleteUser={deleteUser} />

                        ))
                    }
                </div>
            </div>
            {
                (!showUserInfo) ? <UserStatistics /> : <UserInfo endEditUser={endEditUser} isLoadingUserInfo={isLoadingUserInfo} userInfo={userInfo} />

            }
        </main>

    )
}

