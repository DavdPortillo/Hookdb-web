import { useEffect, useRef, useState } from "react";
import style from '../../css/tab.module.css';

import {
  deleteGenreById,
  getGenres,
  getGenreById,
  findGenreByName,
} from "../../../../helpers/dataAPI";
import { useContext } from "react";
import { UserContext } from "../../../../context/UserContext";
import generalize from "../../../../css/generalize.module.css";
import { CreateGenreInfo } from "./components/CreateGenreInfo";
import { GenreInfo } from "./components/GenreInfo";
import { GenreItem } from "./components/GenreItem";
import toast from "react-hot-toast";

export const GenreTab = () => {
  const [genres, setGenres] = useState(null);
  const { user, language } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateGenre, setShowCreateGenre] = useState(null);
  const [genreInfo, setGenreInfo] = useState(null);
  const [isLoadingGenreInfo, setIsLoadingGenreInfo] = useState(true);

  const scrollElement = useRef(null);
  const [scrollBar, setScrollBar] = useState(false);
  const genreTab = language.adminPanelPage.genreTab;
  const warnings = language.warnings;

  useEffect(() => {
    const scroll = scrollElement.current;
    const hasVerticalScroll = scroll.scrollHeight > scroll.clientHeight;
    hasVerticalScroll ? setScrollBar(true) : setScrollBar(false);
  }, []);

  const handleFindGenre = async (event) => {
    const searchText = event.target.value;
    let fetchResult;

    if (searchText !== "") {
      try {
        fetchResult = await findGenreByName(searchText, user.accessToken);

      } catch (error) {
        console.error("Fallo al buscar el género por nombre")
        toast.error(warnings.error.searchByName)
      }
    } else {
      try {
        fetchResult = await getGenres(user.accessToken);

      } catch (error) {
        console.error("Fallo al obtener todos los géneros")
        toast.error(warnings.error.genreRetrieve)
      }
    }

    setGenres(fetchResult);
  };

  const getListGenres = async () => {


    try {
      const listGenres = await getGenres(user.accessToken);
      setGenres(listGenres);
      setIsLoading(false);

    } catch (error) {
      console.error("Fallo al obtener todos los géneros")
      toast.error(warnings.error.genreRetrieve)
    }

  };

  useEffect(() => {
    getListGenres();
  }, []);

  const editGenre = async (idGenre) => {
    try {

      setIsLoadingGenreInfo(true);
      setShowCreateGenre(false);
      const fetchGenreInfo = await getGenreById(idGenre, user.accessToken);
      setGenreInfo(fetchGenreInfo);
      setIsLoadingGenreInfo(false);
      
    } catch (error) {
      console.error("Fallo al obtener la información del género")
      toast.error(warnings.error.genreInfoRetrieve)
    }




  };

  const endEditUser = () => {
    setShowCreateGenre(true);
  };

  const createGenre = () => {
    setShowCreateGenre(true);
  };

  const deleteGenre = async (idGenre) => {


    try {
      await deleteGenreById(idGenre, user.accessToken);
      toast.success(warnings.success.deleteGenre)
      getListGenres()
      
    } catch (error) {
      console.error("Fallo al eliminar la información del género")
      toast.error(warnings.error.genreDelete)
    }
  };

  return (
    <main className={`${style.main} `}>
      <section className={`${style.container1} `}>
        <h1 className={`${style.h1} `}>{genreTab.title}</h1>
        <button
          className={`${generalize.buttonStyle_unselected} ${style.createNewsButton}`}
          onClick={createGenre}
        >
          {genreTab.createGenre}
        </button>
        <div className={`${style.searcher} `}>
          <input
            type="text"
            className={`${style.inputUserSearch} `}
            placeholder={genreTab.inputSearch}
            onChange={handleFindGenre}
          />
        </div>
        <section
          className={`${style.userDescription} ${scrollBar ? style.withScrollBar : style.withoutScrollBar
            }`}
        >
          <div className={`${style.itemDescription} `}>{genreTab.listColumns.id}</div>
          <div className={`${style.itemDescription} `}>{genreTab.listColumns.name}</div>
          <div className={`${style.itemDescription} `}>{genreTab.listColumns.actions}</div>
        </section>
        <hr className={`${style.hr} `} />
        <div ref={scrollElement} className={`${style.userResult} `}>
          {!isLoading &&
            genres.map((genreItem) => (
              <GenreItem
                key={genreItem.id}
                genreItem={genreItem}
                editGenre={editGenre}
                deleteGenre={deleteGenre}
              />
            ))}
        </div>
      </section>
      {!showCreateGenre ? (
        <GenreInfo
          endEditUser={endEditUser}
          genreInfo={genreInfo}
          isLoadingGenreInfo={isLoadingGenreInfo}
        />
      ) : (
        <CreateGenreInfo getListGenres={getListGenres} />
      )}
    </main>
  );
};
