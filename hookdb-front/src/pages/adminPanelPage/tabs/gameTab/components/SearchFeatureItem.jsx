import { useState } from 'react';
import style from '../css/searchItem.module.css';

export const SearchFeatureItem = ({ data }) => {
    const [inputValue, setInputValue] = useState('');

    const changeInputValue = (event) => {
        setInputValue(event.target.value)
    }

    return (
        <div className={`${style.item} `}>
            <p className={`${style.itemName} `}>{data.name}</p>
            <p className={`${style.itemName} `}>{data.id}</p>
        </div>
    )
}
