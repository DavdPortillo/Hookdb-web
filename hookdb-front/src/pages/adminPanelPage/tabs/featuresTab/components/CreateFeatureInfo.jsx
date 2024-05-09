import { useContext, useState } from "react";
import style from '../../../css/createSection.module.css';
import { UserContext } from "../../../../../context/UserContext";
import generalize from "../../../../../css/generalize.module.css";
import { createFeature } from "../../../../../helpers/dataAPI";
import { isFieldEmpty } from "../../../../../helpers/inputValidations";
import { toast } from 'react-hot-toast';

export const CreateFeatureInfo = ({getListFeatures}) => {
  const { user, language } = useContext(UserContext);
  const [inputValues, setInputValues] = useState({
    name: "",
    image: "",
    alt: ""
  });
  const featureTab = language.adminPanelPage.featureTab;
  const [showChangeImage, setShowChangeImage] = useState(false)
  const [userImage, setUserImage] = useState(null)
  const warnings = language.warnings;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  
  const saveFeatureInfo = async () => {
    if (validations()) return
    const formData = new FormData();
    formData.append('name', inputValues.name);
    formData.append('alt', inputValues.alt);
    formData.append('file', inputValues.image); 

    try {
      await createFeature(user.accessToken, formData);
      getListFeatures();
      toast.success(warnings.success.createFeature);

    } catch (err) {
      toast.error(warnings.error.featureCreate);

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

  const showChangeImageEnabled = () => {
    setShowChangeImage(true)
}

const showChangeImageDisabled = () => {
    setShowChangeImage(false)
}

  const handleProfileImageChange = (event) => {
        
    const file = event.target.files[0];
    setInputValues({ ...inputValues, image: file });
    setUserImage(URL.createObjectURL(file))
};


  return (
    <div className={`${style.newsInfoContainer} `}>
      <div>
        <div className={`${style.title} `}>
          <h1 className={`${style.h1} `}>{featureTab.create.title}</h1>
          <div className={`${style.buttonActions} `}>
            <button
              className={`${style.button} ${generalize.buttonStyle_active}`}
              onClick={saveFeatureInfo}
            >
              {featureTab.publishButton}
            </button>
          </div>
        </div>
      </div>

      <section className={`${style.newsInfo} `}>
      <article className={`${style.imageInfo} `}>
                    <div className={`${style.imageContainer} `} onMouseOver={showChangeImageEnabled} onMouseLeave={showChangeImageDisabled}>
                        <div className={`${style.image} `}>
                            <img src={userImage} alt="" className={`${style.profileImage} `} />

                            <input type="file" accept="image/*" onChange={handleProfileImageChange} className={`${style.inputFile} `} />
                        </div>
                        <div className={`${style.changePhotoContainer} `}>

                            <img src="../../../../../../assets/global/photoIcon.svg" alt="" className={`${style.changePhotoImage} ${!showChangeImage && style.hidePhotoImage}`} onClick={() => document.querySelector('input[type="file"]').click()} />
                        </div>
                    </div>
                </article>
        <article className={`${style.inputInfoSection} `}>
          <label className={`${style.inputTitle} `}>{featureTab.create.fields.imageAlt}</label>
          <input
            type="text"
            className={`${style.inputNewsSearch} `}
            name="alt"
            value={inputValues.alt}
            onChange={handleInputChange} />
        </article>
        <article className={`${style.inputInfoSection} `}>
          <label className={`${style.inputTitle} `}>{featureTab.create.fields.name}</label>
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
