import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../../context/UserContext";
import style from "../../../css/editSection.module.css";
import generalize from '../../../../../css/generalize.module.css';
import { editDlcById } from "../../../../../helpers/dataAPI";
import { isFieldEmpty } from "../../../../../helpers/inputValidations";
import { toast } from 'react-hot-toast';

export const DlcInfo = ({ endEditDlc, dlcInfo, isLoadingDlcInfo }) => {
    const { user, language } = useContext(UserContext)
    const [originalInputValues, setOriginalInputValues] = useState()
    const [inputValues, setInputValues] = useState({
        name: "",
        alt: "",
        image: "",
        sinopsis: "",
        date: "",
        gameId: ""
    });
    const [isModified, setIsModified] = useState(false);
    const [showChangeImage, setShowChangeImage] = useState(false)
    const [userImage, setUserImage] = useState(null)
    const dlcTab = language.adminPanelPage.dlcTab;
    const warnings = language.warnings;


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues({ ...inputValues, [name]: value });
    };

    useEffect(() => {
        setInputValues({
            name: dlcInfo?.name || '',
            alt: dlcInfo?.alt || '',
            image: dlcInfo?.image || '',
            date: dlcInfo?.date || '',
            sinopsis: dlcInfo?.sinopsis || '',
            gameId: dlcInfo?.id || ''
        });

        setOriginalInputValues({
            name: dlcInfo?.name || '',
            alt: dlcInfo?.alt || '',
            image: dlcInfo?.image || '',
            date: dlcInfo?.date || '',
            sinopsis: dlcInfo?.sinopsis || '',
            gameId: dlcInfo?.id || ''
        });

        setUserImage(dlcInfo?.image)
    }, [dlcInfo]);

    const saveProductPlatformInfo = async () => {
        if(validations()) return
        const formData = new FormData();
        formData.append('name', inputValues.name);
        formData.append('alt', inputValues.alt);
        formData.append('sinopsis', inputValues.sinopsis);
        formData.append('date', inputValues.date);
        formData.append('game.id', inputValues.gameId);
        if (inputValues.image instanceof File) {
            formData.append('file', inputValues.image);

        } 

        try {
            await editDlcById(dlcInfo.id, formData, user.accessToken,);
            toast.success(warnings.success.editDlc);
      
          } catch (err) {
            toast.error(warnings.error.dlcEdit);
      
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


    const validations = () => {
        if (isFieldEmpty(inputValues.name)) {
          toast.error(warnings.error.nameEmpty);
          return true;
        }

        if (isFieldEmpty(inputValues.alt)) {
            toast.error(warnings.error.altImageEmpty);
            return true;
          }

          if (isFieldEmpty(inputValues.sinopsis)) {
            toast.error(warnings.error.sinopsisEmpty);
            return true;
          }

          if (isFieldEmpty(inputValues.image)) {
            toast.error(warnings.error.imageEmpty);
            return true;
          }

          if (isFieldEmpty(inputValues.date)) {
            toast.error(warnings.error.dateEmpty);
            return true;
          }

          if (isFieldEmpty(inputValues.gameId)) {
            toast.error(warnings.error.idGameEmpty);
            return true;
          }

          if (isNaN(inputValues.gameId)) {
            toast.error(warnings.error.idGameNumber);
            return true;
          }

          
    
        return false
      }
    return (
        <section className={`${style.newsInfoContainer} `}>
            {
                (!isLoadingDlcInfo) &&
                <>
                    <div>
                        <div className={`${style.title} `}>
                            <h1 className={`${style.h1} `}>{dlcTab.edit.title}</h1>
                            <div className={`${style.buttonActions} `}>
                                <button className={`${style.button} ${generalize.buttonStyle_active}`} onClick={endEditDlc}>{dlcTab.cancelButton}</button>
                                <button className={`${style.button} ${!isModified ? generalize.buttonStyle_disabled : generalize.buttonStyle_active}`} onClick={saveProductPlatformInfo} disabled={!isModified}>{dlcTab.saveButton}</button>
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
                            <label className={`${style.inputTitle} `}>{dlcTab.create.fields.imageAlt}</label>
                            <input
                                type="text"
                                className={`${style.inputNewsSearch} `}
                                name="alt"
                                value={inputValues.alt}
                                onChange={handleInputChange}
                            />
                        </article>
                        <article className={`${style.inputInfoSection} `}>
                            <label className={`${style.inputTitle} `}>{dlcTab.create.fields.name}</label>
                            <input
                                type="text"
                                className={`${style.inputNewsSearch} `}
                                name="name"
                                value={inputValues.name}
                                onChange={handleInputChange}
                            />
                        </article>
                        <article className={`${style.inputInfoSection} `}>
                            <label className={`${style.inputTitle} `}>{dlcTab.create.fields.sinopsis}</label>

                            <textarea
                                className={`${style.inputNewsSearch}  ${style.textArea}`}
                                name="sinopsis"
                                value={inputValues.sinopsis}
                                onChange={handleInputChange}
                            ></textarea>
                        </article>
                        <article className={`${style.inputInfoSection} `}>
                            <label className={`${style.inputTitle} `}>{dlcTab.create.fields.date}</label>
                            <input type="date" name="date" id="date" value={inputValues.date} className={`${style.inputNewsSearch} `} onChange={handleInputChange} />
                        </article>
                        <article className={`${style.inputInfoSection} `}>
                            <label className={`${style.inputTitle} `}>{dlcTab.create.fields.gameId}</label>
                            <input
                                type="text"
                                className={`${style.inputNewsSearch} `}
                                name="gameId"
                                value={inputValues.gameId}
                                onChange={handleInputChange}
                            />
                        </article>
                    </section>

                </>
            }

        </section>
    )
}
