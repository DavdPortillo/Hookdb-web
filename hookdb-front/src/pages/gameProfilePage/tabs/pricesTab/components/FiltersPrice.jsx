
import { SelectFilter } from './';

import style from '../css/filtersPrices.module.css'
import generalize from '../../../../../css/generalize.module.css';
import { useContext, useState } from 'react';
import { UserContext } from '../../../../../context/UserContext';

export const FiltersPrice = ({ dataGame, handleChangers, handleResetFilters, index, isSmall }) => {

  const { filters, order } = index;
  const { handleFilterChange, handleOrderChange } = handleChangers;
  const { language } = useContext(UserContext);
  const page = language.gameProfilePage.pricesTab;

  const [showFilters, setShowFilters] = useState(false)
  const changeShowFilters = () => {
    setShowFilters(!showFilters);
  }
  //Update the state of the filters
  const onfilterChange = (event, filter) => {
    handleFilterChange(filter, event.target.value);
  };

  // Fill in the <option> elements obtained from the sellers' features
  const getOptions = (filter) => {
    const uniqueNames = [];
    dataGame.forEach(item => {
      if (!uniqueNames.includes(item[filter].name)) {
        uniqueNames.push(item[filter].name);
      }
    });

    return uniqueNames;
  };

  const filtersCount = (filters) => {
    const enabledFiltersCount = Object.values(filters).filter(value => value !== '').length;

    return enabledFiltersCount > 0;
  };


  return (


    <div className={`${style.filters} `}>


      {(!isSmall) ?
        <div className={`${style.filtersSpacing} `}>
          <div className={`${style.description} `}>
            <p className={`${style.title} `}>Filtrar</p>
            <img src="../../../../../../assets/global/filterIcon.svg" alt="" height={10} />
          </div>

          <SelectFilter onfilterChange={onfilterChange} nameOptions={() => getOptions('regionProduct')} names={{ nameSelect: 'regionProduct', titleFilter: page.region }} filters={filters} />
          <SelectFilter onfilterChange={onfilterChange} nameOptions={() => getOptions('platformProduct')} names={{ nameSelect: 'platformProduct', titleFilter: page.platform }} filters={filters} />
          <SelectFilter onfilterChange={onfilterChange} nameOptions={() => getOptions('editionProduct')} names={{ nameSelect: 'editionProduct', titleFilter: page.edition }} filters={filters} />
          <SelectFilter onfilterChange={onfilterChange} nameOptions={() => getOptions('keysProduct')} names={{ nameSelect: 'keysProduct', titleFilter: page.productType }} filters={filters} />

          <select className={`${style.select} ${style.activeOption}`} onChange={(event) => handleOrderChange(event.target.value)} name="" id="" value={order}>
            <option className={`${style.option} `} value="ascendant" >{page.lowestToHighest}</option>
            <option className={`${style.option} `} value="descendant">{page.highesttoLowest}</option>
          </select>

          {
            filtersCount(filters) &&
            <button className={`${generalize.buttonStyle_active} ${style.cleanButton} `} onClick={handleResetFilters}>
              <img src="../../../../../../assets/global/cleanIcon.svg" alt="" height={15} width={15} />
            </button>
          }



        </div> :
        <button className={`${style.description} ${generalize.buttonStyle_active} ${style.isSmallDescription} `} onClick={changeShowFilters}>
          <p className={`${style.title} `}>Filtrar</p>
          <img src="../../../../../../assets/global/filterIcon.svg" alt="" height={10} />
        </button>






      }

      {
        (isSmall && showFilters) &&

        <div className={`${style.modalAside} `}>
          <button className={`${style.closeButtonAside} `} onClick={changeShowFilters}></button>
          <div className={`${style.filterContainer} `}>
            <button className={`${style.closeButtonContainer} `} onClick={changeShowFilters}>
              <img src="../../../../../../assets/global/cleanIcon.svg" alt="" height={18} />
            </button>
            <h2 className={`${style.h2} `}>Filtros</h2>
            <label className={`${style.label} `}>Región</label>
            <SelectFilter onfilterChange={onfilterChange} nameOptions={() => getOptions('regionProduct')} names={{ nameSelect: 'regionProduct', titleFilter: page.region }} filters={filters} />
            <label className={`${style.label} `}>Plataforma</label>
            <SelectFilter onfilterChange={onfilterChange} nameOptions={() => getOptions('platformProduct')} names={{ nameSelect: 'platformProduct', titleFilter: page.platform }} filters={filters} />
            <label className={`${style.label} `}>Edición</label>
            <SelectFilter onfilterChange={onfilterChange} nameOptions={() => getOptions('editionProduct')} names={{ nameSelect: 'editionProduct', titleFilter: page.edition }} filters={filters} />
            <label className={`${style.label} `}>Tipo de producto</label>
            <SelectFilter onfilterChange={onfilterChange} nameOptions={() => getOptions('keysProduct')} names={{ nameSelect: 'keysProduct', titleFilter: page.productType }} filters={filters} />

            <label className={`${style.label} `}>Orden</label>
            <select className={`${style.select} ${style.activeOption}`} onChange={(event) => handleOrderChange(event.target.value)} name="" id="" value={order}>
              <option className={`${style.option} `} value="ascendant" >{page.lowestToHighest}</option>
              <option className={`${style.option} `} value="descendant">{page.highesttoLowest}</option>
            </select>

            {
              filtersCount(filters) &&
              <button className={`${generalize.buttonStyle_active} ${style.cleanButton} `} onClick={handleResetFilters}>
                <img src="../../../../../../assets/global/cleanIcon.svg" alt="" height={15} width={15} />
              </button>
            }
          </div>
        </div>
      }

    </div>

  )
}


