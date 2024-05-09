import { useContext } from 'react';
import style from '../css/headerResults.module.css';
import { UserContext } from '../../../context/UserContext';

export const HeaderResults = ({searchText, results}) => {

    const {language} = useContext(UserContext);
    const searchResultPage = language.searchResultPage;
    return (
        <>
            <header className={`${style.header} `}>
                <h1 className={`${style.title} `}>{searchResultPage.title} &quot;{searchText}&quot;</h1>
                <div className={`${style.resultsInfoContainer} `}>
                    <h2 className={`${style.h2} `}>{results.length} {searchResultPage.description}{results.length === 1 ? '' : 's'}</h2>
                    <div className={`${style.sortResults} `}>
                        <p className={`${style.text} `}>{searchResultPage.displayFilter}: </p>
                        <select name="" id="" className={`${style.select} `}>
                            <option value="">WALAAA</option>
                        </select>
                    </div>
                </div>

                <hr className={`${style.hr} `} />
            </header>
        </>
    )
}
