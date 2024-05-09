import { Critic } from "./";

import style from '../css/criticsResults.module.css';
export const CriticsResults = ({ setEnabledFilters, reviewVotes, getVotes, userReviews }) => {
    const data = setEnabledFilters();

    return (

        <div className={`${style.critics} `}>

            {
                data.map(criticData => <Critic key={criticData.id} data={criticData} reviewVotes={reviewVotes} getVotes={getVotes} userReviews={userReviews}/>)
            }
        </div>


    )
} 
