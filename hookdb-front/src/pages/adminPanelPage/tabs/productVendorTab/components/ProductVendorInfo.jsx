import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../../context/UserContext";
import style from "../../../css/editSection.module.css";
import generalize from '../../../../../css/generalize.module.css';
import { editProductVendorById } from "../../../../../helpers/dataAPI";
import { isFieldEmpty } from "../../../../../helpers/inputValidations";
import { toast } from 'react-hot-toast';

export const ProductVendorInfo = ({ endEditProductVendor, productVendorInfo, isLoadingProductVendor }) => {

  const { user, language } = useContext(UserContext)
  const [originalInputValues, setOriginalInputValues] = useState()
  const [inputValues, setInputValues] = useState({
    name: '',
    alt: '',
    image: ''
  });
  const [isModified, setIsModified] = useState(false);
  const [showChangeImage, setShowChangeImage] = useState(false)
  const [userImage, setUserImage] = useState(null)
  const productVendorTab = language.adminPanelPage.productVendorTab;
  const warnings = language.warnings;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  useEffect(() => {
    setInputValues({
      name: productVendorInfo?.name || '',
      alt: productVendorInfo?.alt || '',
      image: productVendorInfo?.logo || '',
    });

    setOriginalInputValues({
      name: productVendorInfo?.name || '',
      alt: productVendorInfo?.alt || '',
      image: productVendorInfo?.logo || '',
    });

    setUserImage(productVendorInfo?.logo)
  }, [productVendorInfo]);




  const saveProductVendorInfo = async () => {

    if(validations()){
      return;
    }

    const formData = new FormData();
    formData.append('name', inputValues.name);
    formData.append('alt', inputValues.alt);
    formData.append('file', inputValues.image);


    try {
      await editProductVendorById(productVendorInfo.id, formData, user.accessToken,);
      toast.success(warnings.success.editProductVendor);

    } catch (err) {
      toast.error(warnings.error.productVendorEdit);

    }
  }

  useEffect(() => {
    const isModified = JSON.stringify(inputValues) !== JSON.stringify(originalInputValues);
    setIsModified(isModified);
  }, [inputValues, originalInputValues]);

  const showChangeImageEnabled = () => {
    setShowChangeImage(true)
  }

  const showChangeImageDisabled = () => {
    setShowChangeImage(false)
  }

  const handleImageChange = (event) => {

    const file = event.target.files[0];
    setInputValues({ ...inputValues, image: file });
    setUserImage(URL.createObjectURL(file))
  };

  const validations = () =>{
    if(isFieldEmpty(inputValues.name)){
        toast.error(warnings.error.nameEmpty)
        return true
    }

    if(isFieldEmpty(inputValues.alt)){
        toast.error(warnings.error.altImageEmpty)
        return true
    }

    if(isFieldEmpty(inputValues.logoImage)){
        toast.error(warnings.error.imageEmpty)
        return true
    }



    return false;
}

  return (
    <section className={`${style.newsInfoContainer} `}>
      {
        (!isLoadingProductVendor) &&
        <>
          <div>
            <div className={`${style.title} `}>
              <h1 className={`${style.h1} `}>{productVendorTab.edit.title}</h1>
              <div className={`${style.buttonActions} `}>
                <button className={`${style.button} ${generalize.buttonStyle_active}`} onClick={endEditProductVendor}>{productVendorTab.cancelButton}</button>
                <button className={`${style.button} ${!isModified ? generalize.buttonStyle_disabled : generalize.buttonStyle_active}`} onClick={saveProductVendorInfo} disabled={!isModified}>{productVendorTab.saveButton}</button>
              </div>
            </div>
          </div>

          <section className={`${style.newsInfo} `}>
            <article className={`${style.imageInfo} `}>
              <div className={`${style.imageContainer} `} onMouseOver={showChangeImageEnabled} onMouseLeave={showChangeImageDisabled}>
                <div className={`${style.image} `}>
                  <img src={userImage} alt="" className={`${style.profileImage} `} />

                  <input type="file" accept="image/*" onChange={handleImageChange} className={`${style.inputFile} `} />
                </div>
                <div className={`${style.changePhotoContainer} `}>

                  <img src="../../../../../../assets/global/photoIcon.svg" alt="" className={`${style.changePhotoImage} ${!showChangeImage && style.hidePhotoImage}`} onClick={() => document.querySelector('input[type="file"]').click()} />
                </div>
              </div>
            </article>
            <article className={`${style.inputInfoSection} `}>
              <label className={`${style.inputTitle} `}>{productVendorTab.edit.fields.imageAlt}</label>
              <input
                type="text"
                className={`${style.inputNewsSearch} `}
                name="alt"
                value={inputValues.alt}
                onChange={handleInputChange} />
            </article>
            <article className={`${style.inputInfoSection} `}>
              <label className={`${style.inputTitle} `}>{productVendorTab.edit.fields.name}</label>
              <input
                type="text"
                className={`${style.inputNewsSearch} `}
                name="name"
                value={inputValues.name}
                onChange={handleInputChange} />
            </article>

          </section>

        </>
      }

    </section>
  )
}
