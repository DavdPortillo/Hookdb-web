import { Requirement } from './';

import generalTab from '../generalTab.module.css';
import requirements from '../css/requirements.module.css';
import { UserContext } from '../../../../../context/UserContext';
import { useContext } from 'react';

export const Requirements = ({ recommendRequirements, minimumRequirement }) => {
    const { language } = useContext(UserContext);
    const page = language.gameProfilePage;

    return (

        <section className={`${generalTab.section}`}>
            <h2 className={`${generalTab.title}`}>{page.generalTab.systemRequirements}</h2>
            <hr className={`${generalTab.hr}`} />
            <div className={`${requirements.requierements} `}>
                <section className={`${requirements.requirementsSection} `}>
                    <h3 className={`${requirements.subtitle} `}>{page.generalTab.minimumRequirements}</h3>
                    <div className={`${requirements.aa} `}>
                        {

                            <Requirement requirement={recommendRequirements} />

                        }
                    </div>

                </section>
                <section className={`${requirements.requirementsSection} `}>
                    <h3 className={`${requirements.subtitle} `}>{page.generalTab.recommendedRequirements}</h3>
                    <div className={`${requirements.aa} `}>
                        {

                            <Requirement requirement={minimumRequirement} />

                        }

                    </div>

                </section>
            </div>

        </section>


    )
}
