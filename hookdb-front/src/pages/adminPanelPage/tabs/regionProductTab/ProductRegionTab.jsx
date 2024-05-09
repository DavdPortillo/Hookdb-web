import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../../../context/UserContext";
import style from '../../css/tab.module.css';
import generalize from '../../../../css/generalize.module.css';
import { deleteProductRegionById, findProductRegionByName, getProductRegion, getProductRegionById } from "../../../../helpers/dataAPI";
import { CreateProductRegionInfo } from "./components/CreateProductRegionInfo";
import { ProductRegionItem } from "./components/ProductRegionItem";
import { ProductRegionInfo } from "./components/ProductRegionInfo";
import toast from "react-hot-toast";


export const ProductRegionTab = () => {
    const [productRegion, setProductRegion] = useState(null);
    const { user, language } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [showCreateProductRegion, setshowCreateProductRegion] = useState(null);
    const [productRegionInfo, setProductRegionInfo] = useState(null);
    const [isLoadingProductRegion, setisLoadingProductRegion] = useState(true);
    const productRegionTab = language.adminPanelPage.productRegionTab;
    const warnings = language.warnings;

    const scrollElement = useRef(null);
    const [scrollBar, setScrollBar] = useState(false);

    useEffect(() => {
        const scroll = scrollElement.current;
        const hasVerticalScroll = scroll.scrollHeight > scroll.clientHeight;
        hasVerticalScroll ? setScrollBar(true) : setScrollBar(false);
    }, []);

    const handleFindProductKey = async (event) => {
        const searchText = event.target.value;
        let fetchResult;

        if (searchText !== "") {    
            try{
                fetchResult = await findProductRegionByName(searchText, user.accessToken);

            }catch(error){
                console.error('Fallo al buscar la región del producto por nombre')
                toast.error(warnings.error.searchByName)
            }


        } else {
            try{
                fetchResult = await getProductRegion(user.accessToken);

            }catch(error){
                console.error('Fallo al otener todas las regiones del producto')
                toast.error(warnings.error.productRegionRetrieve)
            }
        }

        setProductRegion(fetchResult);
    };

    const getListProductKey = async () => {


        try{
            const listProductPlatform = await getProductRegion(user.accessToken);
            setProductRegion(listProductPlatform);
            setIsLoading(false);
        }catch(error){
            console.error('Fallo al obtener todas las regiones del producto')
            toast.error(warnings.error.productRegionRetrieve)
        }
    };

    useEffect(() => {
        getListProductKey();
    }, []);

    const editProductRegion = async (idProductVendor) => {

        try{
            setisLoadingProductRegion(true);
            setshowCreateProductRegion(false);
            const fetchProductVendorInfo = await getProductRegionById(idProductVendor, user.accessToken);
            setProductRegionInfo(fetchProductVendorInfo);
            setisLoadingProductRegion(false);
        }catch(error){
            console.error('Fallo al obtener la información de la región del producto')
            toast.error(warnings.error.productRegionInfoRetrieve)
        }
    };

    const endEditProductRegion = () => {
        setshowCreateProductRegion(true);
    };

    const createProductVendor = () => {
        setshowCreateProductRegion(true);
    };

    const deleteProductRegion = async (idProductVendor) => {



        try{
            await deleteProductRegionById(idProductVendor, user.accessToken);
            toast.success(warnings.success.deleteProductRegion)
            getListProductKey();
        }catch(error){
            console.error('Fallo al eliminar la región del producto')
            toast.error(warnings.error.productRegionDelete)
        }
    };




    return (
        <main className={`${style.main} `}>
            <section className={`${style.container1} `}>
                <h1 className={`${style.h1} `}>{productRegionTab.title}</h1>
                <button
                    className={`${generalize.buttonStyle_unselected} ${style.createNewsButton}`}
                    onClick={createProductVendor}
                >
                    {productRegionTab.createProductRegion}
                </button>
                <div className={`${style.searcher} `}>
                    <input
                        type="text"
                        className={`${style.inputUserSearch} `}
                        placeholder={productRegionTab.inputSearch}
                        onChange={handleFindProductKey}
                    />
                </div>
                <section
                    className={`${style.userDescription} ${scrollBar ? style.withScrollBar : style.withoutScrollBar
                        }`}
                >
                    <div className={`${style.itemDescription} `}>{productRegionTab.listColumns.id}</div>
                    <div className={`${style.itemDescription} `}>{productRegionTab.listColumns.name}</div>
                    <div className={`${style.itemDescription} `}>{productRegionTab.listColumns.actions}</div>
                </section>
                <hr className={`${style.hr} `} />
                <div ref={scrollElement} className={`${style.userResult} `}>
                    {!isLoading &&
                        productRegion.map((productRegionItem) => (
                            <ProductRegionItem
                                key={productRegionItem.id}
                                productRegionItem={productRegionItem}
                                editProductRegion={editProductRegion}
                                deleteProductRegion={deleteProductRegion}
                            />
                        ))}
                </div>
            </section>
            {!showCreateProductRegion ? (
                <ProductRegionInfo
                    endEditProductRegion={endEditProductRegion}
                    productRegionInfo={productRegionInfo}
                    isLoadingProductRegion={isLoadingProductRegion}
                />
            ) : (
                <CreateProductRegionInfo getListProductKey={getListProductKey}/> 
            )}
        </main>
    );
};
