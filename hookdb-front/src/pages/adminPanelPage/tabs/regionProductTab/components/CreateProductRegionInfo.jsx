import { useContext, useState } from "react";
import { UserContext } from "../../../../../context/UserContext";
import { createRegion } from "../../../../../helpers/dataAPI";
import style from '../../../css/createSection.module.css';
import generalize from '../../../../../css/generalize.module.css';
import { isFieldEmpty } from "../../../../../helpers/inputValidations";
import { toast } from 'react-hot-toast';

export const CreateProductRegionInfo = ({getListProductKey}) => {
    const { user, language } = useContext(UserContext);
    const [inputValues, setInputValues] = useState({
      name: "",
    });
    const productRegionTab = language.adminPanelPage.productRegionTab;
    const warnings = language.warnings;

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setInputValues({ ...inputValues, [name]: value });
    };
  
    const saveFeatureInfo = async () => {
      if(isFieldEmpty(inputValues.name)){
        toast.error(warnings.error.nameEmpty);
        return;
    }

            
      try {
        await createRegion(user.accessToken, inputValues.name);
        getListProductKey()
        toast.success(warnings.success.createProductRegion);
  
      } catch (err) {
        toast.error(warnings.error.productRegionCreate);
  
      }
    };
  
    return (
      <div className={`${style.newsInfoContainer} `}>
        <div>
          <div className={`${style.title} `}>
            <h1 className={`${style.h1} `}>{productRegionTab.create.title}</h1>
            <div className={`${style.buttonActions} `}>
              <button
                className={`${style.button} ${generalize.buttonStyle_active}`}
                onClick={saveFeatureInfo}
              >
                {productRegionTab.publishButton}
              </button>
            </div>
          </div>
        </div>
  
        <section className={`${style.newsInfo} `}>
          <article className={`${style.inputInfoSection} `}>
            <label className={`${style.inputTitle} `}>{productRegionTab.create.fields.name}</label>
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
  