import { Link } from 'react-router-dom';

import style from '../css/footer.module.css';
import { UserContext } from '../../../context/UserContext';
import { useContext } from 'react';

export const Footer = () => {

    const { language } = useContext(UserContext);
/*     const page = language.footer;
 */
    return (
        <>
            <div className={`${style.gridLine} `} />
            <footer className={`${style.footer} `}>
                <div className={`${style.footerContainer} `}>
                    <section className={`${style.socialNetworks} `}>
                        <Link className={`${style.socialNetworksItem} `}>
                            <img src="../../../../assets/global/socialNetwork/youtubeIcon.svg" alt="" height={40} />
                        </Link>
                        <Link className={`${style.socialNetworksItem} `}>
                            <img src="../../../../assets/global/socialNetwork/twitterIcon.svg" alt="" height={40} />
                        </Link>
                        <Link className={`${style.socialNetworksItem} `}>
                            <img src="../../../../assets/global/socialNetwork/instagramIcon.svg" alt="" height={40} />
                        </Link>

                    </section>
{/* 
                    <section>
                        <p className={`${style.rigthText} `}>{page.copyright}</p>
                    </section> */}
                </div>

            </footer>
        </>
    )
}
