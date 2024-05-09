import style from '../css/vendor.module.css';
import generalize from '../../../../../css/generalize.module.css';

export const Vendor = ({ data }) => {
    return (
        <article className={`${style.vendor}`}>
            <div className={`${style.vendorSection} ${style.logoProduct}`}>
                <img src={data.logo} alt="" height={30} />
            </div>
            <div className={`${style.vendorSection} ${style.vendorName}`}>{data.vendorProduct.name}</div>
            <div className={`${style.vendorSection} ${style.regionProduct}`}>{data.regionProduct.name}</div>
            <div className={`${style.vendorSection} ${style.logoPlatform}`}>
                <img src={data.platformProduct.image} alt={data.platformProduct.alt} height={30} />
            </div>
            <div className={`${style.vendorSection} ${style.editionProduct}`}>{data.editionProduct.name}</div>
            <div className={`${style.vendorSection} ${style.keyProduct}`}>{data.keysProduct.name}</div>
            <div className={`${style.vendorSection} ${style.price}`}>{data.price} €</div>
            <div className={`${style.vendorSection} ${style.vendorLink}`}>
                <button className={`${style.vendorButton} ${generalize.buttonStyle_active} ${style.vendorButtonStyle}`}>
                    <a href={data.link}>Ir al vendedor</a>
                </button>
            </div>

        </article>
    )
} 
