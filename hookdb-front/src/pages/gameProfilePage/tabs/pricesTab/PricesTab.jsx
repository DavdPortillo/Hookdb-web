import { useState } from "react";

import { FiltersPrice, VendorResults, NotResults } from "./components";
import { useMediaQuery } from "react-responsive";

const defaultFilters = {
  regionProduct: '',
  platformProduct: '',
  editionProduct: '',
  keysProduct: '',
};

const defaultOrderPrice = 'ascendant';

export const PricesTab = ({ dataGame }) => {

  const [filters, setFilters] = useState(defaultFilters)
  const [order, setOrder] = useState(defaultOrderPrice)
  const isSmall = useMediaQuery({ maxWidth: 992 });

  //TODO metodos pricesTab y filterTab son iguales
  //Change the state of the filter passed as a parameter.
  const handleFilterChange = (filterName, newValue) => {

    setFilters(prevFilter => ({
      ...prevFilter,
      [filterName]: newValue
    }));

  };



  //Establish the order of the sellers.
  const handleOrderChange = (newValue) => {
    setOrder(newValue)
  };

  //Reset the values of the filters state.
  const handleResetFilters = () => {
    setFilters(defaultFilters);
  };

  //Retrieve those sellers that meet the conditions of the filters and sort them.
  const setEnabledFilters = () => {
    let resultElements = dataGame;

    for (const key in filters) {
      if (filters[key]) {
        resultElements = resultElements.filter(element => {

          return element[key].name === filters[key];
        })

      }
    }

    resultElements = sortPricesBy(resultElements, order)

    return resultElements;
  };


  return (
    <>
      {dataGame.length !== 0 ?
        <>
          <FiltersPrice dataGame={dataGame} handleChangers={{ handleFilterChange, handleOrderChange }} handleResetFilters={handleResetFilters} index={{ filters, order }} isSmall={isSmall}/>
          <VendorResults setEnabledFilters={setEnabledFilters} />
        </>
        : <NotResults />}


    </>
  )
}


//Retrieve those sellers that meet the conditions of the filters and sort them.
function sortPricesBy(vendorResults, order) {
  let tempResult = [];


  switch (order) {
    case 'ascendant':
      tempResult = vendorResults.sort((a, b) => a.price - b.price);
      break;
    case 'descendant':
      tempResult = vendorResults.sort((a, b) => b.price - a.price);
      break;
    default:
      throw new Error('Caso fuera de rango');
  }

  return tempResult;
}