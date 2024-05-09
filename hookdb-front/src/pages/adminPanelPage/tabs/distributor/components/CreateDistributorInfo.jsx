import { useContext, useState } from "react";
import style from '../../../css/createSection.module.css';
import { UserContext } from "../../../../../context/UserContext";
import generalize from "../../../../../css/generalize.module.css";
import { createDistributor } from "../../../../../helpers/dataAPI";
import { isFieldEmpty } from "../../../../../helpers/inputValidations";
import { toast } from 'react-hot-toast';

export const CreateDistributorInfo = ({getListDistributors}) => {
  const { user, language } = useContext(UserContext);
  const [inputValues, setInputValues] = useState({
    name: "",
  });
  const distributorTab = language.adminPanelPage.distributorTab;
  const warnings = language.warnings;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const saveDistributorInfo = async () => {
    if(validations()) return 

    try {
      await createDistributor(user.accessToken, inputValues.name);
      getListDistributors();
      toast.success(warnings.success.createDistributor);

    } catch (err) {
      toast.error(warnings.error.distributorEdit);

    }
  };

  const validations = () => {
    if (isFieldEmpty(inputValues.name)) {
      toast.error(warnings.error.distributorNameFieldEmpty);
      return true;
    }

    return false
  }

  return (
    <div className={`${style.newsInfoContainer} `}>
      <div>
        <div className={`${style.title} `}>
          <h1 className={`${style.h1} `}>{distributorTab.create.title}</h1>
          <div className={`${style.buttonActions} `}>
            <button
              className={`${style.button} ${generalize.buttonStyle_active}`}
              onClick={saveDistributorInfo}
            >
              {distributorTab.publishButton}
            </button>
          </div>
        </div>
      </div>

      <section className={`${style.newsInfo} `}>
        <article className={`${style.inputInfoSection} `}>
          <label className={`${style.inputTitle} `}>{distributorTab.create.fields.name}</label>
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