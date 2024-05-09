import { useParams } from 'react-router-dom';
import { GamesSearchResults } from './components/GamesSearchResults';
import { HeaderResults } from './components/HeaderResults';
import style from './css/searchResultPage.module.css';
import { useContext, useEffect, useState } from 'react';
import { searchGame } from '../../helpers/dataAPI';
import { UserContext } from '../../context/UserContext';
export const SearchResultsPage = () => {

  const {languageCode} = useContext(UserContext)
  const {searchText} = useParams();
  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSearchGame = async () =>{
      const tempResult = await searchGame(searchText, languageCode);
      setResults(tempResult);
      setIsLoading(false)
    }

    fetchSearchGame();

  }, [searchText])
  

  return (
    (!isLoading) &&
    <>
      <HeaderResults searchText={searchText} results={results}/>
      <div className={`${style.container} `}>
        <GamesSearchResults results={results}/>
      </div>
    </>
  )
}
