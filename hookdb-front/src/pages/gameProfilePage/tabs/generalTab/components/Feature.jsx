import aside from '../css/aside.module.css';

export const Feature = ({ featureData }) => {
    return (

        <article className={`${aside.aa} `}>
            <div className={`${aside.image} `}>
                <img src={featureData.url} alt="" height={featureData.height} width={featureData.width} />
            </div>
            <h4 className={`${aside.description} `}>{featureData.featureName} {hasAmount(featureData.numberPlayerId)} </h4>
        </article>


    )
}

//Displays the number of results on this tab if they exist
const hasAmount = (amount) => {
    return (amount) && <span>&nbsp;[{amount}]</span>;
};