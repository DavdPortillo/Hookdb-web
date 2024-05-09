import style from '../css/searchItem.module.css';

export const SearchItem = ({ data, name, addValue }) => {
    return (
        <div className={`${style.item} `}>
            <p className={`${style.itemName} `}>{data.name}</p>
            <div className={`${style.buttonContainer} `}>
                <button className={`${style.addButton} `} name={name} onClick={(event) =>addValue(data, event)}>Añadir</button>
            </div>
        </div>
    )
}
