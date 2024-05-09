export const getDataFromLocalStorage = () =>{
    return JSON.parse(localStorage.getItem('token'));
}

export const removeLocalStorage = (key) => {
    localStorage.removeItem(key);
};
