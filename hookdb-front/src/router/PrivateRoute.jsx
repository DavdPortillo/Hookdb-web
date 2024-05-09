import { Navigate } from "react-router-dom";

import { getDataFromLocalStorage } from "../helpers/localStorageData"

export const PrivateRoute = ({ children }) => {

  const token = getDataFromLocalStorage();

  return (
    token ? children : <Navigate to="/"/>  
  )
}
