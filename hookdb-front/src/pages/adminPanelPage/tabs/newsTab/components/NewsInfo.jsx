import style from "../../../css/editSection.module.css";
import generalize from '../../../../../css/generalize.module.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../../context/UserContext';
import { editNewsInfo } from '../../../../../helpers/dataAPI';
import { isFieldEmpty } from "../../../../../helpers/inputValidations";
import { toast } from 'react-hot-toast';

export const NewsInfo = ({ endEditUser, newsInfo, isLoadingNewsInfo }) => {
    const { user, language } = useContext(UserContext)
    const [originalInputValues, setOriginalInputValues] = useState()
    const [inputValues, setInputValues] = useState({
        images: '',
        alt: '',
        headline: '',
        content: '',
        subtitle: '',
        language: ''
    });
    const [isModified, setIsModified] = useState(false);
    const [showChangeImage, setShowChangeImage] = useState(false)
    const [userImage, setUserImage] = useState(null)
    const newsTab = language.adminPanelPage.newsTab;
    const warnings = language.warnings;


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues({ ...inputValues, [name]: value });
    };

    useEffect(() => {
        setInputValues({
            images: newsInfo?.images || '',
            alt: newsInfo?.alt || '',
            headline: newsInfo?.headline || '',
            subtitle: newsInfo?.subtitle || '',
            language: newsInfo?.translation.id || '',
            content: newsInfo?.content.replace('<(&)><(&)>', '\n\n') || '',
        });

        setOriginalInputValues({
            images: newsInfo?.images || '',
            alt: newsInfo?.alt || '',
            headline: newsInfo?.headline || '',
            language: newsInfo?.translation.id || '',
            subtitle: newsInfo?.subtitle || '',
            content: newsInfo?.content.replace('<(&)><(&)>', '\n\n') || ''
        });

        setUserImage(newsInfo?.image)
    }, [newsInfo]);

    const saveNewsInfo = async () => {
        if (validations()) return

        const formaterContent = inputValues.content.replace(/\n/g, '<(&)>')


        const formData = new FormData();
        formData.append('headline', inputValues.headline);
        formData.append('content', formaterContent);
        formData.append('alt', inputValues.alt);
        formData.append('file', inputValues.profileImage);
        formData.append('subtitle', inputValues.subtitle);

        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });
        try {
            await editNewsInfo(newsInfo.id, user.accessToken, formData, inputValues.language);
            toast.success(warnings.success.editNews);

        } catch (err) {
            toast.error(warnings.error.newsEdit);

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

    const handleProfileImageChange = (event) => {

        const file = event.target.files[0];
        setInputValues({ ...inputValues, profileImage: file });
        setUserImage(URL.createObjectURL(file))
    };

    const validations = () => {
        if (isFieldEmpty(inputValues.alt)) {
            toast.error(warnings.error.altImageEmpty);
            return true;
        }

        if (isFieldEmpty(inputValues.headline)) {
            toast.error('warnings.error.titleEmpty');
            return true;
        }

        if (isFieldEmpty(inputValues.content)) {
            toast.error(warnings.error.contentEmpty);
            return true;
        }

        if (isFieldEmpty(inputValues.profileImage)) {
            toast.error(warnings.error.imageEmpty);
            return true;
        }

        if (isFieldEmpty(inputValues.subtitle)) {
            toast.error(warnings.error.subtitleEmpty);
            return true;
          }

        return false
    }

    return (
        <section className={`${style.newsInfoContainer} `}>
            {
                (!isLoadingNewsInfo) &&
                <>
                    <div>
                        <div className={`${style.title} `}>
                            <h1 className={`${style.h1} `}>{newsTab.edit.title}</h1>
                            <div className={`${style.buttonActions} `}>
                                <button className={`${style.button} ${generalize.buttonStyle_active}`} onClick={endEditUser}>{newsTab.cancelButton}</button>
                                <button className={`${style.button} ${!isModified ? generalize.buttonStyle_disabled : generalize.buttonStyle_active}`} onClick={saveNewsInfo} disabled={!isModified}>{newsTab.saveButton}</button>
                            </div>
                        </div>
                    </div>

                    <section className={`${style.newsInfo} `}>
                        <label>Idioma del juego</label>
                        <select name="language" id="language" className={`${style.inputNewsSearch}`} defaultValue={''} onChange={handleInputChange} value={inputValues.language}>
                            <option value="" disabled hidden>Idioma</option>
                            <option value="1">Español</option>
                            <option value="2">Inglés</option>
                        </select>
                        <article className={`${style.imageInfo} `}>
                            <div className={`${style.imageNewsContainer} `} onMouseOver={showChangeImageEnabled} onMouseLeave={showChangeImageDisabled}>
                                <div className={`${style.imageNews} `}>
                                    <img src={userImage} alt="" className={`${style.profileImageNews} `} />

                                    <input type="file" accept="image/*" onChange={handleProfileImageChange} className={`${style.inputFile} `} />
                                </div>
                                <div className={`${style.changePhotoNewsContainer} `}>

                                    <img src="../../../../../../assets/global/photoIcon.svg" alt="" className={`${style.changePhotoImage} ${!showChangeImage && style.hidePhotoImage}`} onClick={() => document.querySelector('input[type="file"]').click()} />
                                </div>
                            </div>
                        </article>
                        <article className={`${style.inputInfoSection} `}>
                            <label className={`${style.inputTitle} `}>{newsTab.edit.fields.imageAlt}</label>
                            <input
                                type="text"
                                className={`${style.inputNewsSearch} `}
                                name="alt"
                                value={inputValues.alt}
                                onChange={handleInputChange} />
                        </article>
                        <article className={`${style.inputInfoSection} `}>
                            <label className={`${style.inputTitle} `}>{newsTab.edit.fields.headline}</label>
                            <input
                                type="text"
                                className={`${style.inputNewsSearch} `}
                                name="headline"
                                value={inputValues.headline}
                                onChange={handleInputChange} />
                        </article>
                        <article className={`${style.inputInfoSection} `}>
                            <label className={`${style.inputTitle} `}>{newsTab.edit.fields.subtitle}</label>
                            <input
                                type="text"
                                className={`${style.inputNewsSearch} `}
                                name="subtitle"
                                value={inputValues.subtitle}
                                onChange={handleInputChange} />
                        </article>
                        <article className={`${style.inputInfoSection} `}>
                            <label className={`${style.inputTitle} `}>{newsTab.edit.fields.content}</label>
                            <textarea name="content" id="" cols="30" rows="20" className={`${style.inputNewsSearch} ${style.textArea}`} value={inputValues.content} onChange={handleInputChange}></textarea>
                        </article>
                    </section>

                </>
            }

        </section>
    )
}
