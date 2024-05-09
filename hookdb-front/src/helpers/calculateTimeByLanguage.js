export const calculateTime = (value, date) =>{
    if(value === "es"){
        return calculateTimeES(date)
    }else{
        return calculateTimeEN(date)
    }
}

const calculateTimeES = (date) => {
    const newsDate = new Date(date);
    const currentDate = new Date();
    const time = Math.floor((currentDate - newsDate) / 60000);

    if (time < 60) {
        return `Hace ${time} minutos`;
    } else if (time < 1440) {
        return formatTimeES(time, 60, 'hora');
    } else if (time < 44640) {
        return formatTimeES(time, 1440, 'día');
    } else if (time < 525600) {
        return formatTimeES(time, 44640, 'mes');
    } else { 
        return formatTimeES(time, 525600, 'año');
    }
}

const formatTimeES = (time, divisor, unit) => {
    const value = Math.floor(time / divisor);
    return `Hace ${value} ${unit}${value === 1 ? '' : setPluralStringES(unit)}`;
}

const setPluralStringES = (unit) =>{
    return (unit === 'mes') ? 'es' : 's'; 
}

const calculateTimeEN = (date) => {
    const newsDate = new Date(date);
    const currentDate = new Date();
    const time = Math.floor((currentDate - newsDate) / 60000);

    if (time < 60) {
        return `${time} minutes ago`;
    } else if (time < 1440) {
        return formatTimeEN(time, 60, 'hour');
    } else if (time < 44640) {
        return formatTimeEN(time, 1440, 'day');
    } else if (time < 525600) {
        return formatTimeEN(time, 44640, 'month');
    } else { 
        return formatTimeEN(time, 525600, 'year');
    }
}

const formatTimeEN = (time, divisor, unit) => {
    const value = Math.floor(time / divisor);
    return `${value} ${unit}${value === 1 ? '' : 's'} ago`;
}


