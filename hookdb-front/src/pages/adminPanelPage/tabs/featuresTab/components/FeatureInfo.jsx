import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../../context/UserContext";
import generalize from '../../../../../css/generalize.module.css';
import style from "../../../css/editSection.module.css";
import { isFieldEmpty } from "../../../../../helpers/inputValidations";
import { toast } from 'react-hot-toast';

export const FeatureInfo = ({ endEditFeature, featureInfo, isLoadingFeatureInfo }) => {
  const { user, language } = useContext(UserContext);
  const [originalInputValues, setOriginalInputValues] = useState();
  const [inputValues, setInputValues] = useState({
    name: '',
    image: '',
    alt: ''
  });
  const [isModified, setIsModified] = useState(false);
  const featureTab = language.adminPanelPage.featureTab;
  const [showChangeImage, setShowChangeImage] = useState(false)
  const [userImage, setUserImage] = useState(null)
  const warnings = language.warnings;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  useEffect(() => {
    setInputValues({
      name: featureInfo?.name || "",
      alt: featureInfo?.alt || "",
      image: featureInfo?.image || "",
    });

    setOriginalInputValues({
      name: featureInfo?.name || "",
      alt: featureInfo?.alt || "",
      image: featureInfo?.image || "",

    });
  }, [featureInfo]);

  const saveGenreInfo = async () => {

    if (validations()) return;

    const idFeature = featureInfo.id;
    const newName = inputValues.name;
    const token = user.accessToken;

    const url = `http://158.179.219.214:31490/feature/${idFeature}`;
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
      toast.success(warnings.success.editFeature);

      return data;
    } catch (error) {
      console.error("There was an error!", error);
      toast.error(warnings.error.featureEdit);

    }
  };

  const validations = () => {
    if (isFieldEmpty(inputValues.name)) {
      toast.error(warnings.error.nameEmpty);
      return true;
    }

    if (isFieldEmpty(inputValues.alt)) {
      toast.error(warnings.error.altImageEmpty);
      return true;
    }

    if (isFieldEmpty(inputValues.image)) {
      toast.error(warnings.error.imageEmpty);
      return true;
    }

    return false
  }

  const handleImageChange = (event) => {

    const file = event.target.files[0];
    setInputValues({ ...inputValues, image: file });
    setUserImage(URL.createObjectURL(file))
  };

  const showChangeImageEnabled = () => {
    setShowChangeImage(true)
  }

  const showChangeImageDisabled = () => {
    setShowChangeImage(false)
  }

  useEffect(() => {
    const isModified =
      JSON.stringify(inputValues) !== JSON.stringify(originalInputValues);
    setIsModified(isModified);
  }, [inputValues, originalInputValues]);

  return (
    <section className={`${style.newsInfoContainer} `}>
      {!isLoadingFeatureInfo && (
        <>
          <div>
            <div className={`${style.title} `}>
              <h1 className={`${style.h1} `}>{featureTab.edit.title}</h1>
              <div className={`${style.buttonActions} `}>
                <button
                  className={`${style.button} ${generalize.buttonStyle_active}`}
                  onClick={endEditFeature}
                >
                  {featureTab.cancelButton}
                </button>
                <button
                  className={`${style.button} ${!isModified
                      ? generalize.buttonStyle_disabled
                      : generalize.buttonStyle_active
                    }`}
                  onClick={saveGenreInfo}
                  disabled={!isModified}
                >
                  {featureTab.saveButton}
                </button>
              </div>
            </div>
          </div>

          <section className={`${style.newsInfo} `}>
            <article className={`${style.imageInfo} `}>
              <div className={`${style.imageContainer} `} onMouseOver={showChangeImageEnabled} onMouseLeave={showChangeImageDisabled}>
                <div className={`${style.image} `}>
                  <img src={inputValues.image} alt="" className={`${style.profileImage} `} />

                  <input type="file" accept="image/*" onChange={handleImageChange} className={`${style.inputFile} `} />
                </div>
                <div className={`${style.changePhotoContainer} `}>

                  <img src="../../../../../../assets/global/photoIcon.svg" alt="" className={`${style.changePhotoImage} ${!showChangeImage && style.hidePhotoImage}`} onClick={() => document.querySelector('input[type="file"]').click()} />
                </div>
              </div>
            </article>
            <article className={`${style.inputInfoSection} `}>
              <label className={`${style.inputTitle} `}>{featureTab.edit.fields.imageAlt}</label>
              <input
                type="text"
                className={`${style.inputNewsSearch} `}
                name="alt"
                value={inputValues.alt}
                onChange={handleInputChange} />
            </article>
            <article className={`${style.inputInfoSection} `}>
              <label className={`${style.inputTitle} `}>{featureTab.edit.fields.name}</label>
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