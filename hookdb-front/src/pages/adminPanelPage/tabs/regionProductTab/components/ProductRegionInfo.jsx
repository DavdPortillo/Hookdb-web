import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../../context/UserContext";
import { editProductRegionById } from "../../../../../helpers/dataAPI";
import style from "../../../css/editSection.module.css";
import generalize from '../../../../../css/generalize.module.css';
import { isFieldEmpty } from "../../../../../helpers/inputValidations";
import { toast } from 'react-hot-toast';

export const ProductRegionInfo = ({ endEditProductRegion, productRegionInfo, isLoadingProductRegion }) => {
    const { user, language } = useContext(UserContext)
    const [originalInputValues, setOriginalInputValues] = useState()
    const [inputValues, setInputValues] = useState({
      name: '',
    });
    const [isModified, setIsModified] = useState(false);
    const productRegionTab = language.adminPanelPage.productRegionTab;
    const warnings = language.warnings;

  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setInputValues({ ...inputValues, [name]: value });
    };
  
    useEffect(() => {
      setInputValues({
        name: productRegionInfo?.name || '',

      });
  
      setOriginalInputValues({
        name: productRegionInfo?.name || '',

      });
  
    }, [productRegionInfo]);
  

  
  
    const saveProductVendorInfo = async () => {
  
      if(isFieldEmpty(inputValues.name)){
        toast.error(warnings.error.nameEmpty);
        return;
    }
  
      try {
        await editProductRegionById(productRegionInfo.id, inputValues.name, user.accessToken,);
        toast.success(warnings.success.editProductRegion);
  
      } catch (err) {
        toast.error(warnings.error.productRegionEdit);
  
      }
    }
  
    useEffect(() => {
      const isModified = JSON.stringify(inputValues) !== JSON.stringify(originalInputValues);
      setIsModified(isModified);
    }, [inputValues, originalInputValues]);
  

    return (
      <section className={`${style.newsInfoContainer} `}>
        {
          (!isLoadingProductRegion) &&
          <>
            <div>
              <div className={`${style.title} `}>
                <h1 className={`${style.h1} `}>{productRegionTab.edit.title}</h1>
                <div className={`${style.buttonActions} `}>
                  <button className={`${style.button} ${generalize.buttonStyle_active}`} onClick={endEditProductRegion}>{productRegionTab.cancelButton}</button>
                  <button className={`${style.button} ${!isModified ? generalize.buttonStyle_disabled : generalize.buttonStyle_active}`} onClick={saveProductVendorInfo} disabled={!isModified}>{productRegionTab.saveButton}</button>
                </div>
              </div>
            </div>
  
            <section className={`${style.newsInfo} `}>

              <article className={`${style.inputInfoSection} `}>
                <label className={`${style.inputTitle} `}>{productRegionTab.edit.fields.name}</label>
                <input
                  type="text"
                  className={`${style.inputNewsSearch} `}
                  name="name"
                  value={inputValues.name}
                  onChange={handleInputChange} />
              </article>
  
            </section>
  
          </>
        }
  
      </section>
    )
  }
  