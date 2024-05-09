import style from "../../../css/editSection.module.css";
import generalize from "../../../../../css/generalize.module.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../../context/UserContext";
import { isFieldEmpty } from "../../../../../helpers/inputValidations";
import { toast } from 'react-hot-toast';

export const DistributorInfo = ({
  endEditUser,
  distributorInfo,
  isLoadingDistributorInfo,
}) => {
  const { user, language } = useContext(UserContext);
  const [originalInputValues, setOriginalInputValues] = useState();
  const [inputValues, setInputValues] = useState({
    name: "",
  });
  const [isModified, setIsModified] = useState(false);
  const distributorTab = language.adminPanelPage.distributorTab;
  const warnings = language.warnings;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  useEffect(() => {
    setInputValues({
      name: distributorInfo?.name || "",
    });

    setOriginalInputValues({
      name: distributorInfo?.name || "",
    });
  }, [distributorInfo]);

  const saveDistributorInfo = async () => {
    if(validations()) return 
    const idDistributor = distributorInfo.id;
    const newName = inputValues.name;
    const token = user.accessToken;

    const url = `http://158.179.219.214:31490/distributor/${idDistributor}`;
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
      toast.success(warnings.success.editDistributor);

      return data;
    } catch (error) {
      console.error("There was an error!", error);
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

  useEffect(() => {
    const isModified =
      JSON.stringify(inputValues) !== JSON.stringify(originalInputValues);
    setIsModified(isModified);
  }, [inputValues, originalInputValues]);

  return (
    <section className={`${style.newsInfoContainer} `}>
      {!isLoadingDistributorInfo && (
        <>
          <div>
            <div className={`${style.title} `}>
              <h1 className={`${style.h1} `}>{distributorTab.edit.title}</h1>
              <div className={`${style.buttonActions} `}>
                <button
                  className={`${style.button} ${generalize.buttonStyle_active}`}
                  onClick={endEditUser}
                >
                  {distributorTab.cancelButton}
                </button>
                <button
                  className={`${style.button} ${
                    !isModified
                      ? generalize.buttonStyle_disabled
                      : generalize.buttonStyle_active
                  }`}
                  onClick={saveDistributorInfo}
                  disabled={!isModified}
                >
                  {distributorTab.saveButton}
                </button>
              </div>
            </div>
          </div>

          <section className={`${style.newsInfo} `}>
            <article className={`${style.inputInfoSection} `}>
              <label className={`${style.inputTitle} `}>{distributorTab.edit.fields.name}</label>
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
