import { useContext, useEffect, useState } from 'react';
import { AsideLists } from './components/AsideLists';
import { MainLists } from './components/MainLists';
import style from './css/listPage.module.css';
import { changeNameListById, deleteListById, getGamesFromListById, getListByUser } from '../../helpers/dataAPI';
import { UserContext } from '../../context/UserContext';




export const ListPage = () => {
  const [showCurrentList, setShowCurrentList] = useState(0); 
  const [activeList, setActiveList] = useState(0);

  const [listData, setListData] = useState([]);
  const [isLoadingLists, setIsLoadingLists] = useState(true);
  const [isLoadingGames, setIsLoadingGames] = useState(true);
  const { user, userLoaded, language } = useContext(UserContext);
  const listPage = language.listPage;
  const handleChangeList = (idList) => {
    if (activeList === idList) return;
    setActiveList(idList);
    setShowCurrentList(idList);
    setIsLoadingGames(true)
  }

  const handleDeleteList = async (idToDelete) => {

    const response = await deleteListById(user.id, idToDelete, user.accessToken);
    if (response.ok) {
      const newListData = listData.filter(item => item.id !== idToDelete);
      setListData(newListData);
      setActiveList(newListData[0] && newListData[0].id)

      if (showCurrentList === idToDelete) {
        setIsLoadingGames(true)
        setShowCurrentList(newListData[0] && newListData[0].id);
      }
    }


  }
  const getListIndex = () => {
    return listData.findIndex(list => list.id === showCurrentList);
  }

 

  useEffect(() => {
    const getGameOfLists = async () => {

      const index = getListIndex();
      if (index !== -1) {
        const gameListInfo = await getGamesFromListById(user.id, listData[index].id, user.accessToken);

        const updatedListData = listData.map((list) => {
          if (list.id === showCurrentList) {
            return { ...list, games: gameListInfo }; 
          } else {
            return list;
          }
        })

        setListData(updatedListData); 
        setIsLoadingGames(false)
      }
    }

    if (!isLoadingLists) {
      getGameOfLists();
    }

  }, [user, userLoaded, isLoadingLists, showCurrentList]);




  useEffect(() => {
    const getListData = async () => {
      const listsInfo = await getListByUser(user.id, user.accessToken);
      if (listsInfo.length > 0) {
        setActiveList(listsInfo[showCurrentList].id)
        setListData(listsInfo);
        setShowCurrentList(listsInfo[0].id);
      }

      setIsLoadingLists(false)
    }


    if (isLoadingLists && userLoaded) {
      getListData();
    }

  }, [user, userLoaded, isLoadingLists, showCurrentList, listData]);


  const changeNameList = async (idList, newValue) => {
    if (newValue === '' ) return

    setListData(prevListData => {

      const index = prevListData.findIndex(item => item.id === idList);
      if (index !== -1) {
        const updatedListData = [...prevListData];
        updatedListData[index] = { ...updatedListData[index], name: newValue };
        return updatedListData;
      }
      return prevListData;
    });

    await changeNameListById(user.id, idList, newValue, user.accessToken);
  }

  const handleAddNewList = (newList) => {
    newList.gamesCount = 0;

    setListData(prevListData => {
      return [...prevListData, newList];
    });
  }


  return (
    <>
      <h1 className={`${style.title} `}>{listPage.title}</h1>
      <div className={`${style.container} `}>
        <AsideLists listData={listData} handleChangeListCollection={{ handleChangeList, activeList, changeNameList }} handleDeleteList={handleDeleteList} handleAddNewList={handleAddNewList} isLoadingList={isLoadingLists} />
        {!isLoadingGames ? ((listData.length !== 0) && <MainLists listData={listData[getListIndex()]} showCurrentList={showCurrentList} />) : <h2 className={`${style.listContainer} `}>{listPage.warnings.noOpenList}</h2>}


      </div>
    </>
  )
}


