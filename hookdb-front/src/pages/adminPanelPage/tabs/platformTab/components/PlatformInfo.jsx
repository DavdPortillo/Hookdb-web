import style from "../../../css/editSection.module.css";
import generalize from "../../../../../css/generalize.module.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../../context/UserContext";
import { isFieldEmpty } from "../../../../../helpers/inputValidations";
import { toast } from 'react-hot-toast';

export const PlatformInfo = ({
  endEditUser,
  platformInfo,
  isLoadingPlatformInfo,
}) => {
  const { user, language } = useContext(UserContext);
  const [originalInputValues, setOriginalInputValues] = useState();
  const [inputValues, setInputValues] = useState({
    name: "",
  });
  const [isModified, setIsModified] = useState(false);
  const platformTab = language.adminPanelPage.platformTab;
  const warnings = language.warnings;


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  useEffect(() => {
    setInputValues({
      name: platformInfo?.name || "",
    });

    setOriginalInputValues({
      name: platformInfo?.name || "",
    });
  }, [platformInfo]);

  const savePlatformInfo = async () => {
    if (validations()) return
    try {
      const idPlatform = platformInfo.id;
      const newName = inputValues.name;
      const token = user.accessToken;

      const url = `http://158.179.219.214:31490/platform/${idPlatform}`;
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
        toast.success(warnings.success.editPlatform);

        return data;
      } catch (error) {
        console.error("There was an error!", error);
      }


    }catch(error){
      
      toast.error(warnings.error.platformEdit);

    }

  };

  useEffect(() => {
    const isModified =
      JSON.stringify(inputValues) !== JSON.stringify(originalInputValues);
    setIsModified(isModified);
  }, [inputValues, originalInputValues]);


  const validations = () => {
    if (isFieldEmpty(inputValues.name)) {
      toast.error(warnings.error.nameEmpty);
      return true;
    }

    return false
  }
  return (
    <section className={`${style.newsInfoContainer} `}>
      {!isLoadingPlatformInfo && (
        <>
          <div>
            <div className={`${style.title} `}>
              <h1 className={`${style.h1} `}>{platformTab.edit.title}</h1>
              <div className={`${style.buttonActions} `}>
                <button
                  className={`${style.button} ${generalize.buttonStyle_active}`}
                  onClick={endEditUser}
                >
                  {platformTab.cancelButton}
                </button>
                <button
                  className={`${style.button} ${!isModified
                      ? generalize.buttonStyle_disabled
                      : generalize.buttonStyle_active
                    }`}
                  onClick={savePlatformInfo}
                  disabled={!isModified}
                >
                  {platformTab.saveButton}
                </button>
              </div>
            </div>
          </div>

          <section className={`${style.newsInfo} `}>
            <article className={`${style.inputInfoSection} `}>
              <label className={`${style.inputTitle} `}>{platformTab.edit.fields.name}</label>
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
