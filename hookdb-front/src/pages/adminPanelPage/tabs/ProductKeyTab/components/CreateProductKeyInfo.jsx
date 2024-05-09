import { useContext, useState } from "react";
import { UserContext } from "../../../../../context/UserContext";
import style from '../../../css/createSection.module.css';
import generalize from '../../../../../css/generalize.module.css'
import { createKey } from "../../../../../helpers/dataAPI";
import { isFieldEmpty } from "../../../../../helpers/inputValidations";
import { toast } from 'react-hot-toast';

export const CreateProductKeyInfo = ({getListProductKey}) => {
    const { user, language } = useContext(UserContext);
    const [inputValues, setInputValues] = useState({
      name: "",
    });
    const productKeyTab = language.adminPanelPage.productKeyTab;
    const warnings = language.warnings;

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setInputValues({ ...inputValues, [name]: value });
    };
  
    const saveFeatureInfo = async () => {
      if(validations()) return

      try {
        await createKey(user.accessToken, inputValues.name);
        getListProductKey()
        toast.success(warnings.success.createProductKey);
  
      } catch (err) {
        toast.error(warnings.error.productKeyCreate);
  
      }
    };
  
    const validations = () =>{
      if(isFieldEmpty(inputValues.name)){
          toast.error(warnings.error.nameEmpty)
          return true
      }
  

      return false;
  }

    return (
      <div className={`${style.newsInfoContainer} `}>
        <div>
          <div className={`${style.title} `}>
            <h1 className={`${style.h1} `}>{productKeyTab.create.title}</h1>
            <div className={`${style.buttonActions} `}>
              <button
                className={`${style.button} ${generalize.buttonStyle_active}`}
                onClick={saveFeatureInfo}
              >
                {productKeyTab.publishButton}
              </button>
            </div>
          </div>
        </div>
  
        <section className={`${style.newsInfo} `}>
          <article className={`${style.inputInfoSection} `}>
            <label className={`${style.inputTitle} `}>{productKeyTab.create.fields.name}</label>
            <input
              type="text"
              className={`${style.inputNewsSearch} `}
              name="name"
              value={inputValues.name}
              onChange={handleInputChange}
            />
          </article>
        </section>
      </div>
    );
  };
  