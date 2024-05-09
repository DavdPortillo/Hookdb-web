import style from '../css/filtersPrices.module.css';

export const SelectFilter = ({ onfilterChange, nameOptions = null, names, filters}) => {

  const tempOptions = nameOptions();
  const {nameSelect, titleFilter} = names;

  return (
    <select className={`${style.select} ${isActive(filters[nameSelect])}`}
      name=""
      id=""
      onChange={(event) => onfilterChange(event, nameSelect)}
      value={filters[nameSelect]}>
      <option className={`${style.option} `} value=""  >{firstCharToUpperCase(titleFilter)}</option>

      {tempOptions.map(option => (<option className={`${style.option} `} key={option} value={option} >{option}</option>))} 

    </select>
  )
}

//Capitalizes the first letter of the word.
function firstCharToUpperCase(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

//Sets the background color of the button if a filter is established.
function isActive(optionSelected) {
  return optionSelected !== '' ? style.activeOption : '';
}