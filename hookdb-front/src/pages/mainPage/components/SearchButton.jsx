
import style  from "../css/searchButton.module.css";

export const SearchButton = ({handleClickShowSearcher}) => {
    return (
        <button className={`${style.searcher} `} onClick={handleClickShowSearcher}>
            <img src="../../../../assets/global/searchIcon.svg" alt="" height={18} width={18} />
        </button>
    )
}
