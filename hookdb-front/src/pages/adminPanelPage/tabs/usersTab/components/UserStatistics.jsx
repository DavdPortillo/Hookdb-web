import style from '../css/userStadistics.module.css';

export const UserStatistics = () => {


/*     const calculateUserLastMonth = () => {
        const currentDate = new Date();
        const tempUsers = [...users];
        tempUsers.forEach(user => user.date = new Date(user.date));

        return tempUsers.filter(user => user.date.getMonth() === currentDate.getMonth()).length;
    } */

    return (

        <div className={`${style.stadistics} `}>
            <h1 className={`${style.h1} `}>Estadísticas</h1>

            <section >

                <div className={`${style.subscriberContainer} `}>

                    <div className={`${style.information} `}>
                        <h3 className={`${style.informationResult} `}>WAKALA</h3>
                        <h2 className={`${style.informationDescription} `}>Usuarios </h2>
                    </div>
                    <div className={`${style.information} `}>
                        <h3 className={`${style.informationResult} `}>{/* {calculateUserLastMonth() */}</h3>
                        <h2 className={`${style.informationDescription} `}>Usuarios este mes</h2>
                    </div>

                </div>
            </section>
        </div>




    )
}
