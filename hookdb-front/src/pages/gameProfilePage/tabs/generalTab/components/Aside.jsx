import { Feature, SagaItem } from './';

import generalTab from '../generalTab.module.css';
import aside from '../css/aside.module.css';
import { generateKey } from '../../../../../helpers/composeText';
import { UserContext } from '../../../../../context/UserContext';
import { useContext } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import React from 'react'
export const Aside = ({ dataGame }) => {

    const { language } = useContext(UserContext);
    const page = language.gameProfilePage;

    const compareDates = (game1, game2) => {
        return new Date(game1.date) - new Date(game2.date);
    };

    const setSaga = () => {

        const sortedGames = dataGame.saga.games.sort(compareDates);
        const indexCurrentGame = dataGame.saga.games.findIndex(item => item.id === dataGame.game.id)

        const saga = [
            sortedGames[indexCurrentGame - 2],
            sortedGames[indexCurrentGame],
            sortedGames[indexCurrentGame + 1]


        ]
        return saga.map((item, i) => {

            return (item != undefined) ? <div className={`${aside.sagaContainer} `} key={item.id}><SagaItem  information={item} main={i === 1} /></div> : <div key={generateKey()} className={`${aside.sagaContainer} `}></div>;
        });
    }

    return (

        <aside className={`${generalTab.aside}`}>
            <div>

                <section className={`${aside.features} `}>
                    <h3 className={`${aside.title} `}>{page.generalTab.featuresTitle}</h3>
                    <hr className={`${aside.hr} `} />
                    <div className={`${aside.featureItem} `}>
                        {dataGame.game.gameFeatures.map(item => (
                            <Feature key={item.id} featureData={item} />
                        ))}
                    </div>
                </section>
                <section className={`${aside.features} `}>
                    <h3 className={`${aside.title} `}>{page.generalTab.seriesGamesTitle}</h3>
                    <hr className={`${aside.hr} `} />
                    <div className={`${aside.container} `}>
                        {
                            setSaga()
                        }
                    </div>
                </section>
                <section className={`${aside.features} `}>
                    <h3 className={`${aside.title} `}>{page.generalTab.languagesTitle}</h3>
                    <hr className={`${aside.hr} `} />
                    <div className={`${aside.tableAvailabilitiesContainer} `}>
                        <table className={`${aside.tableAvailabilities} `}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th className={`${aside.headTable} `}>{page.generalTab.interfaceColumn}</th>
                                    <th className={`${aside.headTable} `}>{page.generalTab.VoiceColumn}</th>
                                    <th className={`${aside.headTable} `}>{page.generalTab.subtitlesColumn}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataGame.game.availabilities.map(element => {
                                    return <React.Fragment key={element.id}>
                                        <tr>
                                            <td>{element.language}</td>
                                            <td className={`${aside.columnAvailability} `}>{element.interfaceLanguage && <CheckIcon sx={{ verticalAlign: 'middle', height: '20px' }} />}</td>
                                            <td className={`${aside.columnAvailability} `}>{element.audioLanguage && <CheckIcon sx={{ verticalAlign: 'middle', height: '20px' }} />}</td>
                                            <td className={`${aside.columnAvailability} `}>{element.subtitleLanguage && <CheckIcon sx={{ verticalAlign: 'middle', height: '20px' }} />}</td>
                                        </tr>


                                    </React.Fragment>
                                })}
                            </tbody>
                        </table >
                    </div>
                </section>
            </div>
        </aside>

    )
}