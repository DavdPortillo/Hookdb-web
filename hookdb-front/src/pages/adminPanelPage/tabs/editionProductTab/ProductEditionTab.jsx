import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../../../context/UserContext";
import style from '../../css/tab.module.css';
import { deleteProductEditionById, findProductEditionByName, getProductEdition, getProductEditionById } from "../../../../helpers/dataAPI";
import generalize from '../../../../css/generalize.module.css';
import { ProductEditionItem } from "./components/ProductEditionItem";
import { CreateProductEditionInfo } from "./components/CreateProductEditionInfo";
import { ProductEditionInfo } from "./components/ProductEditionInfo";
import toast from "react-hot-toast";

export const ProductEditionTab = () => {
    const [productEdition, setProductEdition] = useState(null);
    const { user, language } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [showCreateProductEdition, setshowCreateProductEdition] = useState(null);
    const [productEditionInfo, setProductEditionInfo] = useState(null);
    const [isLoadingProductEdition, setisLoadingProductEdition] = useState(true);
    const productEditionTab = language.adminPanelPage.productEditionTab;
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
                fetchResult = await findProductEditionByName(searchText, user.accessToken);

            }catch(error){
                console.error('Fallo al buscar la edición del prodcuto por nombre')
                toast.error(warnings.error.searchByName)
            }
        } else {

            try{
                fetchResult = await getProductEdition(user.accessToken);

            }catch(error){
                console.error('Fallo al obtener todas las ediciones del producto')
                toast.error(warnings.error.productEditionRetrieve)
            }
        }

        setProductEdition(fetchResult);
    };

    const getListProductKey = async () => {

        try{
            const listProductPlatform = await getProductEdition(user.accessToken);
            setProductEdition(listProductPlatform);
            setIsLoading(false);
        }catch(error){
            console.error('Fallo al obtener todas las ediciones del producto')
            toast.error(warnings.error.productEditionRetrieve)
        }
    };

    useEffect(() => {
        getListProductKey();
    }, []);

    const editProductEdition = async (idProductVendor) => {



        try{
            setisLoadingProductEdition(true);
            setshowCreateProductEdition(false);
            const fetchProductVendorInfo = await getProductEditionById(idProductVendor, user.accessToken);
            setProductEditionInfo(fetchProductVendorInfo);
            setisLoadingProductEdition(false);
        }catch(error){
            console.error('Fallo al obtener la información de la edición del producto')
            toast.error(warnings.error.productEditionInfoRetrieve)
        }
    };

    const endEditProductEdition = () => {
        setshowCreateProductEdition(true);
    };

    const createProductVendor = () => {
        setshowCreateProductEdition(true);
    };

    const deleteProductEdition = async (idProductVendor) => {


        try{
            await deleteProductEditionById(idProductVendor, user.accessToken);
            toast.success(warnings.success.deleteProductEdition)
            getListProductKey();
        }catch(error){
            console.error('Fallo al eliminar la edición del producto')
            toast.error(warnings.error.productEditionDelete)
        }
    };




    return (
        <main className={`${style.main} `}>
            <section className={`${style.container1} `}>
                <h1 className={`${style.h1} `}>{productEditionTab.title}</h1>
                <button
                    className={`${generalize.buttonStyle_unselected} ${style.createNewsButton}`}
                    onClick={createProductVendor}
                >
                    {productEditionTab.createProductEdition}
                </button>
                <div className={`${style.searcher} `}>
                    <input
                        type="text"
                        className={`${style.inputUserSearch} `}
                            placeholder={productEditionTab.inputSearch}
                        onChange={handleFindProductKey}
                    />
                </div>
                <section
                    className={`${style.userDescription} ${scrollBar ? style.withScrollBar : style.withoutScrollBar
                        }`}
                >
                    <div className={`${style.itemDescription} `}>{productEditionTab.listColumns.id}</div>
                    <div className={`${style.itemDescription} `}>{productEditionTab.listColumns.name}</div>
                    <div className={`${style.itemDescription} `}>{productEditionTab.listColumns.actions}</div>
                </section>
                <hr className={`${style.hr} `} />
                <div ref={scrollElement} className={`${style.userResult} `}>
                    {!isLoading &&
                        productEdition.map((productEditionItem) => (
                            <ProductEditionItem
                                key={productEditionItem.id}
                                productEditionItem={productEditionItem}
                                editProductEdition={editProductEdition}
                                deleteProductEdition={deleteProductEdition}
                            />
                        ))}
                </div>
            </section>
            {!showCreateProductEdition ? (
                <ProductEditionInfo
                endEditProductEdition={endEditProductEdition}
                productEditionInfo={productEditionInfo}
                isLoadingProductEdition={isLoadingProductEdition}
                />
            ) : (
                <CreateProductEditionInfo getListProductKey={getListProductKey}/>
            )}
        </main>
    );
};
