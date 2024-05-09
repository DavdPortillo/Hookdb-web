import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../../../context/UserContext";
import style from '../../css/tab.module.css';
import generalize from '../../../../css/generalize.module.css';
import { deleteProductPlatformById, findProductPlatformByName, getProductPlatform, getProductPlatformById } from "../../../../helpers/dataAPI";
import { ProductPlatformItem } from "./components/ProductPlatformItem";
import { CreateProductPlatformInfo } from "./components/CreateProductPlatformInfo";
import { ProductPlatformInfo } from "./components/ProductPlatformInfo";
import toast from "react-hot-toast";

export const ProductPlatformTab = () => {
    const [productPlatform, setProductPlatform] = useState(null);
    const { user, language } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [showCreateProductPlatform, setshowCreateProductPlatform] = useState(null);
    const [productPlatformInfo, setProductPlatformInfo] = useState(null);
    const [isLoadingProductPlatform, setisLoadingProductPlatform] = useState(true);
    const productPlatformTab = language.adminPanelPage.productPlatformTab;
    const warnings = language.warnings;

    const scrollElement = useRef(null);
    const [scrollBar, setScrollBar] = useState(false);
  
    useEffect(() => {
      const scroll = scrollElement.current;
      const hasVerticalScroll = scroll.scrollHeight > scroll.clientHeight;
      hasVerticalScroll ? setScrollBar(true) : setScrollBar(false);
    }, []);
  
    const handleFindProductPlatform = async (event) => {
      const searchText = event.target.value;
      let fetchResult;
  
      if (searchText !== "") {
        try{
          fetchResult = await findProductPlatformByName(searchText, user.accessToken);
          
        }catch(error){
          console.error("Fallo al buscar una plataforma del producto por nombre")
          toast.error(warnings.error.searchByName)
        }
      } else {

        try{
          fetchResult = await getProductPlatform(user.accessToken);
          
        }catch(error){
          console.error("Fallo al obtener todas las plataformas del producto")
          toast.error(warnings.error.productPlatformRetrieve)
        }
      }
  
      setProductPlatform(fetchResult);
    };
  
    const getListProductPlatform = async () => {
   

      try{
        const listProductPlatform = await getProductPlatform(user.accessToken);
        setProductPlatform(listProductPlatform);
        setIsLoading(false);        
      }catch(error){
        console.error("Fallo al obtener todas las plataformas del producto")
        toast.error(warnings.error.productPlatformRetrieve)
      }
    };
  
    useEffect(() => {
      getListProductPlatform();
    }, []);
  
    const editProductPlatform = async (idProductPlatform) => {

      try{
        setisLoadingProductPlatform(true);
        setshowCreateProductPlatform(false);
        const fetchProductPlatformInfo = await getProductPlatformById(idProductPlatform, user.accessToken);
        setProductPlatformInfo(fetchProductPlatformInfo);
        setisLoadingProductPlatform(false);
      }catch(error){
        console.error("Fallo al obtener la información de la plataforma del producto")
        toast.error(warnings.error.productPlatformInfoRetrieve)
      }
    };
  
    const endEditProductPlatform = () => {
      setshowCreateProductPlatform(true);
    };
  
    const createProductPlatform = () => {
      setshowCreateProductPlatform(true);
    };
  
    const deleteProductPlatform = async (idProductPlatform) => {



      try{
        await deleteProductPlatformById(idProductPlatform, user.accessToken);
        toast.success(warnings.success.deleteProductPlatform);

        getListProductPlatform();
      }catch(error){
        console.error("Fallo al eliminar la plataforma del producto")
        toast.error(warnings.error.productPlatformDelete)
      }
    };




  return (
        <main className={`${style.main} `}>
          <section className={`${style.container1} `}>
            <h1 className={`${style.h1} `}>{productPlatformTab.title}</h1>
            <button
              className={`${generalize.buttonStyle_unselected} ${style.createNewsButton}`}
              onClick={createProductPlatform}
            >
              {productPlatformTab.createProductPlatform}
            </button>
            <div className={`${style.searcher} `}>
              <input
                type="text"
                className={`${style.inputUserSearch} `}
                placeholder={productPlatformTab.inputSearch}
                onChange={handleFindProductPlatform}
              />
            </div>
            <section
              className={`${style.userDescription} ${scrollBar ? style.withScrollBar : style.withoutScrollBar
                }`}
            >
              <div className={`${style.itemDescription} `}>{productPlatformTab.listColumns.id}</div>
              <div className={`${style.itemDescription} `}>{productPlatformTab.listColumns.name}</div>
              <div className={`${style.itemDescription} `}>{productPlatformTab.listColumns.actions}</div>
            </section>
            <hr className={`${style.hr} `} />
            <div ref={scrollElement} className={`${style.userResult} `}>
              {!isLoading &&
                productPlatform.map((productPlatformItem) => (
                  <ProductPlatformItem
                    key={productPlatformItem.id}
                    productPlatformItem={productPlatformItem}
                    editProductPlatform={editProductPlatform}
                    deleteProductPlatform={deleteProductPlatform}
                  />
                ))}
            </div>
          </section>
          {!showCreateProductPlatform ? (
            <ProductPlatformInfo
            endEditProductPlatform={endEditProductPlatform}
            productPlatformInfo={productPlatformInfo}
              isLoadingProductPlatform={isLoadingProductPlatform}
            />
          ) : (
            <CreateProductPlatformInfo getListProductPlatform={getListProductPlatform}/> 
          )}
        </main>
      );
    };
    