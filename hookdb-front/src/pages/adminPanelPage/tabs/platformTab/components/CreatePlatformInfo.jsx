import { useContext, useState } from "react";
import style from '../../../css/createSection.module.css';
import { UserContext } from "../../../../../context/UserContext";
import generalize from "../../../../../css/generalize.module.css";
import { createPlatform } from "../../../../../helpers/dataAPI";
import { isFieldEmpty } from "../../../../../helpers/inputValidations";
import { toast } from 'react-hot-toast';

export const CreatePlatformInfo = ({getListPlatforms}) => {
  const { user, language } = useContext(UserContext);
  const [inputValues, setInputValues] = useState({
    name: "",
  });
  const platformTab = language.adminPanelPage.platformTab;
  const warnings = language.warnings;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const savePlatformInfo = async () => {
    if (validations()) return

    try {
      await createPlatform(user.accessToken, inputValues.name);
      getListPlatforms()
      toast.success(warnings.success.createPlatform);

    } catch (err) {
      toast.error(warnings.error.platformCreate);

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
          <h1 className={`${style.h1} `}>{platformTab.create.title}</h1>
          <div className={`${style.buttonActions} `}>
            <button
              className={`${style.button} ${generalize.buttonStyle_active}`}
              onClick={savePlatformInfo}
            >
              {platformTab.publishButton}
            </button>
          </div>
        </div>
      </div>

      <section className={`${style.newsInfo} `}>
        <article className={`${style.inputInfoSection} `}>
          <label className={`${style.inputTitle} `}>{platformTab.create.fields.name}</label>
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
