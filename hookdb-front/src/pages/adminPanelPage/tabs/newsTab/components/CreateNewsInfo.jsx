import { useContext, useState } from 'react';
import style from '../../../css/createSection.module.css';
import { UserContext } from '../../../../../context/UserContext';
import generalize from '../../../../../css/generalize.module.css';
import { createNews } from '../../../../../helpers/dataAPI';
import { isFieldEmpty } from '../../../../../helpers/inputValidations';
import { toast } from 'react-hot-toast';

export const CreateNewsInfo = ({getListNews}) => {

    const { user, language } = useContext(UserContext)
    const [inputValues, setInputValues] = useState({
        image: '',
        alt: '',
        headline: '',
        content: '',
        subtitle: '',
        language: ''
    });
    const [showChangeImage, setShowChangeImage] = useState(false)
    const [userImage, setUserImage] = useState(null)
    const newsTab = language.adminPanelPage.newsTab;
    const warnings = language.warnings;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues({ ...inputValues, [name]: value });
    };
    

    const saveNewsInfo = async () => {
        if(validations()) return

        const formaterContent = inputValues.content.replace(/\n/g, '<(&)>')
        const formData = new FormData();
        formData.append('headline', inputValues.headline);
        formData.append('content', formaterContent);
        formData.append('alt', inputValues.alt);
        formData.append('file', inputValues.image); 
        formData.append('subtitle', inputValues.subtitle); 

        try{
            await createNews(user.id, user.accessToken, formData, inputValues.language);
            getListNews()
            toast.success(warnings.success.createNews);

        }catch(err){
            toast.error(warnings.error.newsCreate);

        }
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

    const validations = () => {
        if (isFieldEmpty(inputValues.alt)) {
          toast.error(warnings.error.altImageEmpty);
          return true;
        }

        if (isFieldEmpty(inputValues.headline)) {
            toast.error(warnings.error.titleEmpty);
            return true;
          }

          if (isFieldEmpty(inputValues.content)) {
            toast.error(warnings.error.contentEmpty);
            return true;
          }

          if (isFieldEmpty(inputValues.subtitle)) {
            toast.error(warnings.error.subtitleEmpty);
            return true;
          }

          if (isFieldEmpty(inputValues.image)) {
            toast.error(warnings.error.imageEmpty);
            return true;
          }
    
        return false
      }

    return (


        <div className={`${style.newsInfoContainer} `}>

            <div>
                <div className={`${style.title} `}>
                    <h1 className={`${style.h1} `}>{newsTab.create.title}</h1>
                    <div className={`${style.buttonActions} `}>
                        <button className={`${style.button} ${generalize.buttonStyle_active}`} onClick={saveNewsInfo} >{newsTab.publishButton}</button>
                    </div>
                </div>
            </div>

            <section className={`${style.newsInfo} `}>
            <label>Idioma del juego</label>
                <select name="language" id="language" className={`${style.inputNewsSearch}`} defaultValue={''} onChange={handleInputChange}>
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
                    <label className={`${style.inputTitle} `}>{newsTab.create.fields.imageAlt}</label>
                    <input
                        type="text"
                        className={`${style.inputNewsSearch} `}
                        name="alt"
                        value={inputValues.alt}
                        onChange={handleInputChange} />
                </article>
                <article className={`${style.inputInfoSection} `}>
                    <label className={`${style.inputTitle} `}>{newsTab.create.fields.headline}</label>
                    <input
                        type="text"
                        className={`${style.inputNewsSearch} `}
                        name="headline"
                        value={inputValues.headline}
                        onChange={handleInputChange} />
                </article>
                <article className={`${style.inputInfoSection} `}>
                    <label className={`${style.inputTitle} `}>{newsTab.create.fields.subtitle}</label>
                    <input
                        type="text"
                        className={`${style.inputNewsSearch} `}
                        name="subtitle"
                        value={inputValues.subtitle}
                        onChange={handleInputChange} />
                </article>
                <article className={`${style.inputInfoSection} `}>
                    <label className={`${style.inputTitle} `}>{newsTab.create.fields.content}</label>
                    <textarea name="content" id="" cols="30" rows="20" className={`${style.inputNewsSearch} ${style.textArea}`} value={inputValues.content} onChange={handleInputChange}></textarea>
                </article>
            </section>


        </div>




    )
}
