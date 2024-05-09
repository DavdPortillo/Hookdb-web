import { useContext, useEffect, useState } from 'react';

import { ListToolTip } from './components/ListToolTip';
import { UserContext } from '../../context/UserContext';
import { addGameToList, getListAndIfGameIsInList } from '../../helpers/dataAPI';

import style from './css/lists.module.css';

export const Lists = ({ idGame, handleClickShow }) => {

  const [isLoading, setIsLoading] = useState(true)
  const [lists, setLists] = useState(null)
  const { user, userLoaded } = useContext(UserContext);



  useEffect(() => {
    const loadLists = async () => {
      const listsInfo = await getListAndIfGameIsInList(user.id, idGame, user.accessToken);
      setLists(listsInfo);
      setIsLoading(false)
    }

    loadLists();

  }, [userLoaded, user, idGame])


  const fetchAddGameToList = async (idList) => {
    await addGameToList(user.id, idList, idGame, user.accessToken);
  }

  return (
    <div className={`${style.lists} `} >
      <div className={`${style.titleSection} `}>
        <div className={`${style.titleContainer} `}>

          <h3 className={`${style.h3} `}>Mis listas</h3>
          <div className={`${style.closeButtonContainer} `}>
            <button className={`${style.closeButton} `} onClick={handleClickShow} >
              <img src="../../../assets/global/cleanIcon.svg" height={16} width={16} alt="" />
            </button>
          </div>
        </div>

      </div>

      {
        (isLoading) ? <div>Cargando...</div> :
          lists.map(listData => {
            return <ListToolTip key={listData.id} listData={listData} fetchAddGameToList={fetchAddGameToList} idGame={idGame} />
          })

      }




    </div >
  )
}
