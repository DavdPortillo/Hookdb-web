import style from '../css/followingGamesResults.module.css';
import { FollowingGameItem } from './FollowingGameItem';

export const FollowingGamesResults = ({ results }) => {
    return (
        <section className={`${style.gameSearchResults} `}>
            {
                results.map(result => <FollowingGameItem key={result.id} result={result} />)
            }




        </section>
    )
}
