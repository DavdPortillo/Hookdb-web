import { useEffect, useRef, useState } from "react";
import style from '../../css/tab.module.css';

import {
  deleteLanguageById,
  getLanguages,
  getLanguageById,
  findLanguageByName,
} from "../../../../helpers/dataAPI";
import { useContext } from "react";
import { UserContext } from "../../../../context/UserContext";
import generalize from "../../../../css/generalize.module.css";
import { CreateLanguageInfo } from "./components/CreateLanguageInfo";
import { LanguageInfo } from "./components/LanguageInfo";
import { LanguageItem } from "./components/LanguageItem";
import toast from "react-hot-toast";

export const LanguageTab = () => {
  const [languages, setLanguages] = useState(null);
  const { user, language } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateLanguage, setShowCreateLanguage] = useState(null);
  const [languageInfo, setLanguageInfo] = useState(null);
  const [isLoadingLanguageInfo, setIsLoadingLanguageInfo] = useState(true);

  const scrollElement = useRef(null);
  const [scrollBar, setScrollBar] = useState(false);
  const languageTab = language.adminPanelPage.languageTab;
  const warnings = language.warnings;

  useEffect(() => {
    const scroll = scrollElement.current;
    const hasVerticalScroll = scroll.scrollHeight > scroll.clientHeight;
    hasVerticalScroll ? setScrollBar(true) : setScrollBar(false);
  }, []);

  const handleFindLanguage = async (event) => {
    const searchText = event.target.value;
    let fetchResult;

    if (searchText !== "") {
      try{
        fetchResult = await findLanguageByName(searchText, user.accessToken);

      }catch(error){
        console.error('Fallo al buscar el idioma por nombre')
        toast.error(warnings.error.searchByName)
      }

    } else {

      try{
        fetchResult = await getLanguages(user.accessToken);

      }catch(error){
        console.error('Fallo al obtener todos los idiomas')
        toast.error(warnings.error.languageRetrieve)
      }
    }

    setLanguages(fetchResult);
  };

  const getListLanguages = async () => {


    try{
      const listLanguages = await getLanguages(user.accessToken);
      setLanguages(listLanguages);
      setIsLoading(false);
    }catch(error){
      console.error('Fallo al obtener todos los idiomas')
      toast.error(warnings.error.languageRetrieve)
    }
  };

  useEffect(() => {
    getListLanguages();
  }, []);

  const editLanguage = async (idLanguage) => {



    try{
      setIsLoadingLanguageInfo(true);
      setShowCreateLanguage(false);
      const fetchLanguageInfo = await getLanguageById(idLanguage, user.accessToken);
      setLanguageInfo(fetchLanguageInfo);
      setIsLoadingLanguageInfo(false);
    }catch(error){
      console.error('Fallo al obtener la información del idioma')
      toast.error(warnings.error.languageInfoRetrieve)
    }
  };

  const endEditUser = () => {
    setShowCreateLanguage(true);
  };

  const createLanguage = () => {
    setShowCreateLanguage(true);
  };

  const deleteLanguage = async (idLanguage) => {


    try{
      await deleteLanguageById(idLanguage, user.accessToken);
      toast.success(warnings.success.deleteLanguage);

      getListLanguages();

    }catch(error){
      console.error('Fallo al eliminar el idioma')
      toast.error(warnings.error.languageDelete)
    }
  };



  return (
    <main className={`${style.main} `}>
      <section className={`${style.container1} `}>
        <h1 className={`${style.h1} `}>{languageTab.title}</h1>
        <button
          className={`${generalize.buttonStyle_unselected} ${style.createNewsButton}`}
          onClick={createLanguage}
        >
          {languageTab.createLanguage}
        </button>
        <div className={`${style.searcher} `}>
          <input
            type="text"
            className={`${style.inputUserSearch} `}
            placeholder={languageTab.inputSearch}
            onChange={handleFindLanguage}
          />
        </div>
        <section
          className={`${style.userDescription} ${
            scrollBar ? style.withScrollBar : style.withoutScrollBar
          }`}
        >
          <div className={`${style.itemDescription} `}>{languageTab.listColumns.id}</div>
          <div className={`${style.itemDescription} `}>{languageTab.listColumns.name}</div>
          <div className={`${style.itemDescription} `}>{languageTab.listColumns.actions}</div>
        </section>
        <hr className={`${style.hr} `} />
        <div ref={scrollElement} className={`${style.userResult} `}>
          {!isLoading &&
            languages.map((languageItem) => (
              <LanguageItem
                key={languageItem.id}
                languageItem={languageItem}
                editLanguage={editLanguage}
                deleteLanguage={deleteLanguage}
              />
            ))}
        </div>
      </section>
      {!showCreateLanguage ? (
        <LanguageInfo
          endEditUser={endEditUser}
          languageInfo={languageInfo}
          isLoadingLanguageInfo={isLoadingLanguageInfo}
        />
      ) : (
        <CreateLanguageInfo getListLanguages={getListLanguages}/>
      )}
    </main>
  );
};
