
import style from '../css/profileSection.module.css';
import generalInformation from '../generalInformation.module.css';
import generalize from '../../../../../css/generalize.module.css';

export const ProfileSection = ({ handleChangeValue, inputValue, handleProfileImageChange, userImage, tabInfo, changeDisplayWarningPasword }) => {


    const changePassword = (event) =>{
        event.preventDefault();
        changeDisplayWarningPasword()
    }


    return (

        <section className={`${generalInformation.section}`}>
            <h2 className={`${generalInformation.subtitle} `}>{tabInfo.profileSection.title}</h2>
            <hr className={`${generalInformation.hr} `} />
            <div className={`${generalInformation.sectionContent} `}>
                <div className={`${generalInformation.subSection} `}>
                    <div className={`${userImage ?  style.imageContainer : style.noImageContainer} `}>
                        <img src={(userImage) ? userImage : '../../../../../../assets/global/userIconAdminPanel.svg'} alt={tabInfo.profileSection.altUserImage} className={`${userImage ? style.image : style.noImage} `} />
                    </div>
                    <input type="file" accept="image/*" onChange={handleProfileImageChange} className={`${style.inputFile} `} />
                    <button className={`${generalize.buttonStyle_active} ${style.button}`} onClick={() => document.querySelector('input[type="file"]').click()}>{tabInfo.profileSection.changeImageButton}</button>
                </div>
                <div className={`${generalInformation.subSection} `}>
                    <form className={`${generalInformation.formProfileSection} `}>
                        <label className={`${generalInformation.labelProfileSection} `}>
                            {tabInfo.profileSection.usernameLabel}
                            <input onChange={handleChangeValue} id='username' type="text" className={`${generalize.inputTextStyle} ${generalInformation.input}`} value={inputValue.username} />
                        </label>
                        <label className={`${generalInformation.labelProfileSection} `}>
                            {tabInfo.profileSection.emailLabel}
                            <input onChange={handleChangeValue} id='email' type="text" className={`${generalize.inputTextStyle} ${generalInformation.input}`} value={inputValue.email} />
                        </label>

                        <button className={`${generalize.buttonStyle_active} ${generalInformation.changePasswordButton}`} onClick={(event) =>changePassword(event)}>{tabInfo.profileSection.passwordButton}</button>

                    </form>
                </div>
            </div>
        </section>


    )
}

