import { useContext, useEffect, useState } from 'react';

import { FiltersCritics, CriticsResults } from './components';
import { NotResults } from '../pricesTab/components/';
import { getReviewVotes, getReviewsFromGame, getUserReviews, getVotesByIdReview } from '../../../../helpers/dataAPI';
import { UserContext } from '../../../../context/UserContext';


const defaultFilters = {
  date: '',
  gameScore: '',
};

const defaultOrderCritics = 'ascendantScore';

export const CriticsTab = ({ dataGame }) => {

  const [filters, setfilters] = useState(defaultFilters);
  const [order, setorder] = useState(defaultOrderCritics);
  const [reviews, setReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewVotes, setReviewVotes] = useState(null);
  const [userReviews, setUserReviews] = useState(null);
  const {user, userLoaded} = useContext(UserContext)

  //Change the state of the filter passed as a parameter.
  const handleFilterChange = (filterName, newValue) => {
    setfilters(prevFilter => ({
      ...prevFilter,
      [filterName]: newValue
    }));

  };

  //Establish the order of the critics.
  const handleOrderChange = (newValue) => {
    setorder(newValue)
  };

  //Reset the values of the filters state.
  const handleResetFilters = () => {
    setfilters(defaultFilters);
  };

  //Retrieve those critics that meet the conditions of the filters and sort them.
  const setEnabledFilters = () => {
    let resultElements = reviews;

    const currentDate = new Date();
    const daysPerMonth = 30;
    const months = 2;
    const secondsInTwoMonths = months * daysPerMonth * 24 * 60 * 60;

    for (const key in filters) {
      const value = filters[key];

      if (key === 'gameScore' && value !== '') {
        resultElements = filterByGameScore(resultElements, value);
      } else if (key === 'date' && value === 'recent') {
        resultElements = filterByRecent(resultElements, currentDate, secondsInTwoMonths);
      }
    }

    resultElements = sortCriticsBy(resultElements, order);

    return resultElements;
  };

  useEffect(() => {
    const getReviews = async () => {
      let tempReviewsData = await getReviewsFromGame(dataGame.game.id);
      const reviewsWithVotes = await Promise.all(tempReviewsData.map(async (review) => {
        const votes = await getVotesByIdReview(review.id);
        return { ...review, votes: votes };
      }));
      if(userLoaded){

        const result = await getReviewVotes(user.id, dataGame.game.id, user.accessToken);
        const reviewsResult = await getUserReviews(user.id, user.accessToken);
        setReviewVotes(result);
        setUserReviews(reviewsResult)
      }
      setReviews(reviewsWithVotes)
      setIsLoading(false)
    }

    getReviews();

  }, [userLoaded])

  const getVotes = async () =>{
    
    const result = await getReviewVotes(user.id, dataGame.game.id, user.accessToken);
    setReviewVotes(result);
  }
  


  


  return (
    (isLoading) ? (
      <div>Cargando...</div>
    ) : (
      (reviews.length !== 0) ? (
        <>
          <FiltersCritics handleChangers={{ handleFilterChange, handleOrderChange }} handleResetFilters={handleResetFilters} index={{ filters, order }} dataGame={dataGame} reviews={reviews} />
          <CriticsResults setEnabledFilters={setEnabledFilters} reviewVotes={reviewVotes} getVotes={getVotes} userReviews={userReviews}/>
        </>
      ) : (
        <>
        <FiltersCritics handleChangers={{ handleFilterChange, handleOrderChange }} handleResetFilters={handleResetFilters} index={{ filters, order }} dataGame={dataGame} reviews={reviews}/>
        <NotResults />
        </>
      )
    )
  );
}

//Retrieve those critics that meet the conditions of the filters and sort them.
function sortCriticsBy(criticsResults, order) {
  let tempResult = [];

  switch (order) {
    case 'ascendantScore':
      tempResult = criticsResults.sort((a, b) => b.gameScore - a.gameScore);
      break;
    case 'descendantScore':
      tempResult = criticsResults.sort((a, b) => a.gameScore - b.gameScore);
      break;
    case 'moreUseful':
      tempResult = criticsResults.sort((a, b) => (b.votes.likes - b.votes.dislikes) - (a.votes.likes - a.votes.dislikes));
      break;
    default:
      throw new Error('Caso fuera de rango');
  }

  return tempResult;
}


const filterByGameScore = (elements, value) => {
  if (value === 'positive') {
    return elements.filter(element => element.gameScore >= 5);
  } else if (value === 'negative') {
    return elements.filter(element => element.gameScore < 5);
  }
  return elements;
};

const filterByRecent = (elements, currentDate, secondsInTwoMonths) => {
  return elements.filter(element => {
    const differenceInSeconds = (currentDate - new Date(element.date)) / 1000;
    return differenceInSeconds < secondsInTwoMonths;
  });
};