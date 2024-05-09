import { Vendor } from './';

import style from '../css/vendorResults.module.css';
import { UserContext } from '../../../../../context/UserContext';
import { useContext } from 'react';

export const VendorResults = ({ setEnabledFilters }) => {

    const data = setEnabledFilters();

    const { language } = useContext(UserContext);
    const page = language.gameProfilePage.pricesTab;

    return (

        <div className={`${style.vendor} `}>

            <section className={`${style.description} `}>
                <div className={`${style.nameColumn} ${style.firstNameColum}`}>{page.vendor}</div>
                <div className={`${style.nameColumn} `}>{page.region}</div>
                <div className={`${style.nameColumn} `}>{page.platform}</div>
                <div className={`${style.nameColumn} `}>{page.edition}</div>
                <div className={`${style.nameColumn} `}>{page.productType}</div>
                <div className={`${style.nameColumn} `}>{page.price}</div>
            </section>
            <hr className={`${style.hr} `} />

            {
                data.map(vendorData => <Vendor key={vendorData.id} data={vendorData} />)
            }
        </div>


    )
}
