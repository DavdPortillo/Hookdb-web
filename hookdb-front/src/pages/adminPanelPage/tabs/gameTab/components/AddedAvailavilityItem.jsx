import style from '../css/addedItem.module.css';

export const AddedAvailavilityItem = ({data, deleteValue, type}) => {
    return (
        <div className={`${style.container} `}>
            <p>{data.name ? data.name : data.language.name }</p>
            <button className={`${style.button} `} name="platform" onClick={() => deleteValue(data, type)}>
                <img src="../../../../../../assets/global/cleanIcon.svg" alt="" height={14} width={14}/>
            </button>
        </div>
      )
    }
    