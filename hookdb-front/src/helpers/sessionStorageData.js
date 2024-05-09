export const getDataFromSessionStorage = () =>{
    return JSON.parse(sessionStorage.getItem('token'));
}

export const setDatatoSessionStorage = (key, value) =>{
    sessionStorage.setItem(key, value);
}
