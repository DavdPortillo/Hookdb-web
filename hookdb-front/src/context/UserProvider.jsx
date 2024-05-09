import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { getDataFromLocalStorage } from "../helpers/localStorageData";
import { authenticateUser, getUserInfo, getUserInformation } from '..//helpers/dataAPI';
import { selectLanguageGuest, selectLanguageUser } from "../helpers/manageLanguage";

export const UserProvider = ({ children }) => {


    const [user, setUser] = useState(null);
    const [token, setToken] = useState(getDataFromLocalStorage())
    const [userLoaded, setUserLoaded] = useState(null);
    const [language, setLanguage] = useState(null);
    const [languageCode, setLanguageCode] = useState(null)

    const cleanTokenValue = () => {
        setUser(null);
        setToken(null);
    }

    const changeTokenValue = () => {
        setToken(getDataFromLocalStorage());
    }

    const changeUser = (value) => {
        setUser(prevState =>{
            return {...prevState, value}
        });
    }

    const setLanguageUser = async(value) =>{
        setLanguage(await selectLanguageUser(value))

    }


    useEffect(() => {

        const getUserInformationFetch = async () => {
            
            if (token) {
                const userFetch = await authenticateUser(token);
                const a = await getUserInformation(userFetch.id, userFetch.accessToken)
                const tempUser = {...userFetch, image: a.image}
                setUser(tempUser);
                
                if (userFetch) {
                    const languageCode = await getUserInfo(userFetch.id, token)
                    const tempLanguage = await selectLanguageUser(languageCode.language);
                    setLanguage(tempLanguage)
                    setLanguageCode(tempLanguage.code)
                    setUserLoaded(true);

                } else {
                    setUserLoaded(false);


                }

            } else {
                const language = await selectLanguageGuest();
                setLanguageCode(language.code)
                setLanguage(language)
                setUserLoaded(false);


            }
        }

        setToken(getDataFromLocalStorage());
        getUserInformationFetch();
        
    }, [token, language])
    

    return (

        <UserContext.Provider value={{ token, cleanTokenValue, changeTokenValue, changeUser, user, userLoaded, language, setLanguage, setUser, setLanguageUser, languageCode }}>
            {children}
        </UserContext.Provider>
    );



}
