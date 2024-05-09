import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../../../context/UserContext";
import { deleteDlcById, findDLCByName, getDlc, getDlcById } from "../../../../helpers/dataAPI";
import style from '../../css/tab.module.css';
import generalize from "../../../../css/generalize.module.css";
import { CreateDlcInfo } from "./components/CreateDlcInfo";
import { DlcItem } from "./components/DlcItem";
import { DlcInfo } from "./components/DlcInfo";
import toast from "react-hot-toast";

export const DLCTab = () => {
  const [dlcs, setDlcs] = useState(null);
  const { user, language } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateDlc, setShowCreateDlc] = useState(null);
  const [dlcInfo, setDlcInfo] = useState(null);
  const [isLoadingDlcInfo, setIsLoadingDlcInfo] = useState(true);
  const dlcTab = language.adminPanelPage.dlcTab;
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
      try{
        fetchResult = await findDLCByName(searchText, user.accessToken);

      }catch(error){
        console.error('Fallo al buscar el dlc por nombre')
        toast.error(warnings.error.searchByName)
      }
    } else {
      try{
        fetchResult = await getDlc(user.accessToken);

      }catch(error){
        console.error('Fallo al obtener todos los dlcs')
        toast.error(warnings.error.dlcRetrieve)
      }
    }

    setDlcs(fetchResult);
  };



  const getListDistributors = async () => {


    try{
      const listDistributors = await getDlc(user.accessToken);
      setDlcs(listDistributors);
      setIsLoading(false);
    }catch(error){
      console.error('Fallo al obtener todos los dlcs')
      toast.error(warnings.error.dlcRetrieve)
    }
  };

  useEffect(() => {
    getListDistributors();
  }, []);

  const editDlc = async (idDlc) => {

    try{
      setIsLoadingDlcInfo(true);
      setShowCreateDlc(false);
      const fetchDistributorInfo = await getDlcById(idDlc, user.accessToken);
      setDlcInfo(fetchDistributorInfo);
      setIsLoadingDlcInfo(false);
    }catch(error){
      console.error('Fallo al obtener la información del dlc')
      toast.error(warnings.error.dlcInfoRetrieve)
    }
  };

  const endEditDlc = () => {
    setShowCreateDlc(true);
  };

  const createDistributor = () => {
    setShowCreateDlc(true);
  };

  const deleteDlc = async (idDistributor) => {



    try{
      await deleteDlcById(idDistributor, user.accessToken);
      toast.success(warnings.success.deleteDlc)
      getListDistributors()
    }catch(error){
      console.error('Fallo al eliminar el dlc')
      toast.error(warnings.error.dlcDelete)
    }
  };

  return (
    <main className={`${style.main} `}>
      <section className={`${style.container1} `}>
        <h1 className={`${style.h1} `}>{dlcTab.title}</h1>
        <button
          className={`${generalize.buttonStyle_unselected} ${style.createNewsButton}`}
          onClick={createDistributor}
        >
          {dlcTab.createDlc}
        </button>
        <div className={`${style.searcher} `}>
          <input
            type="text"
            className={`${style.inputUserSearch} `}
            placeholder={dlcTab.inputSearch}
            onChange={handleFindDistributor}
          />
        </div>
        <section
          className={`${style.userDescription} ${scrollBar ? style.withScrollBar : style.withoutScrollBar
            }`}
        >
          <div className={`${style.itemDescription} `}>{dlcTab.listColumns.id}</div>
          <div className={`${style.itemDescription} `}>{dlcTab.listColumns.name}</div>
          <div className={`${style.itemDescription} `}>{dlcTab.listColumns.actions}</div>
        </section>
        <hr className={`${style.hr} `} />
        <div ref={scrollElement} className={`${style.userResult} `}>
          {!isLoading &&
            dlcs.map((dlcItem) => (
              <DlcItem
                key={dlcItem.id}
                dlcItem={dlcItem}
                editDlc={editDlc}
                deleteDlc={deleteDlc}
              />
            ))}
        </div>
      </section>
      {!showCreateDlc ? (
        <DlcInfo
          endEditDlc={endEditDlc}
          dlcInfo={dlcInfo}
          isLoadingDlcInfo={isLoadingDlcInfo}
        />
      ) : (
        <CreateDlcInfo getListDistributors={getListDistributors}/>
      )}
    </main>
  );
};
