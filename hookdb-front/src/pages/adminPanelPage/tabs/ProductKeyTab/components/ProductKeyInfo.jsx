import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../../context/UserContext";
import style from "../../../css/editSection.module.css";
import generalize from '../../../../../css/generalize.module.css';
import { editProductKeyById } from "../../../../../helpers/dataAPI";
import { isFieldEmpty } from "../../../../../helpers/inputValidations";
import { toast } from 'react-hot-toast';

export const ProductKeyInfo = ({ endEditProductkey, productKeyInfo, isLoadingProductKey }) => {

  const { user, language } = useContext(UserContext)
  const [originalInputValues, setOriginalInputValues] = useState()
  const [inputValues, setInputValues] = useState({
    name: '',
  });
  const [isModified, setIsModified] = useState(false);
  const productKeyTab = language.adminPanelPage.productKeyTab;
  const warnings = language.warnings;


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  useEffect(() => {
    setInputValues({
      name: productKeyInfo?.name || '',

    });

    setOriginalInputValues({
      name: productKeyInfo?.name || '',

    });

  }, [productKeyInfo]);



  const saveProductVendorInfo = async () => {

    if (validations()) {
      return;
    }



    try {
      await editProductKeyById(productKeyInfo.id, inputValues.name, user.accessToken);
      toast.success(warnings.success.editPlatformKey);

    } catch (err) {
      toast.error(warnings.error.productKeyEdit);

    }
  }

  const validations = () => {
    if (isFieldEmpty(inputValues.name)) {
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
        (!isLoadingProductKey) &&
        <>
          <div>
            <div className={`${style.title} `}>
              <h1 className={`${style.h1} `}>{productKeyTab.edit.title}</h1>
              <div className={`${style.buttonActions} `}>
                <button className={`${style.button} ${generalize.buttonStyle_active}`} onClick={endEditProductkey}>{productKeyTab.cancelButton}</button>
                <button className={`${style.button} ${!isModified ? generalize.buttonStyle_disabled : generalize.buttonStyle_active}`} onClick={saveProductVendorInfo} disabled={!isModified}>{productKeyTab.saveButton}</button>
              </div>
            </div>
          </div>

          <section className={`${style.newsInfo} `}>

            <article className={`${style.inputInfoSection} `}>
              <label className={`${style.inputTitle} `}>{productKeyTab.edit.fields.name}</label>
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
