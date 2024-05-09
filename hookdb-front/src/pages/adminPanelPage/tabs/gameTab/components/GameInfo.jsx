import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../../context/UserContext";
import toast from "react-hot-toast";
import style from "../../../css/editSection.module.css";
import generalize from '../../../../../css/generalize.module.css';
import { SearchItem } from "./SearchItem";
import { AddedItem } from "./AddedItem";
import { SearchFeatureItem } from "./SearchFeatureItem";
import { AddedFeatureItem } from "./AddedFeatureItem";
import { AddedAvailavilityItem } from "./AddedAvailavilityItem";
import { generateKey } from "../../../../../helpers/composeText";
import { AddedProductItem } from "./AddedProductItem";
import { editGameById, findDeveloperByName, findDistributorByName, findFeatureByName, findGenreByName, findLanguageByName, findPlatformByName, findProductEditionByName, findProductKeyByName, findProductPlatformByName, findProductRegionByName, findProductVendorByName, getFeatureById, getLanguageById } from "../../../../../helpers/dataAPI";
import { isFieldEmpty } from "../../../../../helpers/inputValidations";

const translation = {
    image: 'image',
    alt: 'alt',
    title: 'title',
    trailer: 'trailer',
    storyTime: 'story time',
    completeTime: 'complete time',
    sinopsis: 'sinopsis',
    platform: 'platform',
    genre: 'genre',
    date: 'date',
    developer: 'developer',
    distributor: 'distributor',
    minimumProcessor: 'processor [Minimun requirements]',
    minimumRam: 'RAM [Minimun requirements]',
    minimumGraphicsCard: 'graphics card [Minimun requirements]',
    minimumDirectX: 'direct X [Minimun requirements]',
    minimumStorage: 'storage [Minimun requirements]',
    minimumOperatingSystem: 'perating system [Minimun requirements]',
    recommendedProcessor: 'processor [Recommended requirements]',
    recommendedRam: 'RAM [Recommended requirements]',
    recommendedGraphicsCard: 'graphics card [Recommended requirements]',
    recommendedDirectX: 'direct X [Recommended requirements]',
    recommendedStorage: 'storage [Recommended requirements]',
    recommendedOperatingSystem: 'Operating system [Recommended requirements]',
    feature: 'feature',
    availability: 'availability',
    role: 'crossplay',
    language: 'language'
}
export const GameInfo = ({ endEditGame, gameInfo, isLoadingGameInfo }) => {
    const [isModified, setIsModified] = useState(false);
    const [gameId, setGameId] = useState(null)
    const { user, language } = useContext(UserContext)
    const [inputValues, setInputValues] = useState({
        image: '',
        alt: '',
        title: '',
        trailer: '',
        storyTime: '',
        completeTime: '',
        sinopsis: '',
        platform: '',
        genre: '',
        date: '',
        developer: '',
        distributor: '',
        minimumProcessor: '',
        minimumRam: '',
        minimumGraphicsCard: '',
        minimumDirectX: '',
        minimumStorage: '',
        minimumOperatingSystem: '',
        recommendedProcessor: '',
        recommendedRam: '',
        recommendedGraphicsCard: '',
        recommendedDirectX: '',
        recommendedStorage: '',
        recommendedOperatingSystem: '',
        feature: '',
        availability: '',
        productEdition: '',
        productRegion: '',
        productKey: '',
        productVendor: '',
        idProduct: '',
        crossplay: '',
        language: ''
    });
    const [showChangeImage, setShowChangeImage] = useState(false)
    const [userImage, setUserImage] = useState(null)
    const gameTab = language.adminPanelPage.gameTab;
    const [searchResults, setSearchResults] = useState(null);
    const [inputValuesTags, setInputValuesTags] = useState({
        platform: [],
        genre: [],
        developer: [],
        distributor: [],
        feature: [],
        availability: [],
        product: []
    });
    const [currentName, setCurrentName] = useState(null);
    const [inputValuesComplex, setInputValuesComplex] = useState({
        platform: '',
        genre: '',
        developer: '',
        distributor: '',
        feature: '',
        availability: '',
        productEdition: '',
        productRegion: '',
        productKey: '',
        idProduct: '',
        productVendor: ''
    })
    const warnings = language.warnings;

    useEffect(() => {
        setGameId(gameInfo?.game.id)
    }, [gameInfo])

    useEffect(() => {
        let tempData = [];
        gameInfo?.game?.products.map((element) => {
            tempData.push({
                id: generateKey(),
                idProductEdition: element.editionProduct.id,
                idProductPlatform: element.platformProduct.id,
                idProductVendor: element.vendorProduct.id,
                idProductRegion: element.regionProduct.id,
                idProductKey: element.keysProduct.id,
                price: element.price,
                link: element.link
            });
        });

        setInputValues({
            image: gameInfo?.game?.cover || '',
            alt: gameInfo?.game?.alt || '',
            title: gameInfo?.game?.title || '',
            trailer: gameInfo?.game?.trailer || '',
            storyTime: gameInfo?.game?.storyTime || '',
            completeTime: gameInfo?.game?.completeTime || '',
            sinopsis: gameInfo?.game?.sinopsis || '',
            date: gameInfo?.game?.date || '',
            language: gameInfo?.game?.translation.id || '',
            minimumProcessor: gameInfo?.game?.minimumSystemRequirement.processor || '',
            minimumRam: gameInfo?.game?.minimumSystemRequirement.ram || '',
            minimumGraphicsCard: gameInfo?.game?.minimumSystemRequirement.graphicsCard || '',
            minimumDirectX: gameInfo?.game?.minimumSystemRequirement.directX || '',
            minimumStorage: gameInfo?.game?.minimumSystemRequirement.storage || '',
            minimumOperatingSystem: gameInfo?.game?.minimumSystemRequirement.operatingSystem || '',
            recommendedProcessor: gameInfo?.game?.recommendedSystemRequirement.processor || '',
            recommendedRam: gameInfo?.game?.recommendedSystemRequirement.ram || '',
            recommendedGraphicsCard: gameInfo?.game?.recommendedSystemRequirement.graphicsCard || '',
            recommendedDirectX: gameInfo?.game?.recommendedSystemRequirement.directX || '',
            recommendedStorage: gameInfo?.game?.recommendedSystemRequirement.storage || '',
            recommendedOperatingSystem: gameInfo?.game?.recommendedSystemRequirement.operatingSystem || '',
            crossplay: (gameInfo?.game?.crossplay.hasCrossplay == true ? 1 : 2),
        });


        setInputValuesTags({
            platform: gameInfo?.game?.platforms || [],
            genre: gameInfo?.game?.genres || [],
            developer: gameInfo?.game?.developers || [],
            distributor: gameInfo?.game?.distributors || [],
            feature: gameInfo?.game?.gameFeatures || [],
            availability: gameInfo?.game?.availabilities || [],
            product: tempData

        })
        setInputValues((prevState) => {
            const tempPrevState = {
                ...prevState,
                platform: gameInfo?.game?.platforms.map(element => element.id).join(",") || '',
                genre: gameInfo?.game?.genres.map(element => element.id).join(",") || '',
                developer: gameInfo?.game?.developers.map(element => element.id).join(",") || '',
                distributor: gameInfo?.game?.distributors.map(element => element.id).join(",") || '',
                feature: gameInfo?.game?.gameFeatures || [],
                availability: gameInfo?.game?.availabilities || [],
                product: tempData
            }
            return tempPrevState;
        })

        setUserImage(gameInfo?.game.cover)
    }, [gameInfo]);





    useEffect(() => {
        if (gameInfo?.game) {
            setInputValues((prevState) => {
                const tempPrevState = {
                    ...prevState,
                    platform: inputValuesTags.platform.map(element => element.id).join(",") || '',
                    genre: gameInfo?.game?.genres.map(element => element.id).join(",") || '',
                    developer: gameInfo?.game?.developers.map(element => element.id).join(",") || '',
                    distributor: gameInfo?.game?.distributors.map(element => element.id).join(",") || '',
                    feature: gameInfo?.game?.gameFeatures || [],
                    availability: gameInfo?.game?.availabilities || [],
    /*                 product: tempData
     */            }
                return tempPrevState;
            })
        }

    }, [inputValuesTags])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues({ ...inputValues, [name]: value });
    };

    const handleInputComplexChange = (e) => {
        const { name, value } = e.target;
        setInputValuesComplex({ ...inputValuesComplex, [name]: value });
    };

    const saveGameInfo = async () => {
/*         if (!validations()) return; //TODO
 */
        const formData = new FormData();
        formData.append('game.title', inputValues.title);
        formData.append('game.alt', inputValues.alt);
        formData.append('game.date', inputValues.date);
        formData.append('game.trailer', inputValues.trailer);
        formData.append('game.storyTime', inputValues.storyTime);
        formData.append('game.completeTime', inputValues.completeTime);
        formData.append('game.sinopsis', inputValues.sinopsis);
        formData.append('file', inputValues.image);
        formData.append('platformIds', inputValues.platform);
        formData.append('crossplayId', inputValues.crossplay);
        formData.append('genreIds', placeInfo('genre'));
        formData.append('developerIds', placeInfo('developer'));
        formData.append('distributorIds', placeInfo('distributor'));

        formData.append('minimumSystemRequirement.operatingSystem', inputValues.minimumOperatingSystem);
        formData.append('minimumSystemRequirement.processor', inputValues.minimumProcessor);
        formData.append('minimumSystemRequirement.ram', inputValues.minimumRam);
        formData.append('minimumSystemRequirement.graphicsCard', inputValues.minimumGraphicsCard);
        formData.append('minimumSystemRequirement.directX', inputValues.minimumDirectX);
        formData.append('minimumSystemRequirement.storage', inputValues.minimumStorage);

        formData.append('recommendedSystemRequirement.operatingSystem', inputValues.recommendedOperatingSystem);
        formData.append('recommendedSystemRequirement.processor', inputValues.recommendedProcessor);
        formData.append('recommendedSystemRequirement.ram', inputValues.recommendedRam);
        formData.append('recommendedSystemRequirement.graphicsCard', inputValues.recommendedGraphicsCard);
        formData.append('recommendedSystemRequirement.directX', inputValues.recommendedDirectX);
        formData.append('recommendedSystemRequirement.storage', inputValues.recommendedStorage);

        inputValuesTags.feature.map((element, index) => {
            if (element?.newValue) {
                formData.append(`gameFeatures[${index}].featureId`, element.feature.id)
                formData.append(`gameFeatures[${index}].numberPlayerId`, element.numberPlayerId)
            } else {
                formData.append(`gameFeatures[${index}].id`, element.id)
                formData.append(`gameFeatures[${index}].featureId`, element.feature.id)
                formData.append(`gameFeatures[${index}].numberPlayerId`, element.numberPlayerId)
            }

        })

        inputValuesTags.availability.map((element, index) => {
            if (element?.newValue) {
                formData.append(`availabilities[${index}].languageId`, element.id)
                formData.append(`availabilities[${index}].interfaceLanguage`, element.interfaceLanguage)
                formData.append(`availabilities[${index}].subtitleLanguage`, element.subtitleLanguage)
                formData.append(`availabilities[${index}].audioLanguage`, element.audioLanguage)

            }else{
                formData.append(`availabilities[${index}].id`, element.id)
                formData.append(`availabilities[${index}].languageId`, element.language.id)
                formData.append(`availabilities[${index}].interfaceLanguage`, element.interfaceLanguage)
                formData.append(`availabilities[${index}].subtitleLanguage`, element.subtitleLanguage)
                formData.append(`availabilities[${index}].audioLanguage`, element.audioLanguage)
            }

        })


        inputValuesTags.product.map((element, index) => {
            formData.append(`products[${index}].price`, element.price)
            formData.append(`products[${index}].link`, element.link)
            formData.append(`products[${index}].editionProductId`, element.idProductEdition)
            formData.append(`products[${index}].platformProductId`, element.idProductPlatform)
            formData.append(`products[${index}].vendorProductId`, element.idProductVendor)
            formData.append(`products[${index}].regionProductId`, element.idProductRegion)
            formData.append(`products[${index}].keysProductId`, element.idProductKey)
        })

        /*         formData.append(`saga.id`, 4)
         */
        formData.append(`saga.name`, 'Los tontiCampos');


        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });
        await editGameById(gameInfo.game.id, formData, user.accessToken);
    }

    const validations = () => {
        const hasEmptyField = Object.keys(inputValues).some(key => {
            if (isFieldEmpty(inputValues[key])) {
                toast.error(`El campo ${translation[key]} no puede estar vacío`);
                return true;
            }
            return false;
        });

        return !hasEmptyField;
    }

    const placeInfo = (field) => {
        let tempValues = '';
        inputValuesTags[field].map((item, index) => {
            if (index != 0) {
                tempValues += `,${item.id}`;
            } else {
                tempValues += item.id;
            }
        });

        return tempValues;
    }

    const showChangeImageEnabled = () => {
        setShowChangeImage(true)
    }

    const showChangeImageDisabled = () => {
        setShowChangeImage(false)
    }

    const handleProfileImageChange = (event) => {

        const file = event.target.files[0];
        setInputValues({ ...inputValues, image: file });
        setUserImage(URL.createObjectURL(file))
    };

    const searchPlatform = async (event) => {
        search(event, findPlatformByName)
    }

    const searchGenre = async (event) => {
        search(event, findGenreByName)
    }
    const searchDeveloper = async (event) => {
        search(event, findDeveloperByName)
    }

    const searchDistributor = async (event) => {
        search(event, findDistributorByName)
    }

    const searchFeature = async (event) => {
        search(event, findFeatureByName)

    }

    const searchProductPlatform = async (event) => {
        search(event, findProductPlatformByName)

    }

    const searchProductVendor = async (event) => {
        search(event, findProductVendorByName)

    }

    const searchProductEdition = (event) => {
        search(event, findProductEditionByName);
    }
    const searchProductKey = (event) => {
        search(event, findProductKeyByName);
    }
    const searchProductRegion = (event) => {
        search(event, findProductRegionByName);
    }

    const writeAvailability = async (event) => {
        search(event, findLanguageByName)
    }

    const search = async (event, APIMethod) => {
        const searchText = event.target.value;
        handleInputComplexChange(event)
        let tempFetchData;
        let fetchData;
        if (searchText !== '') {
            tempFetchData = await APIMethod(searchText, user.accessToken);
            fetchData = (tempFetchData.length > 5) ? tempFetchData.slice(0, 5) : tempFetchData;

        } else {
            fetchData = null;
        }
        setSearchResults({ [event.target.name]: fetchData });
    }


    const addValue = (data, event) => {
        let tempType;
        const name = event.target.name;
        let newState;
        setInputValuesTags(prevState => {

            newState = { ...prevState };

            if (newState?.[name] && !newState?.[name].some(obj => obj.id == data.id)) {
                tempType = { [name]: [...prevState[name], data] };
            } else if (!newState?.[name]) {
                tempType = { [name]: data }
            }
            setCurrentName(name)
            return { ...prevState, ...tempType }

        })


    }



    const deleteValue = (data, type) => {

        const tempValues = inputValuesTags[type].filter(item => item.id !== data.id);
        setInputValuesTags(prevState => ({
            ...prevState,
            [type]: tempValues
        }));

    }



    useEffect(() => {
        let tempValues = '';

        if (currentName && inputValuesTags[currentName]) {
            inputValuesTags[currentName].map((item, index) => {
                if (index != 0) {
                    tempValues += `,${item.id}`;
                } else {
                    tempValues += item.id;
                }
            });

            setInputValues(prevState => {

                return { ...prevState, [currentName]: tempValues }

            })
        }
    }, [inputValuesTags, currentName]);


    const addAvailability = async (event) => {
        let tempType;
        const name = event.target.name;
        let newState;
        const availability = document.getElementById('availability');
        const interfaceValue = document.getElementById('interface').value;
        const subtitleValue = document.getElementById('subtitle').value;
        const audioValue = document.getElementById('audio').value;

        const values = [availability, interfaceValue, subtitleValue, audioValue]

        let isFilled = true;
        let isExist = true;
        values.some(value =>{
            if(value == ''){
                toast.error(warnings.error.allFieldsFilled);
                isFilled = false;
            }
        })

        if(!isFilled) return

        let fetchAvailability;
        try{
            fetchAvailability = await getLanguageById(availability.value, user.accessToken);
            if(fetchAvailability == '') throw new Error;
        }catch(error){
            isExist = false;
            console.error("Language not exist")
            toast.error(warnings.error.languageNotExist)
        }

        if(!isExist) return;
        const tempData = {
            id: availability.value,
            name: fetchAvailability.name,
            interfaceLanguage: interfaceValue,
            subtitleLanguage: subtitleValue,
            audioLanguage: audioValue,
            newValue: true
        };
        setInputValuesTags(prevState => {
            newState = { ...prevState };


            if (newState?.[name] && !newState?.[name].some(obj => obj.availability == name)) {
                tempType = { [name]: [...prevState[name], tempData] };
            } else if (!newState?.[name]) {
                tempType = { [name]: [tempData] }
            }
            setCurrentName(name)
            return { ...prevState, ...tempType }

        })

        document.getElementById('availability').value = '';
        document.getElementById('interface').value = '';
        document.getElementById('subtitle').value = '';
        document.getElementById('audio').value = '';

    }

    const addFeature = async (event) => {
        let tempType;
        const name = event.target.name;
        let newState;
        const idFeature = document.getElementById('idFeature');
        const idPlayers = document.getElementById('idPlayers');

        const values = [idFeature.value, idPlayers.value];

        let isFilled = true;
        let isExist = true;
        
        values.some(value =>{
            if(value == ''){
                toast.error(warnings.error.allFieldsFilled);
                isFilled = false;
            }
        })

        if(!isFilled) return 

        let feature;
        try{
            const feature = await getFeatureById(idFeature.value, user.accessToken);
            if(feature == '') throw new Error;

        }catch(error){
            isExist = false;
            console.error("Feature not exist")
            toast.error(warnings.error.featureNotExist)
        }

        if(!isExist) return;
        
        const tempData = {
            feature: { id: feature.id, name: feature.name },
            featureName: feature.name,
            numberPlayerId: idPlayers.value,
            newValue: true
        }; setInputValuesTags(prevState => {
            newState = { ...prevState };


            if (newState?.[name] && !newState?.[name].some(obj => obj.feature.id == tempData.feature.id)) {
                tempType = { [name]: [...prevState[name], tempData] };
            } else if (!newState?.[name]) {
                tempType = { [name]: tempData }
            }
            setCurrentName(name)
            return { ...prevState, ...tempType }

        })

    }



    const addProduct = async (event) => {
        let tempType;
        const name = event.target.name;
        let newState;

        const idProduct = document.getElementById('idProduct');
        const idProductEdition = document.getElementById('productEdition');
        const idProductPlatform = document.getElementById('productPlatform');
        const idProductVendor = document.getElementById('productVendor');
        const idProductRegion = document.getElementById('productRegion');
        const idProductKey = document.getElementById('productKey');
        const price = document.getElementById('price');
        const link = document.getElementById('link');

        const values = [idProduct.value, idProductEdition.value, idProductPlatform.value, idProductVendor.value, idProductRegion.value, idProductKey.value, price.value, link.value];
        
        let isFilled = true;
        values.some(value =>{
            if(value == ''){
                toast.error(`Todos lo campos deben estar rellenados`);
                isFilled = false;
            }
        })

        if(!isFilled) return;

        const tempData = {
            id: idProduct.value,
            idProductEdition: idProductEdition.value, idProductPlatform: idProductPlatform.value, idProductVendor: idProductVendor.value,
            idProductRegion: idProductRegion.value, idProductKey: idProductKey.value, price: price.value, link: link.value
        };
        setInputValuesTags(prevState => {
            newState = { ...prevState };


            if (newState?.[name] && !newState?.[name].some(obj => obj.id == tempData.id)) {
                tempType = { [name]: [...prevState[name], tempData] };
            } else if (!newState?.[name]) {
                tempType = { [name]: tempData }
            }
            setCurrentName(name)
            return { ...prevState, ...tempType }

        })


        setInputValuesComplex(prevState => {
            const newState = {
                ...prevState, idProduct: '', productEdition: '', productPlatform: '', productVendor: '', productRegion: '', productKey: '', price: '', link: ''
            }

            return newState;
        })


    }







    return (
        <section className={`${style.newsInfoContainer} `}>
            {
                (!isLoadingGameInfo) &&
                <>
                    <div>
                        <div className={`${style.title} `}>
                            <h1 className={`${style.h1} `}>AAA</h1>
                            <div className={`${style.buttonActions} `}>
                                <button className={`${style.button} ${generalize.buttonStyle_active}`} onClick={endEditGame}>AAA</button>
                                <button className={`${style.button} ${!isModified ? generalize.buttonStyle_disabled : generalize.buttonStyle_active}`} onClick={saveGameInfo} /* disabled={!isModified} */>AAA</button>
                            </div>
                        </div>
                    </div>
                    <section className={`${style.newsInfo} `}>
                    
                        <article className={`${style.imageInfo} `}>
                            <div className={`${style.imageNewsContainer} `} onMouseOver={showChangeImageEnabled} onMouseLeave={showChangeImageDisabled}>
                                <div className={`${style.imageNews} `}>
                                    <img src={userImage} alt="" className={`${style.profileImageNews} `} />

                                    <input type="file" accept="image/*" onChange={handleProfileImageChange} className={`${style.inputFile} `} />
                                </div>
                                <div className={`${style.changePhotoNewsContainer} `}>

                                    <img src="../../../../../../assets/global/photoIcon.svg" alt="" className={`${style.changePhotoImage} ${!showChangeImage && style.hidePhotoImage}`} onClick={() => document.querySelector('input[type="file"]').click()} />
                                </div>
                            </div>
                        </article>
                        <article className={`${style.inputInfoSection} `}>
                            <label className={`${style.inputTitle} `}>{gameTab.create.fields.imageAlt}</label>
                            <input
                                type="text"
                                className={`${style.inputNewsSearch} `}
                                name="alt"
                                value={inputValues.alt}
                                onChange={handleInputChange} />
                        </article>
                        <article className={`${style.inputInfoSection} `}>
                            <label className={`${style.inputTitle} `}>{gameTab.create.fields.title}</label>
                            <input
                                type="text"
                                className={`${style.inputNewsSearch} `}
                                name="title"
                                value={inputValues.title}
                                onChange={handleInputChange} />
                        </article>
                        <article className={`${style.inputInfoSection} `}>
                            <label className={`${style.inputTitle} `}>{gameTab.create.fields.trailer}</label>
                            <input
                                type="text"
                                className={`${style.inputNewsSearch} `}
                                name="trailer"
                                value={inputValues.trailer}
                                onChange={handleInputChange} />
                        </article>
                        <article className={`${style.inputInfoSection} `}>
                            <label className={`${style.inputTitle} `}>{gameTab.create.fields.date}</label>
                            <input type="date" name="date" id="date" value={inputValues.date} className={`${style.inputNewsSearch} `} onChange={handleInputChange} />
                        </article>
                        <article className={`${style.inputInfoSection} `}>
                            <label className={`${style.inputTitle} `}>{gameTab.create.fields.storyTime}</label>
                            <input
                                type="text"
                                className={`${style.inputNewsSearch} `}
                                name="storyTime"
                                value={inputValues.storyTime}
                                onChange={handleInputChange} />
                        </article>
                        <article className={`${style.inputInfoSection} `}>
                            <label className={`${style.inputTitle} `}>{gameTab.create.fields.completeTime}</label>
                            <input
                                type="text"
                                className={`${style.inputNewsSearch} `}
                                name="completeTime"
                                value={inputValues.completeTime}
                                onChange={handleInputChange} />
                        </article>
                        <article className={`${style.inputInfoSection} `}>
                            <label className={`${style.inputTitle} `}>{gameTab.create.fields.sinopsis}</label>

                            <textarea
                                className={`${style.inputNewsSearch}  ${style.textArea}`}
                                name="sinopsis"
                                value={inputValues.sinopsis}
                                onChange={handleInputChange}
                            ></textarea>
                        </article>
                        <article className={`${style.inputInfoSection} `}>
                            <label className={`${style.inputTitle} `}>{gameTab.create.fields.platform}</label>
                            <input
                                type="text"
                                className={`${style.inputNewsSearch} `}
                                name="platform"
                                value={inputValuesComplex.platform}
                                onChange={searchPlatform} />
                            <div>
                                {(searchResults?.platform != null) && searchResults.platform.map((result) => {
                                    return <SearchItem key={result.id} data={result} name={'platform'} addValue={addValue} />
                                })}
                            </div>
                            <div className={`${style.addedList} `}>
                                {(inputValuesTags?.platform != null) && inputValuesTags.platform.map((platform => (
                                    <AddedItem key={platform.id} data={platform} deleteValue={deleteValue} type={'platform'} />
                                )))

                                }
                            </div>
                        </article>
                        <article className={`${style.inputInfoSection} `}>

                            <label className={`${style.inputTitle} `}>Crossplay</label>

                            <select name="crossplay" id="crossplay" value={inputValues.crossplay} onChange={handleInputChange} className={`${style.inputUserSearch} `}>
                                <option value="" disabled hidden>Crossplay</option>
                                <option value="1">Tiene crossplay</option>
                                <option value="2">No tiene crossplay</option>
                            </select>
                        </article>
                        <article className={`${style.inputInfoSection} `}>
                            <label className={`${style.inputTitle} `}>{gameTab.create.fields.genre}</label>
                            <input
                                type="text"
                                className={`${style.inputNewsSearch} `}
                                name="genre"
                                value={inputValuesComplex.genre}
                                onChange={searchGenre} />
                            <div>
                                {(searchResults?.genre != null) && searchResults.genre.map((result) => {
                                    return <SearchItem key={result.id} data={result} name={'genre'} addValue={addValue} />
                                })}
                            </div>
                            <div className={`${style.addedList} `}>
                                {(inputValuesTags?.genre != null) && inputValuesTags.genre.map((result => (
                                    <AddedItem key={result.id} data={result} deleteValue={deleteValue} type={'genre'} />
                                )))

                                }
                            </div>
                        </article>
                        <article className={`${style.inputInfoSection} `}>
                            <label className={`${style.inputTitle} `}>{gameTab.create.fields.developer}</label>
                            <input
                                type="text"
                                className={`${style.inputNewsSearch} `}
                                name="developer"
                                value={inputValuesComplex.developer}
                                onChange={searchDeveloper} />
                            <div>
                                {(searchResults?.developer != null) && searchResults.developer.map((result) => {
                                    return <SearchItem key={result.id} data={result} name={'developer'} addValue={addValue} />
                                })}
                            </div>
                            <div className={`${style.addedList} `}>
                                {(inputValuesTags?.developer != null) && inputValuesTags.developer.map((result => (
                                    <AddedItem key={result.id} data={result} deleteValue={deleteValue} type={'developer'} />
                                )))

                                }
                            </div>
                        </article>
                        <article className={`${style.inputInfoSection} `}>
                            <label className={`${style.inputTitle} `}>{gameTab.create.fields.distributor}</label>
                            <input
                                type="text"
                                className={`${style.inputNewsSearch} `}
                                name="distributor"
                                value={inputValuesComplex.distributor}
                                onChange={searchDistributor} />
                            <div>
                                {(searchResults?.distributor != null) && searchResults.distributor.map((result) => {
                                    return <SearchItem key={result.id} data={result} name={'distributor'} addValue={addValue} />
                                })}
                            </div>
                            <div className={`${style.addedList} `}>
                                {(inputValuesTags?.distributor != null) && inputValuesTags.distributor.map((result => (
                                    <AddedItem key={result.id} data={result} deleteValue={deleteValue} type={'distributor'} />
                                )))

                                }
                            </div>
                        </article>
                        <article className={`${style.inputInfoSection} `}>
                            <label className={`${style.inputTitle} `}>{gameTab.create.fields.minimumOperatingSystem}</label>
                            <input
                                type="text"
                                className={`${style.inputNewsSearch} `}
                                name="minimumOperatingSystem"
                                value={inputValues.minimumOperatingSystem}
                                onChange={handleInputChange} />
                        </article>
                        <article className={`${style.inputInfoSection} `}>
                            <label className={`${style.inputTitle} `}>{gameTab.create.fields.minimumProcessor}</label>
                            <input
                                type="text"
                                className={`${style.inputNewsSearch} `}
                                name="minimumProcessor"
                                value={inputValues.minimumProcessor}
                                onChange={handleInputChange} />
                        </article>

                        <article className={`${style.inputInfoSection} `}>
                            <label className={`${style.inputTitle} `}>{gameTab.create.fields.minimumRam}</label>
                            <input
                                type="text"
                                className={`${style.inputNewsSearch} `}
                                name="minimumRam"
                                value={inputValues.minimumRam}
                                onChange={handleInputChange} />
                        </article>
                        <article className={`${style.inputInfoSection} `}>
                            <label className={`${style.inputTitle} `}>{gameTab.create.fields.minimumGraphicsCard}</label>
                            <input
                                type="text"
                                className={`${style.inputNewsSearch} `}
                                name="minimumGraphicsCard"
                                value={inputValues.minimumGraphicsCard}
                                onChange={handleInputChange} />
                        </article>
                        <article className={`${style.inputInfoSection} `}>
                            <label className={`${style.inputTitle} `}>{gameTab.create.fields.minimumDirectX}</label>
                            <input
                                type="text"
                                className={`${style.inputNewsSearch} `}
                                name="minimumDirectX"
                                value={inputValues.minimumDirectX}
                                onChange={handleInputChange} />
                        </article>
                        <article className={`${style.inputInfoSection} `}>
                            <label className={`${style.inputTitle} `}>{gameTab.create.fields.minimumStorage}</label>
                            <input
                                type="text"
                                className={`${style.inputNewsSearch} `}
                                name="minimumStorage"
                                value={inputValues.minimumStorage}
                                onChange={handleInputChange} />
                        </article>


                        <article className={`${style.inputInfoSection} `}>
                            <label className={`${style.inputTitle} `}>{gameTab.create.fields.recommendedOperatingSystem}</label>
                            <input
                                type="text"
                                className={`${style.inputNewsSearch} `}
                                name="recommendedOperatingSystem"
                                value={inputValues.recommendedOperatingSystem}
                                onChange={handleInputChange} />
                        </article>
                        <article className={`${style.inputInfoSection} `}>
                            <label className={`${style.inputTitle} `}>{gameTab.create.fields.recommendedProcessor}</label>
                            <input
                                type="text"
                                className={`${style.inputNewsSearch} `}
                                name="recommendedProcessor"
                                value={inputValues.recommendedProcessor}
                                onChange={handleInputChange} />
                        </article>

                        <article className={`${style.inputInfoSection} `}>
                            <label className={`${style.inputTitle} `}>{gameTab.create.fields.recommendedRam}</label>
                            <input
                                type="text"
                                className={`${style.inputNewsSearch} `}
                                name="recommendedRam"
                                value={inputValues.recommendedRam}
                                onChange={handleInputChange} />
                        </article>
                        <article className={`${style.inputInfoSection} `}>
                            <label className={`${style.inputTitle} `}>{gameTab.create.fields.recommendedGraphicsCard}</label>
                            <input
                                type="text"
                                className={`${style.inputNewsSearch} `}
                                name="recommendedGraphicsCard"
                                value={inputValues.recommendedGraphicsCard}
                                onChange={handleInputChange} />
                        </article>
                        <article className={`${style.inputInfoSection} `}>
                            <label className={`${style.inputTitle} `}>{gameTab.create.fields.recommendedDirectX}</label>
                            <input
                                type="text"
                                className={`${style.inputNewsSearch} `}
                                name="recommendedDirectX"
                                value={inputValues.recommendedDirectX}
                                onChange={handleInputChange} />
                        </article>
                        <article className={`${style.inputInfoSection} `}>
                            <label className={`${style.inputTitle} `}>{gameTab.create.fields.recommendedStorage}</label>
                            <input
                                type="text"
                                className={`${style.inputNewsSearch} `}
                                name="recommendedStorage"
                                value={inputValues.recommendedStorage}
                                onChange={handleInputChange} />
                        </article>
                        <article className={`${style.inputInfoSection} `}>
                            <label className={`${style.inputTitle} `}>{gameTab.create.fields.gameFeature}</label>
                            <div className={`${style.gameFeatureContainer} `}>
                                <input
                                    type="text"
                                    className={`${style.inputNewsSearch} ${style.inputText}`}
                                    name="feature"
                                    value={inputValuesComplex.feature}
                                    onChange={searchFeature}
                                    placeholder='Id del feature'
                                    id='idFeature' />
                                <input className={`${style.inputNewsSearch} ${style.inputText}`}
                                    type="number" name="numberPlayerId" id="idPlayers" placeholder='Id de N. jugadores' />
                                <button className={`${style.addButton} `} name='feature' onClick={addFeature}>Añadir</button>
                            </div>

                            <div>
                                {(searchResults?.feature != null) && searchResults.feature.map((result) => {
                                    return <SearchFeatureItem key={result.id} data={result} />
                                })}
                            </div>
                            <div className={`${style.addedList} `}>
                                {(inputValuesTags?.feature != null) && inputValuesTags.feature.map(((result) => {
                                    return <AddedFeatureItem key={result.feature.id} data={result} deleteValue={deleteValue} type={'feature'} />
                                }
                                ))

                                }
                            </div>
                        </article>
                        <article className={`${style.inputInfoSection} `}>
                            <label className={`${style.inputTitle} `}>{gameTab.create.fields.availabilities}</label>
                            <div className={`${style.gameFeatureContainer} `}>
                                <input
                                    type="text"
                                    className={`${style.inputNewsSearch} ${style.inputText}`}
                                    name="availability"
                                    value={inputValuesComplex.availability}
                                    onChange={writeAvailability}
                                    placeholder='Id del feature'
                                    id='availability' />
                                <select name="interface" id="interface" className={`${style.inputNewsSearch} ${style.select} ${style.selectAvailability}`} defaultValue={''}>
                                    <option value="" disabled hidden>Interface</option>
                                    <option value="true">Sí</option>
                                    <option value="false">No</option>
                                </select>
                                <select name="subtitle" id="subtitle" className={`${style.inputNewsSearch} ${style.select} ${style.selectAvailability}`} defaultValue={''}>
                                    <option value="" disabled hidden>Subtitle</option>

                                    <option value="true">Sí</option>
                                    <option value="false">No</option>
                                </select>
                                <select name="audio" id="audio" className={`${style.inputNewsSearch} ${style.select} ${style.selectAvailability}`} defaultValue={''}>
                                    <option value="" disabled hidden>Audio</option>
                                    <option value="true">Sí</option>
                                    <option value="false">No</option>
                                </select>
                                <button className={`${style.addButton} `} name='availability' onClick={addAvailability}>Añadir</button>
                            </div>
                            <div className={`${style.addedList} `}>
                                {(searchResults?.availability != null) && searchResults.availability.map((result) => {
                                    return <SearchFeatureItem key={result.id} data={result} />
                                })}
                            </div>


                            <div className={`${style.addedList} `}>
                                {(inputValuesTags?.availability != null) && inputValuesTags.availability.map(((result) => (
                                    <AddedAvailavilityItem key={result.id} data={result} deleteValue={deleteValue} type={'availability'} />
                                )))

                                }
                            </div>
                        </article>

                        <article className={`${style.inputInfoSection} `}>
                            <label className={`${style.inputTitle} `}>{gameTab.create.fields.product.product}</label>
                            <div className={`${style.gameFeatureContainer} ${style.productContainer}`}>
                                <input
                                    type="text"
                                    className={`${style.inputNewsSearch} ${style.inputText}`}
                                    name="idProduct"
                                    value={inputValuesComplex.idProduct}
                                    onChange={searchFeature}
                                    placeholder='Id del product'
                                    id='idProduct' />
                                <input
                                    type="text"
                                    className={`${style.inputNewsSearch} ${style.inputText}`}
                                    name="productEdition"
                                    value={inputValuesComplex.productEdition}
                                    onChange={searchProductEdition}
                                    placeholder='Id del product edition'
                                    id='productEdition' />
                                <div>
                                    {(searchResults?.productEdition != null) && searchResults.productEdition.map((result) => {
                                        return <SearchFeatureItem key={result.id} data={result} />
                                    })}
                                </div>
                                <input
                                    type="text"
                                    className={`${style.inputNewsSearch} ${style.inputText}`}
                                    name="productPlatform"
                                    value={inputValuesComplex.productPlatform}
                                    onChange={searchProductPlatform}
                                    placeholder='Id del product platform'
                                    id='productPlatform' />
                                <div>
                                    {(searchResults?.productPlatform != null) && searchResults.productPlatform.map((result) => {
                                        return <SearchFeatureItem key={result.id} data={result} />
                                    })}
                                </div>
                                <input
                                    type="text"
                                    className={`${style.inputNewsSearch} ${style.inputText}`}
                                    name="productVendor"
                                    value={inputValuesComplex.productVendor}
                                    onChange={searchProductVendor}
                                    placeholder='Id del product vendor'
                                    id='productVendor' />
                                <div>
                                    {(searchResults?.productVendor != null) && searchResults.productVendor.map((result) => {
                                        return <SearchFeatureItem key={result.id} data={result} />
                                    })}
                                </div>
                                <input
                                    type="text"
                                    className={`${style.inputNewsSearch} ${style.inputText}`}
                                    name="productRegion"
                                    value={inputValuesComplex.productRegion}
                                    onChange={searchProductRegion}
                                    placeholder='Id del product region'
                                    id='productRegion' />
                                <div>
                                    {(searchResults?.productRegion != null) && searchResults.productRegion.map((result) => {
                                        return <SearchFeatureItem key={result.id} data={result} />
                                    })}
                                </div>
                                <input
                                    type="text"
                                    className={`${style.inputNewsSearch} ${style.inputText}`}
                                    name="productKey"
                                    value={inputValuesComplex.productKey}
                                    onChange={searchProductKey}
                                    placeholder='Id del product key'
                                    id='productKey' />
                                <div>
                                    {(searchResults?.productKey != null) && searchResults.productKey.map((result) => {
                                        return <SearchFeatureItem key={result.id} data={result} />
                                    })}
                                </div>
                                <input
                                    type="text"
                                    className={`${style.inputNewsSearch} ${style.inputText}`}
                                    name="price"
                                    value={inputValuesComplex.price}
                                    onChange={handleInputComplexChange}
                                    placeholder='Precio'
                                    id='price' />
                                <input
                                    type="text"
                                    className={`${style.inputNewsSearch} ${style.inputText}`}
                                    name="link"
                                    value={inputValuesComplex.link}
                                    onChange={handleInputComplexChange}
                                    placeholder='Link'
                                    id='link' />
                                <button className={`${style.addButton} `} name='product' onClick={addProduct}>Añadir</button>
                            </div>


                            <div className={`${style.addedList} `}>
                                {(inputValuesTags?.product != null) && inputValuesTags.product.map(((result) => (
                                    <AddedProductItem key={result.id} data={result} deleteValue={deleteValue} type={'product'} />
                                )))

                                }
                            </div>
                        </article>















                    </section>
                </>
            }

        </section>
    )
}
