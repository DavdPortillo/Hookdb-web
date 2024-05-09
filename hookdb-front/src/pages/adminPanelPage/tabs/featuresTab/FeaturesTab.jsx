import style from '../../css/tab.module.css';
import generalize from '../../../../css/generalize.module.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../../../context/UserContext';
import { FeatureItem } from './components/FeatureItem';
import { CreateFeatureInfo } from './components/CreateFeatureInfo';
import { deleteFeatureById, findFeatureByName, getFeatureById, getFeatures } from '../../../../helpers/dataAPI';
import { FeatureInfo } from './components/FeatureInfo';
import toast from "react-hot-toast";

export const FeaturesTab = () => {

    const [features, setFeatures] = useState(null);
    const { user, language } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [showCreateFeature, setShowCreateFeature] = useState(null);
    const [featureInfo, setFeatureInfo] = useState(null);
    const [isLoadingFeatureInfo, setIsLoadingFeatureInfo] = useState(true);
    const featureTab = language.adminPanelPage.featureTab;
    const warnings = language.warnings;

    const scrollElement = useRef(null);
    const [scrollBar, setScrollBar] = useState(false);
  
    useEffect(() => {
      const scroll = scrollElement.current;
      const hasVerticalScroll = scroll.scrollHeight > scroll.clientHeight;
      hasVerticalScroll ? setScrollBar(true) : setScrollBar(false);
    }, []);
  
    const handleFindGenre = async (event) => {
      const searchText = event.target.value;
      let fetchResult;
  
      if (searchText !== "") {
        try{
          fetchResult = await findFeatureByName(searchText, user.accessToken);

        }catch(error){
          console.error('Fallo al buscar la característica por nombre')
          toast.error(warnings.error.searchByName)
        }
      } else {
        try{
          fetchResult = await getFeatures(user.accessToken);

        }catch(error){
          console.error('Fallo al obtener todas las características')
          toast.error(warnings.error.featureRetrieve)
        }
      }
  
      setFeatures(fetchResult);
    };
  
    const getListFeatures = async () => {


      try{
        const listGenres = await getFeatures(user.accessToken);
        setFeatures(listGenres);
        setIsLoading(false);
      }catch(error){
        console.error('Fallo al obtener todas las características')
        toast.error(warnings.error.featureRetrieve)
      }
      
    };
  
    useEffect(() => {
      getListFeatures();
    }, []);
  
    const editFeature = async (idFeature) => {


      try{
        setIsLoadingFeatureInfo(true);
        setShowCreateFeature(false);
        const fetchGenreInfo = await getFeatureById(idFeature, user.accessToken);
        setFeatureInfo(fetchGenreInfo);
        setIsLoadingFeatureInfo(false);
  
      }catch(error){
        console.error('Fallo al obtener la información de la característica')
        toast.error(warnings.error.featureInfoRetrieve)
      }
    };
  
    const endEditFeature = () => {
      setShowCreateFeature(true);
    };
  
    const createGenre = () => {
      setShowCreateFeature(true);
    };
  
    const deleteFeature = async (idFeature) => {
      try{
        await deleteFeatureById(idFeature, user.accessToken);
        getListFeatures();
        toast.success(warnings.success.deleteFeature)

  
      }catch(error){
        console.error('Fallo al eliminar la característica')
        toast.error(warnings.error.featureDelete)
      }
    };




  return (
        <main className={`${style.main} `}>
          <section className={`${style.container1} `}>
            <h1 className={`${style.h1} `}>{featureTab.title}</h1>
            <button
              className={`${generalize.buttonStyle_unselected} ${style.createNewsButton}`}
              onClick={createGenre}
            >
              {featureTab.createFeature}
            </button>
            <div className={`${style.searcher} `}>
              <input
                type="text"
                className={`${style.inputUserSearch} `}
                placeholder={featureTab.inputSearch}
                onChange={handleFindGenre}
              />
            </div>
            <section
              className={`${style.userDescription} ${scrollBar ? style.withScrollBar : style.withoutScrollBar
                }`}
            >
              <div className={`${style.itemDescription} `}>{featureTab.listColumns.id}</div>
              <div className={`${style.itemDescription} `}>{featureTab.listColumns.name}</div>
              <div className={`${style.itemDescription} `}>{featureTab.listColumns.actions}</div>
            </section>
            <hr className={`${style.hr} `} />
            <div ref={scrollElement} className={`${style.userResult} `}>
              {!isLoading &&
                features.map((featureItem) => (
                  <FeatureItem
                    key={featureItem.id}
                    featureItem={featureItem}
                    editFeature={editFeature}
                    deleteFeature={deleteFeature}
                  />
                ))}
            </div>
          </section>
          {!showCreateFeature ? (
            <FeatureInfo
              endEditFeature={endEditFeature}
              featureInfo={featureInfo}
              isLoadingFeatureInfo={isLoadingFeatureInfo}
            />
          ) : (
            <CreateFeatureInfo getListFeatures={getListFeatures}/>
          )}
        </main>
      );
    };
    