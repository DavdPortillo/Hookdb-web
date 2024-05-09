import { useContext, useEffect, useState } from "react";

import { SearchSuggestion } from "./";

import style from '../css/inputSearch.module.css';
import { searchGameReduced } from "../../../helpers/dataAPI";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";

export const InputSearch = ({ handleClickShowSearcher }) => {


    const [games, setGames] = useState('');
    const [valueSearch, setValueSearch] = useState('');
    const [isInputFocused, setIsInputFocused] = useState(false);
    const navigate = useNavigate();
    const { language, languageCode } = useContext(UserContext);
    const searcher = language.header;
    const searchSuggestions = language.tooltips.searchSuggestions;
    const location = useLocation();

    const handleFindGame = async (event) => {
        const searchText = event.target.value;
        if(searchText.length > 80) return;
        if(searchText === '') return;
        
        setValueSearch(searchText);

        let resultGames = await searchGameReduced(searchText, languageCode);
        setGames(resultGames);

    }



    useEffect(() => {
        if(!location.pathname.startsWith('/search/')){
            const searcher = document.getElementById('searcher');
            searcher.value = '';
            setValueSearch('');

        }

    }, [location.pathname]); 



    

    const handleInputFocus = () => {
        setIsInputFocused(true);
    }

    const handleInputBlur = () => {
        setTimeout(() => {
            setIsInputFocused(false);
        }, 200);
    }

    const showGames = () => {

        if (games.length > 0) {
            return games.slice(0, 5).map((game) => (
                <SearchSuggestion key={game.id} dataGame={game} />))
        } else {
            return '';
        }
    }

    const handleInputKeyPress = (event) => {
        if (event.key === 'Enter' && event.target.value !== '') {
            setIsInputFocused(false)
            navigate(`/search/${event.target.value}`)
            
        }
    }

    const pressSearchButton = () =>{
        const searcher = document.getElementById('searcher');

        navigate(`/search/${searcher.value}`)
    }

 


    return (

        <div className={`${style.searcher} `}>
            <div className={`${style.searchContainer} `}>

                <div className={`${style.searcherContainer} `}>
                    <div className={`${style.buttonContainer} `}>
                        <button className={`${style.buttonAction} `} onClick={pressSearchButton}>
                            <img src="../../../../assets/global/searchIcon.svg" height={20} width={20} alt="" className={`${style.searchImage} `} />

                        </button>
                        <button className={`${style.buttonAction} `} onClick={handleClickShowSearcher}>

                            <img src="../../../../assets/global/cleanIcon.svg" height={20} width={20} alt="" className={`${style.closeImage} `} />
                        </button>

                    </div>

                    <input type="text" className={`${style.search} `} placeholder={searcher.searchInput} id="searcher"
                        onChange={handleFindGame}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur} 
                        onKeyDown={handleInputKeyPress}
                        onClick={handleInputFocus} 
                        maxLength={50}
                        autoComplete="off"/>


                </div>
                {(isInputFocused && valueSearch !== '') && 
                    <div className={`${style.searchSuggestions} `}>
                        {
                            showGames()
                        }
                        <Link to={`search/${valueSearch}`} className={`${style.readMoreContainer} `}>{searchSuggestions.viewAllResultsButton}</Link>
                    </div>
                }
            </div>

        </div>



    )
}



