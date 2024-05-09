import { useContext, useEffect, useState } from 'react';

import { PersonalInfo } from './components/PersonalInfo';
import { ProfileSection } from './components/ProfileSection';

import style from '../../css/userProfilePage.module.css';
import generalize from '../../../../css/generalize.module.css';
import { UserContext } from '../../../../context/UserContext';
import { getUserInformation, loginRequest, updateUSerByUser } from '../../../../helpers/dataAPI';
import { ChangeEmailWarning } from './components/ChangeEmailWarning';
import { ChangePasswordWarning } from './components/ChangePasswordWarning';
import toast from 'react-hot-toast';

export const GeneralInformationTab = () => {

    const [inputValue, setInputValue] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [originalUserInfo, setOriginalUserInfo] = useState('');
    const [isModified, setIsModified] = useState(false);
    const [userImage, setUserImage] = useState(null)
    const { user, language, changeTokenValue, changeUser, setUser, setLanguageUser } = useContext(UserContext);
    const [displayWarning, setDisplayWarning] = useState(false)
    const [displayWarningPassword, setDisplayWarningPassword] = useState(false)
    const warnings = language.warnings;

    const tab = language.userProfilePage.generalInformationTab;
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const userInfo = await getUserInformation(user.id, user.accessToken);
            setOriginalUserInfo(userInfo);
            setInputValue(userInfo);
            setUserImage(userInfo.image)
            setIsLoading(false);
        };

        if (isLoading) {
            fetchData();
        }
    }, [user, isLoading]);

    const handleProfileImageChange = (event) => {
        const file = event.target.files[0];
        setInputValue({ ...inputValue, image: file });
        setUserImage(URL.createObjectURL(file))
    };



    const handleChangeValue = (event) => {
        const { id, value } = event.target;
        const tempValue = (value == "") ? '' : value;
        setInputValue(prevState => ({
            ...prevState,
            [id]: tempValue
        }));
    }

    const handleChangePassword = (event) => {
        const { id, value } = event.target;
        const tempValue = (value == "") ? '' : value;
        setInputPassword(prevState => ({
            ...prevState,
            [id]: tempValue
        }));
    }

    const revertUserInfo = () => {
        setInputValue(originalUserInfo)
        setUserImage(originalUserInfo.image)
    }

    useEffect(() => {
        setUserImage(inputValue.image);
    }, []);

    const saveInfo = async () => {

        if (inputValue.email !== originalUserInfo.email) {
            await saveUserInfo();

            await checkLogin(changeTokenValue, changeUser)
            changeDisplayWarning(false)
        }
        else {
            await saveUserInfo();
            setIsLoading(true)

        }

    }

    const checkLogin = async (changeTokenValue, changeUser) => {
        const password = document.getElementById('password');



        let data
        try {

            data = await loginRequest(inputValue.email, password.value)
        } catch (error) {
            console.error("Error en el inicio de sesión")
        }


        if (data) {
            localStorage.removeItem('token')
            localStorage.setItem("token", JSON.stringify(data.accessToken));
            changeTokenValue();
            changeUser(data)
        }

    }



    const changeDisplayWarning = () => {
        if (inputValue.email !== originalUserInfo.email) {

            setDisplayWarning(!displayWarning);

        } else {
            saveInfo()

        }
    }
    const changeDisplayWarningPasword = () => {
        setDisplayWarningPassword(!displayWarningPassword);
    }



    const saveUserInfo = async () => {
        if (validationsUserInfo()) return

        const formData = new FormData();
        formData.append('updatedUser.username', inputValue.username ? inputValue.username : '');
        formData.append('updatedUser.email', inputValue.email ? inputValue.email : '');
        formData.append('updatedUser.country', inputValue.country ? inputValue.country : '');
        formData.append('updatedUser.year', inputValue.year ? inputValue.year : '');
        formData.append('updatedUser.language', inputValue.language ? inputValue.language : '');
        formData.append('updatedUser.gender', inputValue.gender ? inputValue.gender : '');
        if (inputValue.image instanceof File) {
            formData.append('file', inputValue.image);
        }

        const responseUser = await updateUSerByUser(user.id, formData, user.accessToken);
        setUser(prevUser => {

            return { ...prevUser, image: responseUser.image }
        })
        setLanguageUser(inputValue.language)
        setOriginalUserInfo(inputValue)
    }

    const validationsUserInfo = () => {
        if (inputValue.username === "") {
            toast.error(warnings.error.usernameEmpty);
            return true;
        }

        if (!/^[a-zA-Z]/.test(inputValue.username)) {
            toast.error(warnings.error.usernameFirstLetter);
            return true;
        }

        if (!/^[a-zA-Z0-9_]{3,}$/.test(inputValue.username)) {
            toast.error(warnings.error.usernameCharacters);
            return true;
        }

        if (inputValue.email == "") {
            toast.error(warnings.error.emailEmpty);
            return true;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue.email)) {
            toast.error(warnings.error.emailValid);

            return true;
        }
        if (inputValue?.country != null) {
            if (!(inputValue?.country.trim().length === 0 || (inputValue?.country.trim().length >= 2 && inputValue?.country.trim().length <= 50))) {
                toast.error(warnings.error.countryField);
                return true;
            }
        }

        if (inputValue?.year != null) {
            if (!(inputValue.year.length === 0 || (inputValue.year >= 1900 && inputValue.year <= 2099))) {
                toast.error(warnings.error.yearField);
                return true;
            }
        }

        return false
    }

    const savePassword = async () => {

        if (validations()) return;


        try {

            await loginRequest(inputValue.email, inputPassword.oldPassword);

            const formData = new FormData();
            formData.append('updatedUser.email', inputValue.email);
            formData.append('oldPassword', inputPassword.oldPassword);
            formData.append('newPassword', inputPassword.newPasswordCheck);

            await updateUSerByUser(user.id, formData, user.accessToken);

        } catch (error) {
            toast.error(warnings.error.incorrectOldPassword)
            console.error("Fallo de la contraseña")
        }


        changeDisplayWarningPasword()


    }

    const validations = () => {



        if (inputPassword.oldPassword == "" || inputPassword.oldPassword == undefined) {
            toast.error(warnings.error.oldPasswordEmpty);

            return true;
        }

        if (inputPassword.newPassword == "" || inputPassword.newPasswordCheck == "" || inputPassword.newPassword == undefined || inputPassword.newPasswordCheck == undefined) {
            toast.error(warnings.error.passwordEmpty);

            return true;
        }

        if (inputPassword.newPassword != inputPassword.newPasswordCheck) {
            toast.error(warnings.error.newPasswordMatch);

            return true;
        }

        if (inputPassword.newPassword.length < 6) {
            toast.error(warnings.error.passwordCharacters);

            return true;
        }
        if (!/[!@#$%&(),.\-_]+/.test(inputPassword.newPassword)) {
            toast.error(warnings.error.passwordSymbol);

            return true;
        }

        if (!/\d/.test(inputPassword.newPassword)) {
            toast.error(warnings.error.passwordNumber);

            return true;
        }





        return false;




    }




    useEffect(() => {

        const isModified = JSON.stringify(inputValue) != JSON.stringify(originalUserInfo);
        setIsModified(isModified);
    }, [inputValue, originalUserInfo]);



    return (
        isLoading ? <p>Cargando...</p> :
            <>
                <h1 className={`${style.title} `}>{tab.tabTitle}</h1>
                <p className={`${style.pDescription} `}>{tab.tabDescription}</p>
                <ProfileSection inputValue={inputValue} handleChangeValue={handleChangeValue} handleProfileImageChange={handleProfileImageChange} userImage={userImage} tabInfo={tab} changeDisplayWarningPasword={changeDisplayWarningPasword} />
                <PersonalInfo inputValue={inputValue} handleChangeValue={handleChangeValue} tabInfo={tab} />
                <div className={`${style.buttonContainer} `}>
                    <button className={`${style.button} ${!isModified ? generalize.buttonStyle_disabled : generalize.buttonStyle_active}`} disabled={!isModified} onClick={revertUserInfo}>{tab.cancelButton}</button>
                    <button className={` ${style.button}  ${!isModified ? generalize.buttonStyle_disabled : generalize.buttonStyle_active}`} disabled={!isModified} onClick={changeDisplayWarning}>{tab.saveButton}</button>
                </div>
                {displayWarning && <ChangeEmailWarning changeDisplayWarning={changeDisplayWarning} handleChangeValue={handleChangeValue} saveInfo={saveInfo} />}
                {displayWarningPassword && <ChangePasswordWarning changeDisplayWarningPasword={changeDisplayWarningPasword} handleChangePassword={handleChangePassword} savePassword={savePassword} />}
            </>
    )
}

