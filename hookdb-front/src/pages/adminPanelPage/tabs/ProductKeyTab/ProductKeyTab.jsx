import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../../../context/UserContext";
import { deleteProductkeyById, findProductKeyByName, getProductKey, getProductKeyById } from "../../../../helpers/dataAPI";
import style from '../../css/tab.module.css';
import generalize from '../../../../css/generalize.module.css';
import { ProductKeyItem } from "./components/ProductKeyItem";
import { CreateProductKeyInfo } from "./components/CreateProductKeyInfo";
import { ProductKeyInfo } from "./components/ProductKeyInfo";
import toast from "react-hot-toast";

export const ProductKeyTab = () => {
    const [productKey, setProductKey] = useState(null);
    const { user, language } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [showCreateProductKey, setshowCreateProductKey] = useState(null);
    const [productKeyInfo, setProductKeyInfo] = useState(null);
    const [isLoadingProductKey, setisLoadingProductKey] = useState(true);
    const productKeyTab = language.adminPanelPage.productKeyTab;
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
                fetchResult = await findProductKeyByName(searchText, user.accessToken);

            }catch(error){
                console.error('Fallo al buscar la key del producto por nombre')
                toast.error(warnings.error.searchByName)
            }


        } else {

            try{
                fetchResult = await getProductKey(user.accessToken);

            }catch(error){
                console.error('Fallo al obtener todas las keys del producto')
                toast.error(warnings.error.productKeyRetrieve)
            }
        }

        setProductKey(fetchResult);
    };

    const getListProductKey = async () => {


        try{
            const listProductPlatform = await getProductKey(user.accessToken);
            setProductKey(listProductPlatform);
            setIsLoading(false);
        }catch(error){
            console.error('Fallo al obtener todas las keys del producto')
            toast.error(warnings.error.productKeyRetrieve)
        }
    };

    useEffect(() => {
        getListProductKey();
    }, []);

    const editProductKey = async (idProductVendor) => {
 


        try{
            setisLoadingProductKey(true);
            setshowCreateProductKey(false);
            const fetchProductVendorInfo = await getProductKeyById(idProductVendor, user.accessToken);
            setProductKeyInfo(fetchProductVendorInfo);
            setisLoadingProductKey(false);
        }catch(error){
            console.error('Fallo al obtener la información de la key del producto')
            toast.error(warnings.error.productKeyInfoRetrieve)
        }
    };

    const endEditProductkey = () => {
        setshowCreateProductKey(true);
    };

    const createProductVendor = () => {
        setshowCreateProductKey(true);
    };

    const deleteProductKey = async (idProductVendor) => {



        try{
            await deleteProductkeyById(idProductVendor, user.accessToken);
            toast.success(warnings.success.deleteProductKey)
            getListProductKey();
        }catch(error){
            console.error('Fallo al eliminar la key del producto')
            toast.error(warnings.error.productKeyDelete)
        }
    };




    return (
        <main className={`${style.main} `}>
            <section className={`${style.container1} `}>
                <h1 className={`${style.h1} `}>{productKeyTab.title}</h1>
                <button
                    className={`${generalize.buttonStyle_unselected} ${style.createNewsButton}`}
                    onClick={createProductVendor}
                >
                    {productKeyTab.createProductKey}
                </button>
                <div className={`${style.searcher} `}>
                    <input
                        type="text"
                        className={`${style.inputUserSearch} `}
                        placeholder={productKeyTab.inputSearch}
                        onChange={handleFindProductKey}
                    />
                </div>
                <section
                    className={`${style.userDescription} ${scrollBar ? style.withScrollBar : style.withoutScrollBar
                        }`}
                >
                    <div className={`${style.itemDescription} `}>{productKeyTab.listColumns.id}</div>
                    <div className={`${style.itemDescription} `}>{productKeyTab.listColumns.name}</div>
                    <div className={`${style.itemDescription} `}>{productKeyTab.listColumns.actions}</div>
                </section>
                <hr className={`${style.hr} `} />
                <div ref={scrollElement} className={`${style.userResult} `}>
                    {!isLoading &&
                        productKey.map((productKeyItem) => (
                            <ProductKeyItem
                                key={productKeyItem.id}
                                productKeyItem={productKeyItem}
                                editProductKey={editProductKey}
                                deleteProductKey={deleteProductKey}
                            />
                        ))}
                </div>
            </section>
            {!showCreateProductKey ? (
                <ProductKeyInfo
                endEditProductkey={endEditProductkey}
                    productKeyInfo={productKeyInfo}
                    isLoadingProductKey={isLoadingProductKey}
                />
            ) : (
                <CreateProductKeyInfo getListProductKey={getListProductKey}/> 
            )}
        </main>
    );
};
