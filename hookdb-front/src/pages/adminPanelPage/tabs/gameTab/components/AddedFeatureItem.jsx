import style from '../css/addedItem.module.css';


export const AddedFeatureItem = ({data, deleteValue, type}) => {


return (
    <div className={`${style.container} `}>
        <p>{data.featureName} {data.playersNumber != 0 && `[${data.numberPlayerId}]`}</p>
        <button className={`${style.button} `} name="platform" onClick={() => deleteValue(data, type)}>
            <img src="../../../../../../assets/global/cleanIcon.svg" alt="" height={14} width={14}/>
        </button>
    </div>
  )
}
