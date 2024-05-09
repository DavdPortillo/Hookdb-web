import { useContext, useState } from "react";
import style from '../../../css/createSection.module.css';
import { UserContext } from "../../../../../context/UserContext";
import generalize from "../../../../../css/generalize.module.css";
import { createLanguage } from "../../../../../helpers/dataAPI";
import { isFieldEmpty } from "../../../../../helpers/inputValidations";
import { toast } from 'react-hot-toast';

export const CreateLanguageInfo = ({getListLanguages}) => {
  const { user, language } = useContext(UserContext);
  const [inputValues, setInputValues] = useState({
    name: "",
  });
  const languageTab = language.adminPanelPage.languageTab;
  const warnings = language.warnings;


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const saveLanguageInfo = async () => {
    if(validations()) return

    try {
      await createLanguage(user.accessToken, inputValues.name);
      getListLanguages();
      toast.success(warnings.success.createLanguage);

    } catch (err) {
      toast.error(warnings.error.languageCreate);

    }
  };

  const validations = () => {
    if (isFieldEmpty(inputValues.name)) {
      toast.error(warnings.error.nameEmpty);
      return true;
    }

    return false
  }

  return (
    <div className={`${style.newsInfoContainer} `}>
      <div>
        <div className={`${style.title} `}>
          <h1 className={`${style.h1} `}>{languageTab.create.title}</h1>
          <div className={`${style.buttonActions} `}>
            <button
              className={`${style.button} ${generalize.buttonStyle_active}`}
              onClick={saveLanguageInfo}
            >
              {languageTab.publishButton}
            </button>
          </div>
        </div>
      </div>

      <section className={`${style.newsInfo} `}>
        <article className={`${style.inputInfoSection} `}>
          <label className={`${style.inputTitle} `}>{languageTab.create.fields.name}</label>
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