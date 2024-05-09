import { useEffect, useRef, useState } from "react";
import style from '../../css/tab.module.css';

import {
  deletePlatformById,
  getPlatforms,
  getPlatformById,
  findPlatformByName,
} from "../../../../helpers/dataAPI";
import { useContext } from "react";
import { UserContext } from "../../../../context/UserContext";
import generalize from "../../../../css/generalize.module.css";
import { CreatePlatformInfo } from "./components/CreatePlatformInfo";
import { PlatformInfo } from "./components/PlatformInfo";
import { PlatformItem } from "./components/PlatformItem";
import toast from "react-hot-toast";

export const PlatformTab = () => {
  const [platforms, setPlatforms] = useState(null);
  const { user, language } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreatePlatform, setShowCreatePlatform] = useState(null);
  const [platformInfo, setPlatformInfo] = useState(null);
  const [isLoadingPlatformInfo, setIsLoadingPlatformInfo] = useState(true);
  const warnings = language.warnings;

  const platformTab = language.adminPanelPage.platformTab;
  const scrollElement = useRef(null);
  const [scrollBar, setScrollBar] = useState(false);

  useEffect(() => {
    const scroll = scrollElement.current;
    const hasVerticalScroll = scroll.scrollHeight > scroll.clientHeight;
    hasVerticalScroll ? setScrollBar(true) : setScrollBar(false);
  }, []);

  const handleFindPlatform = async (event) => {
    const searchText = event.target.value;
    let fetchResult;

    if (searchText !== "") {
      try {
        fetchResult = await findPlatformByName(searchText, user.accessToken);

      } catch (error) {
        console.error('Fallo al buscar la plataforma por nombre')
        toast.error(warnings.error.searchByName)
      }
    } else {
      try {
        fetchResult = await getPlatforms(user.accessToken);

      } catch (error) {
        console.error('Fallo al obtener todas las plataformas')
        toast.error(warnings.error.platformRetrieve)
      }
    }

    setPlatforms(fetchResult);
  };

  const getListPlatforms = async () => {
    try {
      const listPlatforms = await getPlatforms(user.accessToken);
      setPlatforms(listPlatforms);
      setIsLoading(false);
    } catch (error) {
      console.error('Fallo al obtener todas las plataformas')
      toast.error(warnings.error.platformRetrieve)
    }

  };

  useEffect(() => {
    getListPlatforms();
  }, []);

  const editPlatform = async (idPlatform) => {

    try {

      setIsLoadingPlatformInfo(true);
      setShowCreatePlatform(false);
      const fetchPlatformInfo = await getPlatformById(
        idPlatform,
        user.accessToken
      );
      setPlatformInfo(fetchPlatformInfo);
      setIsLoadingPlatformInfo(false);

    } catch (error) {
      console.error('Fallo al obtener la información de la plataforma')
      toast.error(warnings.error.platformInfoRetrieve)
    }



  };

  const endEditUser = () => {
    setShowCreatePlatform(true);
  };

  const createPlatform = () => {
    setShowCreatePlatform(true);
  };

  const deletePlatform = async (idPlatform) => {





    try{

      await deletePlatformById(idPlatform, user.accessToken);
      toast.success(warnings.success.deletePlatform)
      getListPlatforms()
    }catch(error){
      console.error('Fallo al eliminar la plataforma')
      toast.error(warnings.error.platformDelete)
    }
  };

  return (
    <main className={`${style.main} `}>
      <section className={`${style.container1} `}>
        <h1 className={`${style.h1} `}>{platformTab.title}</h1>
        <button
          className={`${generalize.buttonStyle_unselected} ${style.createNewsButton}`}
          onClick={createPlatform}>
          {platformTab.createPlatform}
        </button>
        <div className={`${style.searcher} `}>
          <input
            type="text"
            className={`${style.inputUserSearch} `}
            placeholder={platformTab.inputSearch}
            onChange={handleFindPlatform}
          />
        </div>
        <section
          className={`${style.userDescription} ${scrollBar ? style.withScrollBar : style.withoutScrollBar
            }`}
        >
          <div className={`${style.itemDescription} `}>{platformTab.listColumns.id}</div>
          <div className={`${style.itemDescription} `}>{platformTab.listColumns.name}</div>
          <div className={`${style.itemDescription} `}>{platformTab.listColumns.actions}</div>
        </section>
        <hr className={`${style.hr} `} />
        <div ref={scrollElement} className={`${style.userResult} `}>
          {!isLoading &&
            platforms.map((platformItem) => (
              <PlatformItem
                key={platformItem.id}
                platformItem={platformItem}
                editPlatform={editPlatform}
                deletePlatform={deletePlatform}
              />
            ))}
        </div>
      </section>
      {!showCreatePlatform ? (
        <PlatformInfo
          endEditUser={endEditUser}
          platformInfo={platformInfo}
          isLoadingPlatformInfo={isLoadingPlatformInfo}
        />
      ) : (
        <CreatePlatformInfo getListPlatforms={getListPlatforms}/>
      )}
    </main>
  );
};
