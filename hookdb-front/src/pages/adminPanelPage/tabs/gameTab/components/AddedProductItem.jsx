import style from '../css/addedItem.module.css';
import { getProductEditionById, getProductKeyById, getProductPlatformById, getProductRegionById, getProductVendorById } from '../../../../../helpers/dataAPI';
import { UserContext } from '../../../../../context/UserContext';
import { useContext, useEffect, useState } from 'react';

export const AddedProductItem = ({data, deleteValue, type}) => {


    const {user} = useContext(UserContext)
    const [itemData, setItemData] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
      
      const fetchData = async() =>{
        const productEdition = await getProductEditionById(data.idProductEdition, user.accessToken);
        const productPlatform = await getProductPlatformById(data.idProductPlatform, user.accessToken);
        const productVendor = await getProductVendorById(data.idProductVendor, user.accessToken);
        const productRegion = await getProductRegionById(data.idProductRegion, user.accessToken);
        const productKey = await getProductKeyById(data.idProductKey, user.accessToken);
  
        setItemData({
          productEdition: productEdition.name,
          productPlatform: productPlatform.name,
          productVendor: productVendor.name,
          productRegion: productRegion.name,
          productKey: productKey.name
        
        })
  
        setIsLoading(false)
      }
  
      if(isLoading) fetchData()
    }, [isLoading])
    
  
  
    return (
      (!isLoading) &&
      <div className={`${style.container} `}>
          <p>{itemData.productEdition} | {itemData.productPlatform} | {itemData.productVendor} | {itemData.productRegion} | {itemData.productKey}</p>
          <button className={`${style.button} `} name="platform" onClick={() => deleteValue(data, type)}>
              <img src="../../../../../../assets/global/cleanIcon.svg" alt="" height={14} width={14}/>
          </button>
      </div>
    )
  }
      