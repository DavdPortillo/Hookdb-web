import { useContext, useEffect, useState } from 'react';

import style from '../css/userInfo.module.css';
import generalize from '../../../../../css/generalize.module.css';
import { UserContext } from '../../../../../context/UserContext';
import { updateUserData } from '../../../../../helpers/dataAPI';
import { toast } from 'react-hot-toast';
import { isFieldEmpty } from '../../../../../helpers/inputValidations';

export const UserInfo = ({ endEditUser, isLoadingUserInfo, userInfo }) => {
    const { user, language } = useContext(UserContext)
    const [originalInputValues, setOriginalInputValues] = useState()
    const [inputValues, setInputValues] = useState({
        username: '',
        email: '',
        country: '',
        year: '',
        language: '',
        profileImage: '',
        role: ''
    });
    const [isModified, setIsModified] = useState(false);
    const [showChangeImage, setShowChangeImage] = useState(false)
    const [userImage, setUserImage] = useState(null)
    const userTab = language.adminPanelPage.userTab;
    const warnings = language.warnings;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues({ ...inputValues, [name]: value });
    };

    useEffect(() => {
        setInputValues({
            username: userInfo?.username || '',
            email: userInfo?.email || '',
            country: userInfo?.country || '',
            year: userInfo?.year || '',
            language: userInfo?.language || '',
            role: userInfo?.role.id || '',
            profileImage: userInfo?.image || ''
        });

        setOriginalInputValues({
            username: userInfo?.username || '',
            email: userInfo?.email || '',
            country: userInfo?.country || '',
            year: userInfo?.year || '',
            language: userInfo?.language || '',
            role: userInfo?.role.id || '',
            profileImage: userInfo?.image || ''
        });

        setUserImage(userInfo?.image)
    }, [userInfo]);

    const saveUserInfo = async () => {

        if (validations()) {
            return;
        }

        const formData = new FormData();
        formData.append('updatedUser.username', inputValues.username);
        formData.append('updatedUser.email', inputValues.email);
        formData.append('updatedUser.country', inputValues.country);
        formData.append('updatedUser.year', inputValues.year);
        formData.append('updatedUser.language', inputValues.language);
        formData.append('updatedUser.role.id', inputValues.role);
        formData.append('file', inputValues.profileImage);

        try {
            await updateUserData(userInfo.id, formData, user.accessToken);
            setOriginalInputValues(inputValues)
            toast.success(warnings.success.editUser);
        } catch (error) {

            toast.error(warnings.error.userEdit);
        }


    }

    const validations = () => {
        if (isFieldEmpty(inputValues.username)) {
            toast.error(warnings.error.usernameEmpty);
            return true
        }

        if (!/^[a-zA-Z]/.test(inputValues.username)) {
            toast.error(warnings.error.usernameFirstLetter);
            return true;
        }

        if (!/^[a-zA-Z0-9_]{3,}$/.test(inputValues.username)) {
            toast.error(warnings.error.usernameCharacters);
            return true;
        }

        if (!/^[a-zA-Z0-9_]+$/.test(inputValues.username)) {
            toast.error(warnings.error.usernameCharacters);
            return true;
        }

        if (inputValues.email == "") {
            toast.error(warnings.error.emailEmpty);
            return true;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValues.email)) {
            toast.error(warnings.error.emailValid);

            return true;
        }


        if (!(inputValues.country.trim().length === 0 || (inputValues.country.trim().length >= 2 && inputValues.country.trim().length <= 50))) {
            toast.error(warnings.error.countryField);
            return true;
        }

        if (!(inputValues.year.length === 0 || (inputValues.year >= 1900 && inputValues.year <= 2099))) {
            toast.error(warnings.error.yearField);
            return true;
        }





        return false;




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

    return (

        <div className={`${style.userInfoContainer} `}>
            {!isLoadingUserInfo ? (
                <>
                    <div>
                        <div className={`${style.title} `}>
                            <h1 className={`${style.h1} `}>{userTab.edit.title}</h1>
                            <div className={`${style.buttonActions} `}>
                                <button className={`${style.button} ${generalize.buttonStyle_active}`} onClick={endEditUser}>{userTab.cancelButton}</button>
                                <button className={`${style.button} ${!isModified ? generalize.buttonStyle_disabled : generalize.buttonStyle_active}`} onClick={saveUserInfo} disabled={!isModified}>{userTab.saveButton}</button>
                            </div>
                        </div>
                    </div>
                    <section className={`${style.userinfo} `}>
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
                        <div>
                            <article className={`${style.inputInfoSection} `}>
                                <label className={`${style.inputTitle} `}>{userTab.edit.fields.username}</label>
                                <input
                                    type="text"
                                    className={`${style.inputUserSearch} `}
                                    name="username"
                                    value={inputValues.username}
                                    onChange={handleInputChange}
                                    disabled={user.id === userInfo.id}
                                />
                            </article>
                            <article className={`${style.inputInfoSection} `}>
                                <label className={`${style.inputTitle} `}>{userTab.edit.fields.email}</label>
                                <input
                                    type="text"
                                    className={`${style.inputUserSearch} `}
                                    name="email"
                                    value={inputValues.email}
                                    onChange={handleInputChange}
                                    disabled={user.id === userInfo.id}

                                />
                            </article>
                        </div>
                        <div className={`${style.userInputs} `}>

                            <article className={`${style.inputInfoSection} `}>
                                <label className={`${style.inputTitle} `}>{userTab.edit.fields.country}</label>
                                <input type="text" className={`${style.inputUserSearch} `} name="country" value={inputValues.country} onChange={handleInputChange}
                                />
                            </article>
                            <article className={`${style.inputInfoSection} `}>
                                <label className={`${style.inputTitle} `}>{userTab.edit.fields.year}</label>
                                <input type="text" className={`${style.inputUserSearch} `} name="year" value={inputValues.year} onChange={handleInputChange}
                                />
                            </article>
                            <article className={`${style.inputInfoSection} `}>
                                <label className={`${style.inputTitle} `}>{userTab.edit.fields.language.language}</label>


                                <select name="language" id="language" value={inputValues.language} onChange={handleInputChange} className={`${style.inputUserSearch} `}>
                                    <option value="en" >{userTab.edit.fields.language.english}</option>
                                    <option value="es">{userTab.edit.fields.language.spanish}</option>
                                </select>
                            </article>
                            <article className={`${style.inputInfoSection} `}>
                                <label className={`${style.inputTitle} `}>{userTab.edit.fields.role.role}</label>

                                <select name="role" id="role" value={inputValues.role} onChange={handleInputChange} className={`${style.inputUserSearch} `}>
                                    <option value="2">{userTab.edit.fields.role.user}</option>
                                    <option value="1">{userTab.edit.fields.role.admin}</option>
                                </select>
                            </article>
                        </div>
                    </section>
                </>
            ) : (
                <div>Cargando</div>
            )}
        </div>

    )
}
