import { useContext } from 'react';
import style from '../css/sinopsis.module.css';
import generalTab from '../generalTab.module.css';
import { UserContext } from '../../../../../context/UserContext';

export const Sinopsis = ({ sinopsis }) => {

    const { language } = useContext(UserContext);
    const page = language.gameProfilePage;

    return (

        <section className={`${generalTab.section}`}>
            <h2 className={`${generalTab.title}`}>{page.generalTab.sipnosis}</h2>
            <hr className={`${generalTab.hr}`} />
            <p className={`${style.paragraph}`}>{sinopsis}</p>
        </section>

    )
}
