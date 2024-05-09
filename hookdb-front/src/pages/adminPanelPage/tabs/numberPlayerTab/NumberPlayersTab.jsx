import { useEffect, useRef, useState } from "react";
import style from '../../css/tab.module.css';

import {
  getPlatformById,
  getNumberPlayers,
  findNumberPlayersByName,
  deleteNumberPlayersById,
  getNumberPlayersById,
} from "../../../../helpers/dataAPI";
import { useContext } from "react";
import { UserContext } from "../../../../context/UserContext";
import generalize from "../../../../css/generalize.module.css";
import { NumberPlayersItem } from "./components/NumberPlayersItem";
import { NumberPlayersInfo } from "./components/NumberPlayersInfo";
import { CreateNumberPlayers } from "./components/CreateNumberPlayers";
import toast from "react-hot-toast";

export const NumberPlayersTab = () => {
  const [numberPlayers, setNumberPlayers] = useState(null);
  const { user, language } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateNumberPlayers, setShowCreateNumberPlayers] = useState(null);
  const [numberPlayersInfo, setNumberPlayersInfo] = useState(null);
  const [isLoadingNumberPlayersInfo, setIsLoadingNumberPlayersInfo] = useState(true);
  const warnings = language.warnings;

  const numberPlayersTab = language.adminPanelPage.numberPlayersTab;
  const scrollElement = useRef(null);
  const [scrollBar, setScrollBar] = useState(false);

  useEffect(() => {
    const scroll = scrollElement.current;
    const hasVerticalScroll = scroll.scrollHeight > scroll.clientHeight;
    hasVerticalScroll ? setScrollBar(true) : setScrollBar(false);
  }, []);

  const handleFindNumberPlayers = async (event) => {
    const searchText = event.target.value;
    let fetchResult;

    if (searchText !== "") {
      try{
        fetchResult = await findNumberPlayersByName(searchText, user.accessToken);

      }catch(error){
        console.error('Fallo al buscar el número de jugadores por número')
        toast.error(warnings.error.numberPlayersByNumber)
      }
    } else {
      try{
        fetchResult = await getNumberPlayers(user.accessToken);

      }catch(error){
        console.error('Fallo al obtener todos los números de jugadores')
        toast.error(warnings.error.numberPlayersRetrieve)
      }
    }

    setNumberPlayers(fetchResult);
  };

  const getListNumberPlayers = async () => {
    try{
      const listNumberPlayers = await getNumberPlayers(user.accessToken);
      setNumberPlayers(listNumberPlayers);
      setIsLoading(false);
    }catch(error){
      console.error('Fallo al obtener todos los números de jugadores')
      toast.error(warnings.error.numberPlayersRetrieve)
    }
  };

  useEffect(() => {
    getListNumberPlayers();
  }, []);

  const editNumberPlayers = async (idPlatform) => {


    try{
      setIsLoadingNumberPlayersInfo(true);
      setShowCreateNumberPlayers(false);
      const fetchPlatformInfo = await getNumberPlayersById(
        idPlatform,
        user.accessToken
      );
      setNumberPlayersInfo(fetchPlatformInfo);
      setIsLoadingNumberPlayersInfo(false);
    }catch(error){
      console.error('Fallo al obtener la información del número de jugadores')
      toast.error(warnings.error.numberPlayersInfoRetrieve)
    }
  };

  const endEditUser = () => {
    setShowCreateNumberPlayers(true);
  };

  const createPlatform = () => {
    setShowCreateNumberPlayers(true);
  };

  const deletePlatform = async (idPlatform) => {


    try{
      await deleteNumberPlayersById(idPlatform, user.accessToken);
      toast.success(warnings.success.deleteNumberPlayers)
      getListNumberPlayers()
    }catch(error){
      console.error('Fallo al eliminar el número de jugadores')
      toast.error(warnings.error.numberPlayersDelete)
    }
  };

  return (
    <main className={`${style.main} `}>
      <section className={`${style.container1} `}>
        <h1 className={`${style.h1} `}>{numberPlayersTab.title}</h1>
        <button
          className={`${generalize.buttonStyle_unselected} ${style.createNewsButton}`}
          onClick={createPlatform}>
          {numberPlayersTab.createNumberPlayers}
        </button>
        <div className={`${style.searcher} `}>
          <input
            type="text"
            className={`${style.inputUserSearch} `}
            placeholder={numberPlayersTab.inputSearch}
            onChange={handleFindNumberPlayers}
          />
        </div>
        <section
          className={`${style.userDescription} ${
            scrollBar ? style.withScrollBar : style.withoutScrollBar
          }`}
        >
          <div className={`${style.itemDescription} `}>{numberPlayersTab.listColumns.id}</div>
          <div className={`${style.itemDescription} `}>{numberPlayersTab.listColumns.name}</div>
          <div className={`${style.itemDescription} `}>{numberPlayersTab.listColumns.actions}</div>
        </section>
        <hr className={`${style.hr} `} />
        <div ref={scrollElement} className={`${style.userResult} `}>
          {!isLoading &&
            numberPlayers.map((item) => (
              <NumberPlayersItem
                key={item.id}
                platformItem={item}
                editPlatform={editNumberPlayers}
                deletePlatform={deletePlatform}
              />
            ))}
        </div>
      </section>
      {!showCreateNumberPlayers ? (
        <NumberPlayersInfo
          endEditNumberPlayers={endEditUser}
          numberPlayersInfo={numberPlayersInfo}
          isLoadingNumberPlayersInfo={isLoadingNumberPlayersInfo}
        />
      ) : (
        <CreateNumberPlayers getListNumberPlayers={getListNumberPlayers}/>
      )}
    </main>
  );
};
