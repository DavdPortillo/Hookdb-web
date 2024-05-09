import { useContext } from 'react';
import { UserContext } from '../../../../../context/UserContext';
import generalTab from '../generalTab.module.css';

export const GeneralInformation = () => {

    const { language } = useContext(UserContext);
    const page = language.gameProfilePage;

    return (

        <section className={`${generalTab.section}`}>
            <h2 className={`${generalTab.title}`}>{page.generalTab.generalInformation}</h2>
            <hr className={`${generalTab.hr}`} />
        </section>

    )
}
