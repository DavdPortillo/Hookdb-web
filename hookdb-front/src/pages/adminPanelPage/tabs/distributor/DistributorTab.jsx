import { useEffect, useRef, useState } from "react";
import style from '../../css/tab.module.css';

import {
  deleteDistributorById,
  getDistributors,
  getDistributorById,
  findDistributorByName,
} from "../../../../helpers/dataAPI";
import { useContext } from "react";
import { UserContext } from "../../../../context/UserContext";
import generalize from "../../../../css/generalize.module.css";
import { CreateDistributorInfo } from "./components/CreateDistributorInfo";
import { DistributorInfo } from "./components/DistributorInfo";
import { DistributorItem } from "./components/DistributorItem";
import toast from "react-hot-toast";

export const DistributorTab = () => {
  const [distributors, setDistributors] = useState(null);
  const { user, language } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateDistributor, setShowCreateDistributor] = useState(null);
  const [distributorInfo, setDistributorInfo] = useState(null);
  const [isLoadingDistributorInfo, setIsLoadingDistributorInfo] = useState(true);
  const distributorTab = language.adminPanelPage.distributorTab;
  const warnings = language.warnings;

  const scrollElement = useRef(null);
  const [scrollBar, setScrollBar] = useState(false);

  useEffect(() => {
    const scroll = scrollElement.current;
    const hasVerticalScroll = scroll.scrollHeight > scroll.clientHeight;
    hasVerticalScroll ? setScrollBar(true) : setScrollBar(false);
  }, []);

  const handleFindDistributor = async (event) => {
    const searchText = event.target.value;
    let fetchResult;

    if (searchText !== "") {
      try {

        fetchResult = await findDistributorByName(searchText, user.accessToken);
      } catch (error) {
        console.error('Fallo al buscar un distribuidor por nombre');
        toast.error(warnings.error.searchByName);
      }
    } else {

      try {

        fetchResult = await getDistributors(user.accessToken);
      } catch (error) {
        console.error('Fallo al obtener todos los distribuidores');
        toast.error(warnings.error.distributorRetrieve);
      }
    }

    setDistributors(fetchResult);
  };

  const getListDistributors = async () => {


    try {

      const listDistributors = await getDistributors(user.accessToken);
      setDistributors(listDistributors);
      setIsLoading(false);
    } catch (error) {
      console.error('Fallo al obtener todos los distribuidores');
      toast.error(warnings.error.distributorRetrieve);
    }
  };

  useEffect(() => {
    getListDistributors();
  }, []);

  const editDistributor = async (idDistributor) => {



    try {

      setIsLoadingDistributorInfo(true);
      setShowCreateDistributor(false);
      const fetchDistributorInfo = await getDistributorById(idDistributor, user.accessToken);
      setDistributorInfo(fetchDistributorInfo);
      setIsLoadingDistributorInfo(false);
    } catch (error) {
      console.error('Fallo al obtener la información del distribuidor');
      toast.error(warnings.error.distributorInfoRetrieve);
    }
  };

  const endEditUser = () => {
    setShowCreateDistributor(true);
  };

  const createDistributor = () => {
    setShowCreateDistributor(true);
  };

  const deleteDistributor = async (idDistributor) => {


    try {

      await deleteDistributorById(idDistributor, user.accessToken);
      toast.success(warnings.success.deleteDistributor)

      getListDistributors();

    } catch (error) {
      console.error('Fallo al eliminar el distribuidor');
      toast.error(warnings.error.distributorDelete);
    }
  };

  return (
    <main className={`${style.main} `}>
      <section className={`${style.container1} `}>
        <h1 className={`${style.h1} `}>{distributorTab.title}</h1>
        <button
          className={`${generalize.buttonStyle_unselected} ${style.createNewsButton}`}
          onClick={createDistributor}
        >
          {distributorTab.createDistributor}
        </button>
        <div className={`${style.searcher} `}>
          <input
            type="text"
            className={`${style.inputUserSearch} `}
            placeholder={distributorTab.inputSearch}
            onChange={handleFindDistributor}
          />
        </div>
        <section
          className={`${style.userDescription} ${scrollBar ? style.withScrollBar : style.withoutScrollBar
            }`}
        >
          <div className={`${style.itemDescription} `}>{distributorTab.listColumns.id}</div>
          <div className={`${style.itemDescription} `}>{distributorTab.listColumns.name}</div>
          <div className={`${style.itemDescription} `}>{distributorTab.listColumns.actions}</div>
        </section>
        <hr className={`${style.hr} `} />
        <div ref={scrollElement} className={`${style.userResult} `}>
          {!isLoading &&
            distributors.map((distributorItem) => (
              <DistributorItem
                key={distributorItem.id}
                distributorItem={distributorItem}
                editDistributor={editDistributor}
                deleteDistributor={deleteDistributor}
              />
            ))}
        </div>
      </section>
      {!showCreateDistributor ? (
        <DistributorInfo
          endEditUser={endEditUser}
          distributorInfo={distributorInfo}
          isLoadingDistributorInfo={isLoadingDistributorInfo}
        />
      ) : (
        <CreateDistributorInfo getListDistributors={getListDistributors} />
      )}
    </main>
  );
};
