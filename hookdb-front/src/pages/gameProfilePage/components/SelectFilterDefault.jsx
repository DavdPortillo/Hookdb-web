import style from '../css/selectFilterDefault.module.css';

export const SelectFilterDefault = ({ onfilterChange, nameOptions = null, names, filters}) => {

  const {nameSelect, titleFilter} = names;

  return (
    <select className={`${style.select} ${isActive(filters[nameSelect])}`}
      name=""
      id=""
      onChange={(event) => onfilterChange(event, nameSelect)}
      value={filters[nameSelect]}>
      <option className={`${style.option} `} value=""  >{firstCharToUpperCase(titleFilter)}</option>

      {Object.entries(nameOptions).map(([key, value]) => (
        <option className={`${style.option} `} key={key} value={key}>{value}</option>
      ))}
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