import { useEffect, useRef, useState } from "react";
import style from '../../css/tab.module.css';

import {
  deleteDeveloperById,
  getDevelopers,
  getDeveloperById,
  findDeveloperByName,
} from "../../../../helpers/dataAPI";
import { useContext } from "react";
import { UserContext } from "../../../../context/UserContext";
import generalize from "../../../../css/generalize.module.css";
import { CreateDeveloperInfo } from "./components/CreateDeveloperInfo";
import { DeveloperInfo } from "./components/DeveloperInfo";
import { DeveloperItem } from "./components/DeveloperItem";
import toast from "react-hot-toast";

export const DeveloperTab = () => {
  const [developers, setDevelopers] = useState(null);
  const { user, language } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateDeveloper, setShowCreateDeveloper] = useState(null);
  const [developerInfo, setDeveloperInfo] = useState(null);
  const [isLoadingDeveloperInfo, setIsLoadingDeveloperInfo] = useState(true);

  const scrollElement = useRef(null);
  const [scrollBar, setScrollBar] = useState(false);
  const developerTab = language.adminPanelPage.developerTab;
  const warnings = language.warnings;

  useEffect(() => {
    const scroll = scrollElement.current;
    const hasVerticalScroll = scroll.scrollHeight > scroll.clientHeight;
    hasVerticalScroll ? setScrollBar(true) : setScrollBar(false);
  }, []);

  const handleFindDeveloper = async (event) => {
    const searchText = event.target.value;
    let fetchResult;

    if (searchText !== "") {
      try{
        fetchResult = await findDeveloperByName(searchText, user.accessToken);

      }catch(error){
        console.error(warnings.error.searchByName)
        toast.error(warnings.error.searchByName)
      }

    } else {
      try{
        fetchResult = await getDevelopers(user.accessToken);

      }catch(error){
        console.error('Fallo al obtener todos los desarrolladores')
        toast.error(warnings.error.developerRetrieve)
      }
    }

    setDevelopers(fetchResult);
  };

  const getListDevelopers = async () => {



    try{
      const listDevelopers = await getDevelopers(user.accessToken);
      setDevelopers(listDevelopers);
      setIsLoading(false);
    }catch(error){
      console.error('Fallo al obtener todos los desarrolladores')
      toast.error(warnings.error.developerRetrieve)
    }
  };

  useEffect(() => {
    getListDevelopers();
  }, []);

  const editDeveloper = async (idDeveloper) => {



    try{
      setIsLoadingDeveloperInfo(true);
      setShowCreateDeveloper(false);
      const fetchDeveloperInfo = await getDeveloperById(idDeveloper, user.accessToken);
      setDeveloperInfo(fetchDeveloperInfo);
      setIsLoadingDeveloperInfo(false);
    }catch(error){
      console.error('Fallo al obtener la información del desarrollador')
      toast.error(warnings.error.developerInfoRetrieve)
    }
  };

  const endEditUser = () => {
    setShowCreateDeveloper(true);
  };

  const createDeveloper = () => {
    setShowCreateDeveloper(true);
  };

  const deleteDeveloper = async (idDeveloper) => {


    try{
      await deleteDeveloperById(idDeveloper, user.accessToken);
      toast.success(warnings.success.deleteDeveloper);

      getListDevelopers()
    }catch(error){
      console.error('Fallo al eliminar el desarrollador')
      toast.error(warnings.error.developerDelete)
    }
  };

  return (
    <main className={`${style.main} `}>
      <section className={`${style.container1} `}>
        <h1 className={`${style.h1} `}>{developerTab.title}</h1>
        <button
          className={`${generalize.buttonStyle_unselected} ${style.createNewsButton}`}
          onClick={createDeveloper}
        >
          {developerTab.createDeveloper}
        </button>
        <div className={`${style.searcher} `}>
          <input
            type="text"
            className={`${style.inputUserSearch} `}
            placeholder={developerTab.inputSearch}
            onChange={handleFindDeveloper}
          />
        </div>
        <section
          className={`${style.userDescription} ${
            scrollBar ? style.withScrollBar : style.withoutScrollBar
          }`}
        >
          <div className={`${style.itemDescription} `}>{developerTab.listColumns.id}</div>
          <div className={`${style.itemDescription} `}>{developerTab.listColumns.name}</div>
          <div className={`${style.itemDescription} `}>{developerTab.listColumns.actions}</div>
        </section>
        <hr className={`${style.hr} `} />
        <div ref={scrollElement} className={`${style.userResult} `}>
          {!isLoading &&
            developers.map((developerItem) => (
              <DeveloperItem
                key={developerItem.id}
                developerItem={developerItem}
                editDeveloper={editDeveloper}
                deleteDeveloper={deleteDeveloper}
              />
            ))}
        </div>
      </section>
      {!showCreateDeveloper ? (
        <DeveloperInfo
          endEditUser={endEditUser}
          developerInfo={developerInfo}
          isLoadingDeveloperInfo={isLoadingDeveloperInfo}
        />
      ) : (
        <CreateDeveloperInfo getListDevelopers={getListDevelopers}/>
      )}
    </main>
  );
};
