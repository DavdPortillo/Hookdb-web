import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../../../context/UserContext';
import style from "../../../css/editSection.module.css";
import generalize from "../../../../../css/generalize.module.css";
import { isFieldEmpty } from '../../../../../helpers/inputValidations';
import { editNumberPlayersById } from '../../../../../helpers/dataAPI';
import { toast } from 'react-hot-toast';

export const NumberPlayersInfo = ({ endEditNumberPlayers, numberPlayersInfo, isLoadingNumberPlayersInfo }) => {
    const { user, language } = useContext(UserContext)
    const [originalInputValues, setOriginalInputValues] = useState()
    const [inputValues, setInputValues] = useState({
        name: '',
    });
    const [isModified, setIsModified] = useState(false);
    const numberPlayersTab = language.adminPanelPage.numberPlayersTab;
    const warnings = language.warnings;


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues({ ...inputValues, [name]: value });
    };

    useEffect(() => {
        setInputValues({
            name: numberPlayersInfo?.numberPlayers || '',

        });

        setOriginalInputValues({
            name: numberPlayersInfo?.numberPlayers || '',

        });

    }, [numberPlayersInfo]);

    const saveProductVendorInfo = async () => {

        if (isFieldEmpty(inputValues.name)) {
            toast.error(warnings.error.nameEmpty);
            return;
        }
        if (isNaN(inputValues.name)) {
            toast.error(warnings.error.beANumber);
            return;
        }


        try {
            await editNumberPlayersById(numberPlayersInfo.id, inputValues.name, user.accessToken,);
            toast.success(warnings.success.editNumberPlayers);
      
          } catch (err) {
            toast.error(warnings.error.numberPlayersEdit);
      
          }
    }

    useEffect(() => {
        const isModified = JSON.stringify(inputValues) !== JSON.stringify(originalInputValues);
        setIsModified(isModified);
    }, [inputValues, originalInputValues]);


    return (
        <section className={`${style.newsInfoContainer} `}>
            {
                (!isLoadingNumberPlayersInfo) &&
                <>
                    <div>
                        <div className={`${style.title} `}>
                            <h1 className={`${style.h1} `}>{numberPlayersTab.edit.title}</h1>
                            <div className={`${style.buttonActions} `}>
                                <button className={`${style.button} ${generalize.buttonStyle_active}`} onClick={endEditNumberPlayers}>{numberPlayersTab.cancelButton}</button>
                                <button className={`${style.button} ${!isModified ? generalize.buttonStyle_disabled : generalize.buttonStyle_active}`} onClick={saveProductVendorInfo} disabled={!isModified}>{numberPlayersTab.saveButton}</button>
                            </div>
                        </div>
                    </div>

                    <section className={`${style.newsInfo} `}>

                        <article className={`${style.inputInfoSection} `}>
                            <label className={`${style.inputTitle} `}>{numberPlayersTab.edit.fields.name}</label>
                            <input
                                type="text"
                                className={`${style.inputNewsSearch} `}
                                name="name"
                                value={inputValues.name}
                                onChange={handleInputChange} />
                        </article>

                    </section>

                </>
            }

        </section>
    )
}
