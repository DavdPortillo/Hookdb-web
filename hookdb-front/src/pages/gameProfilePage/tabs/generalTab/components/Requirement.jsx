import { useContext } from 'react';
import { UserContext } from '../../../../../context/UserContext';
import style from '../css/requirement.module.css';

export const Requirement = ({ requirement }) => {
    const { language } = useContext(UserContext);
    const page = language.gameProfilePage.generalTab;

    return (
        <>
            <div className={`${style.requirementContainer} `}>

                <h4 className={`${style.text} ${style.description}`}>{page.operatingSystem}</h4>
                <p className={`${style.text} `}>{requirement.operatingSystem}</p>
            </div>

            <div className={`${style.requirementContainer} `}>
                <h4 className={`${style.text} ${style.description}`}>{page.processor}</h4>
                <p className={`${style.text} `}>{requirement.processor}</p>
            </div>
            <div className={`${style.requirementContainer} `}>
                <h4 className={`${style.text} ${style.description}`}>{page.RAM}</h4>
                <p className={`${style.text} `}>{requirement.ram}</p>
            </div>
            <div className={`${style.requirementContainer} `}>
                <h4 className={`${style.text} ${style.description}`}>{page.graphics}</h4>
                <p className={`${style.text} `}>{requirement.graphicsCard}</p>
            </div>
            <div className={`${style.requirementContainer} `}>
                <h4 className={`${style.text} ${style.description}`}>{page.directX}</h4>
                <p className={`${style.text} `}>{requirement.directX}</p>
            </div>
            <div className={`${style.requirementContainer} `}>
                <h4 className={`${style.text} ${style.description}`}>{page.storage}</h4>
                <p className={`${style.text} `}>{requirement.storage}</p>
            </div>
        </>
    )

}
