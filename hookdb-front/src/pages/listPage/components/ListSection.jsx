import { useContext } from 'react';
import style from '../css/listsSection.module.css';
import { UserContext } from '../../../context/UserContext';

export const ListSection = ({renderList, isLoadingList}) => {

    const { language } = useContext(UserContext);
    const listPage = language.listPage;

    return (
        <div className={`${style.listsSection} `}>
            <h2 className={`${style.h2} `}>{listPage.subtitle}</h2>
            <div className={`${style.listsContainer} `}>
                {!isLoadingList && renderList()}
            </div>
        </div>
    )
}
