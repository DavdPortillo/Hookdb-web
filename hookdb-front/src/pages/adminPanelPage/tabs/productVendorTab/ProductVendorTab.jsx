import { useContext, useEffect, useRef, useState } from 'react';
import style from '../../css/tab.module.css';
import { UserContext } from '../../../../context/UserContext';
import generalize from '../../../../css/generalize.module.css';
import { deleteProductVendorById, findProductVendorByName, getProductVendor, getProductVendorById } from '../../../../helpers/dataAPI';
import { ProductVendorItem } from './components/ProductVendorItem';
import { CreateProductVendorInfo } from './components/CreateProductVendorInfo';
import { ProductVendorInfo } from './components/ProductVendorInfo';
import toast from 'react-hot-toast';
export const ProductVendorTab = () => {
    const [productVendor, setProductVendor] = useState(null);
    const { user, language } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [showCreateProductVendor, setshowCreateProductVendor] = useState(null);
    const [productVendorInfo, setProductVendorInfo] = useState(null);
    const [isLoadingProductVendor, setisLoadingProductVendor] = useState(true);
    const productVendorTab = language.adminPanelPage.productVendorTab;
    const warnings = language.warnings;

    const scrollElement = useRef(null);
    const [scrollBar, setScrollBar] = useState(false);

    useEffect(() => {
        const scroll = scrollElement.current;
        const hasVerticalScroll = scroll.scrollHeight > scroll.clientHeight;
        hasVerticalScroll ? setScrollBar(true) : setScrollBar(false);
    }, []);

    const handleFindProductVendor = async (event) => {
        const searchText = event.target.value;
        let fetchResult;

        if (searchText !== "") {
            try{
                fetchResult = await findProductVendorByName(searchText, user.accessToken);

            }catch(error){
                console.error('Fallo al buscar el vendedor del producto por nombre')
                toast.error(warnings.error.searchByName)
            }
        } else {
            try{
                fetchResult = await getProductVendor(user.accessToken);

            }catch(error){
                console.error('Fallo al obtener el vendedor del producto')
                toast.error(warnings.error.productVendorRetrieve)
            }
        }

        setProductVendor(fetchResult);
    };

    const getListProductVendor = async () => {


        try{
            const listProductPlatform = await getProductVendor(user.accessToken);
            setProductVendor(listProductPlatform);
            setIsLoading(false);
        }catch(error){
            console.error('Fallo al obtener el vendedor del producto')
            toast.error(warnings.error.productVendorRetrieve)
        }
    };

    useEffect(() => {
        getListProductVendor();
    }, []);

    const editProductVendor = async (idProductVendor) => {



        try{
            setisLoadingProductVendor(true);
            setshowCreateProductVendor(false);
            const fetchProductVendorInfo = await getProductVendorById(idProductVendor, user.accessToken);
            setProductVendorInfo(fetchProductVendorInfo);
            setisLoadingProductVendor(false);
            setIsLoading(false);
        }catch(error){
            console.error('Fallo al obtener la información del vendedor del producto')
            toast.error(warnings.error.productVendorInfoRetrieve)
        }
    };

    const endEditProductVendor = () => {
        setshowCreateProductVendor(true);
    };

    const createProductVendor = () => {
        setshowCreateProductVendor(true);
    };

    const deleteProductVendor = async (idProductVendor) => {


        try{
            await deleteProductVendorById(idProductVendor, user.accessToken);
            toast.success(warnings.success.deleteProductVendor)
            getListProductVendor();
    
        }catch(error){
            console.error('Fallo al eliminar el vendedor del producto')
            toast.error(warnings.error.productVendorDelete)
        }
    };




    return (
        <main className={`${style.main} `}>
            <section className={`${style.container1} `}>
                <h1 className={`${style.h1} `}>{productVendorTab.title}</h1>
                <button
                    className={`${generalize.buttonStyle_unselected} ${style.createNewsButton}`}
                    onClick={createProductVendor}
                >
                    {productVendorTab.createProductVendor}
                </button>
                <div className={`${style.searcher} `}>
                    <input
                        type="text"
                        className={`${style.inputUserSearch} `}
                        placeholder={productVendorTab.inputSearch}
                        onChange={handleFindProductVendor}
                    />
                </div>
                <section
                    className={`${style.userDescription} ${scrollBar ? style.withScrollBar : style.withoutScrollBar
                        }`}
                >
                    <div className={`${style.itemDescription} `}>{productVendorTab.listColumns.id}</div>
                    <div className={`${style.itemDescription} `}>{productVendorTab.listColumns.name}</div>
                    <div className={`${style.itemDescription} `}>{productVendorTab.listColumns.actions}</div>
                </section>
                <hr className={`${style.hr} `} />
                <div ref={scrollElement} className={`${style.userResult} `}>
                    {!isLoading &&
                        productVendor.map((productVendorItem) => (
                            <ProductVendorItem
                                key={productVendorItem.id}
                                productVendorItem={productVendorItem}
                                editProductVendor={editProductVendor}
                                deleteProductVendor={deleteProductVendor}
                            />
                        ))}
                </div>
            </section>
            {!showCreateProductVendor ? (
                <ProductVendorInfo
                    endEditProductVendor={endEditProductVendor}
                    productVendorInfo={productVendorInfo}
                    isLoadingProductVendor={isLoadingProductVendor}
                />
            ) : (
                <CreateProductVendorInfo getListProductVendor={getListProductVendor}/> 
            )}
        </main>
    );
};
