
import generalInformation from '../generalInformation.module.css';
import generalize from '../../../../../css/generalize.module.css';

export const PersonalInfo = ({ handleChangeValue, inputValue, tabInfo }) => {
    return (


        <section className={`${generalInformation.section}`}>
            <h2 className={`${generalInformation.subtitle} `}>{tabInfo.personalInformationSection.title}</h2>
            <hr className={`${generalInformation.hr} `} />
            <div className={`${generalInformation.sectionContent} `}>
                <div className={`${generalInformation.subSection} `}>
                    <form className={`${generalInformation.form} `}>
                        <label className={`${generalInformation.label} `}>
                            {tabInfo.personalInformationSection.countryLabel}
                            <input onChange={handleChangeValue} id='country' type="text" className={`${generalize.inputTextStyle} ${generalInformation.input}`} value={inputValue.country ?? ''} />
                        </label>
                        <label className={`${generalInformation.label} `}>
                            {tabInfo.personalInformationSection.yearLabel}
                            <input onChange={handleChangeValue} id='year' type="number" min={1900} max={2099} className={`${generalize.inputTextStyle} ${generalInformation.input}`} value={inputValue.year ?? ''} />
                        </label>


                    </form>
                </div>
                <div className={`${generalInformation.subSection} `}>
                    <form className={`${generalInformation.form} `}>
                        <label className={`${generalInformation.label} `}>
                            {tabInfo.personalInformationSection.genderLabel}
                        
                            <select name="gender" id='gender' onChange={handleChangeValue} className={`${generalize.inputTextStyle} ${generalInformation.input}`} value={inputValue.gender ?? ''}>
                                <option value="male" className={`${generalInformation.option} `}>{tabInfo.personalInformationSection.genreOptions.masculine}</option>
                                <option value="female" className={`${generalInformation.option} `}>{tabInfo.personalInformationSection.genreOptions.feminine}</option>
                                <option value="other" className={`${generalInformation.option} `}>{tabInfo.personalInformationSection.genreOptions.other}</option>
                            </select>
                        </label>

                        <label className={`${generalInformation.label} `}>
                            {tabInfo.personalInformationSection.languageLabel}
                            <select name="language" id='language' onChange={handleChangeValue} className={`${generalize.inputTextStyle} ${generalInformation.input}`} value={inputValue.language}>
                                <option value="en" className={`${generalInformation.option} `}>{tabInfo.personalInformationSection.languageOptions.english}</option>
                                <option value="es" className={`${generalInformation.option} `}>{tabInfo.personalInformationSection.languageOptions.spanish}</option>
                            </select>

                        </label>
                    </form>
                </div>
            </div>
        </section>



    )
}


