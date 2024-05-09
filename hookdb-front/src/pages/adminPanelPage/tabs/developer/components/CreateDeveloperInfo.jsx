import { useContext, useState } from "react";
import style from '../../../css/createSection.module.css';
import { UserContext } from "../../../../../context/UserContext";
import generalize from "../../../../../css/generalize.module.css";
import { createDeveloper } from "../../../../../helpers/dataAPI";
import { isFieldEmpty } from "../../../../../helpers/inputValidations";
import { toast } from 'react-hot-toast';

export const CreateDeveloperInfo = ({getListDevelopers}) => {
  const { user, language } = useContext(UserContext);
  const [inputValues, setInputValues] = useState({
    name: "",
  });
  const developerTab = language.adminPanelPage.developerTab;
  const warnings = language.warnings;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const saveDeveloperInfo = async () => {
    if(validations()) return 

    try {
      await createDeveloper(user.accessToken, inputValues.name);
      getListDevelopers();
      toast.success(warnings.success.createDeveloper);

    } catch (err) {
      toast.error(warnings.error.developerCreate);

    }
  };

  const validations = () => {
    if (isFieldEmpty(inputValues.name)) {
      toast.error(warnings.error.developerNameFieldEmpty);
      return true;
    }

    return false
  }

  return (
    <div className={`${style.newsInfoContainer} `}>
      <div>
        <div className={`${style.title} `}>
          <h1 className={`${style.h1} `}>{developerTab.create.title}</h1>
          <div className={`${style.buttonActions} `}>
            <button
              className={`${style.button} ${generalize.buttonStyle_active}`}
              onClick={saveDeveloperInfo}
            >
              {developerTab.publishButton}
            </button>
          </div>
        </div>
      </div>

      <section className={`${style.newsInfo} `}>
        <article className={`${style.inputInfoSection} `}>
          <label className={`${style.inputTitle} `}>{developerTab.create.fields.name}</label>
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