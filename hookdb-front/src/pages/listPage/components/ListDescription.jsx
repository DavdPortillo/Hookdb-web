import style from '../css/listDescription.module.css';
import generalize from '../../../css/generalize.module.css';
import { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';


export const ListDescription = ({ selectView, handleChangeView, listData, handleChangeCurrentFilter }) => {

    const { language } = useContext(UserContext);
    const listPage = language.listPage;

    return (
        <section>
            <h2 className={`${style.h2} `}>{listData.name}</h2>
            <textarea className={`${generalize.inputTextStyle} ${style.textAreaText} `} type="text" placeholder={listPage.listDescription.description} rows="2"></textarea>
            <div className={`${style.configurationList} `}>
                <div className={`${style.dateList} `}>
                    <p className={`${style.p} `}>{listPage.listDescription.dateCreated}: {calculateDate(listData.date)}</p>
                    <p className={`${style.p} ${style.barSeparator}`}>|</p>
                    <p className={`${style.p} `}>{listPage.listDescription.lastModified}: hace 43 minutos</p>
                </div>
                <div className={`${style.orderList} `}>
                    <div className={`${style.viewContainer} `}>
                        <button className={`${generalize.buttonStyle_active} ${style.view} ${selectView === 'standard' && style.viewSelected}`} onClick={() => handleChangeView('standard')}>
                            <img src="../../../../assets/global/standardCardView.svg" alt="" height={15} width={15} />
                        </button>
                        <button className={`${generalize.buttonStyle_active} ${style.view} ${selectView === 'minimalist' && style.viewSelected}`} onClick={() => handleChangeView('minimalist')}>
                            <img src="../../../../assets/global/minimalistCardView.svg" alt="" height={15} width={15} />
                        </button>
                    </div>
                    <select name="" id="" className={`${style.select} `} onChange={handleChangeCurrentFilter}>
                        <option className={`${style.option} `} value="releaseDate">{listPage.filterOptions.releaseDate}</option>
                        <option className={`${style.option} `} value="rating">{listPage.filterOptions.rating}</option>
                        <option className={`${style.option} `} value="alphabetical">{listPage.filterOptions.alphabetical}</option>
                    </select>
                </div>
            </div>
        </section>
    )
}

const calculateDate = (dateValue) => {
    const date = new Date(dateValue);

    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    return `${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`
}