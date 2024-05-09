import style from "../../../css/editSection.module.css";
import generalize from "../../../../../css/generalize.module.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../../context/UserContext";
import { isFieldEmpty } from "../../../../../helpers/inputValidations";
import { toast } from 'react-hot-toast';

export const DeveloperInfo = ({
  endEditUser,
  developerInfo,
  isLoadingDeveloperInfo,
}) => {
  const { user, language } = useContext(UserContext);
  const [originalInputValues, setOriginalInputValues] = useState();
  const [inputValues, setInputValues] = useState({
    name: "",
  });
  const [isModified, setIsModified] = useState(false);
  const developerTab = language.adminPanelPage.developerTab;
  const warnings = language.warnings;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  useEffect(() => {
    setInputValues({
      name: developerInfo?.name || "",
    });

    setOriginalInputValues({
      name: developerInfo?.name || "",
    });
  }, [developerInfo]);

  const saveDeveloperInfo = async () => {

    if (validations()) return

    const idDeveloper = developerInfo.id;
    const newName = inputValues.name;
    const token = user.accessToken;

    const url = `http://158.179.219.214:31490/developer/${idDeveloper}`;
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "text/plain",
        Authorization: `Bearer ${token}`,
      },
      body: newName,
    };

    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.text();
      toast.success(warnings.success.editDeveloper);

      return data;
    } catch (error) {
      console.error("There was an error!", error);
      toast.error(warnings.error.developerEdit);

    }
  };

  const validations = () => {
    if (isFieldEmpty(inputValues.name)) {
      toast.error(warnings.error.developerNameFieldEmpty);
      return true;
    }

    return false
  }

  useEffect(() => {
    const isModified =
      JSON.stringify(inputValues) !== JSON.stringify(originalInputValues);
    setIsModified(isModified);
  }, [inputValues, originalInputValues]);

  return (
    <section className={`${style.newsInfoContainer} `}>
      {!isLoadingDeveloperInfo && (
        <>
          <div>
            <div className={`${style.title} `}>
              <h1 className={`${style.h1} `}>{developerTab.edit.title}</h1>
              <div className={`${style.buttonActions} `}>
                <button
                  className={`${style.button} ${generalize.buttonStyle_active}`}
                  onClick={endEditUser}
                >
                  {developerTab.cancelButton}
                </button>
                <button
                  className={`${style.button} ${!isModified
                      ? generalize.buttonStyle_disabled
                      : generalize.buttonStyle_active
                    }`}
                  onClick={saveDeveloperInfo}
                  disabled={!isModified}
                >
                  {developerTab.saveButton}
                </button>
              </div>
            </div>
          </div>

          <section className={`${style.newsInfo} `}>
            <article className={`${style.inputInfoSection} `}>
              <label className={`${style.inputTitle} `}>{developerTab.edit.fields.name}</label>
              <input
                type="text"
                className={`${style.inputNewsSearch} `}
                name="name"
                value={inputValues.name}
                onChange={handleInputChange}
              />
            </article>
          </section>
        </>
      )}
    </section>
  );
};
