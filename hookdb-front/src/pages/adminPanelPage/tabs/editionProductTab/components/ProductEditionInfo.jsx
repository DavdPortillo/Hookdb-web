import { useContext, useEffect, useState } from 'react';
import style from "../../../css/editSection.module.css";
import { UserContext } from '../../../../../context/UserContext';
import generalize from '../../../../../css/generalize.module.css';
import { editProductEditionById } from '../../../../../helpers/dataAPI';
import { isFieldEmpty } from '../../../../../helpers/inputValidations';
import { toast } from 'react-hot-toast';

export const ProductEditionInfo = ({ endEditProductEdition, productEditionInfo, isLoadingProductEdition }) => {
    const { user, language } = useContext(UserContext)
    const [originalInputValues, setOriginalInputValues] = useState()
    const [inputValues, setInputValues] = useState({
      name: '',
    });
    const [isModified, setIsModified] = useState(false);
    const productEditionTab = language.adminPanelPage.productEditionTab;
    const warnings = language.warnings;
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setInputValues({ ...inputValues, [name]: value });
    };
  
    useEffect(() => {
      setInputValues({
        name: productEditionInfo?.name || '',

      });
  
      setOriginalInputValues({
        name: productEditionInfo?.name || '',

      });
  
    }, [productEditionInfo]);
  
    const saveProductVendorInfo = async () => {
  
      if(validations()){
        return
      }
  
      try {
        await editProductEditionById(productEditionInfo.id, inputValues.name, user.accessToken,);
        toast.success(warnings.success.editProductEdition);
  
      } catch (err) {
        toast.error(warnings.error.productEditionEdit);
  
      }
    }

    const validations = () =>{
      if(isFieldEmpty(inputValues.name)){
          toast.error(warnings.error.nameEmpty)
          return true
      }

  
  
      return false;
  }
  
    useEffect(() => {
      const isModified = JSON.stringify(inputValues) !== JSON.stringify(originalInputValues);
      setIsModified(isModified);
    }, [inputValues, originalInputValues]);
  

    return (
      <section className={`${style.newsInfoContainer} `}>
        {
          (!isLoadingProductEdition) &&
          <>
            <div>
              <div className={`${style.title} `}>
                <h1 className={`${style.h1} `}>{productEditionTab.edit.title}</h1>
                <div className={`${style.buttonActions} `}>
                  <button className={`${style.button} ${generalize.buttonStyle_active}`} onClick={endEditProductEdition}>{productEditionTab.cancelButton}</button>
                  <button className={`${style.button} ${!isModified ? generalize.buttonStyle_disabled : generalize.buttonStyle_active}`} onClick={saveProductVendorInfo} disabled={!isModified}>{productEditionTab.saveButton}</button>
                </div>
              </div>
            </div>
  
            <section className={`${style.newsInfo} `}>

              <article className={`${style.inputInfoSection} `}>
                <label className={`${style.inputTitle} `}>{productEditionTab.edit.fields.name}</label>
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
  