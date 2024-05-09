import { useState } from 'react';
import style from '../css/mainLists.module.css';
import { GameListStandard } from './GameListStandard';
import { ListDescription } from './ListDescription';
import { GameListMinimalist } from './GameListMinimalist';

export const MainLists = ({ listData, showCurrentList }) => {
  const [selectView, setSelectView] = useState('standard');
  const [currentFilter, setCurrentFilter] = useState('releaseDate');

 

  const handleChangeCurrentFilter = (event) => {

    setCurrentFilter(event.target.value);
  }

  const handleChangeView = (view) => {
    setSelectView(view);
  }

  return (
    <main className={`${style.listContainer} `}>
      <ListDescription selectView={selectView} handleChangeView={handleChangeView} listData={listData} handleChangeCurrentFilter={handleChangeCurrentFilter} />
      {switchView(selectView, listData.games, showCurrentList, currentFilter)}

    </main>
  )
}


const switchView = (view, listData, showCurrentList, currentFilter) => {

  switch (view) {
    case 'standard':
      return renderList(GameListStandard, listData, showCurrentList, currentFilter);
    case 'minimalist':
      return renderList(GameListMinimalist, listData, showCurrentList, currentFilter);
    default:
      throw new Error("Valor fuera de rango");

  }
}

const renderList = (Component, listData, showCurrentList, currentFilter) => {
  let numberList = 0;
  let tempListData = applyFilter(listData, currentFilter);

  return tempListData.map((gameData) => {
    numberList++;
    return <Component key={gameData.id} gameData={gameData} numberList={numberList} showCurrentList={showCurrentList} />

  });
}

const applyFilter = (listData, currentFilter) => {
  switch (currentFilter) {
    case 'releaseDate':
      return listData.sort((a, b) => b.year - a.year);

    case 'rating':
      return listData.sort((a, b) => b.rate.averageScore - a.rate.averageScore);

    case 'alphabetical':
      return listData.sort((a, b) => {

        const tempA = a.name.toLowerCase();
        const tempB = b.name.toLowerCase();
        if (tempA < tempB) return -1;
        if (tempA > tempB) return 1;
        return 0;
      });
    default:
      break;
  }
}

