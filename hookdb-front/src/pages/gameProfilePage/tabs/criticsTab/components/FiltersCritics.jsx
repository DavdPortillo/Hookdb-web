import { useContext, useEffect, useState } from 'react';

import { SelectFilterDefault } from '../../../components/SelectFilterDefault';
import { UserScoreReview } from './UserScoreReview';

import style from '../css/filtersCritics.module.css';
import generalize from '../../../../../css/generalize.module.css';
import { uploadReview } from '../../../../../helpers/dataAPI';
import { UserContext } from '../../../../../context/UserContext';
import { useMediaQuery } from 'react-responsive';
import { Authentication } from '../../../../../modals/components';


export const FiltersCritics = ({ handleChangers, handleResetFilters, index, dataGame, reviews }) => {

    const { filters, order } = index;
    const { handleFilterChange, handleOrderChange } = handleChangers;
    const [showCreateReview, setShowCreateReview] = useState(false);
    const [userScore, setUserScore] = useState(dataGame?.userScore?.score);
    const [scoreIsMissing, setScoreIsMissing] = useState(isNaN(dataGame?.userScore?.score));
    const [sendInfoReview, setSendInfoReview] = useState(false);
    const { user, userLoaded } = useContext(UserContext);
    const isSmall = useMediaQuery({ maxWidth: 1200 });
    const [showFilters, setShowFilters] = useState(false)
    const [showAuth, setShowAuth] = useState(false);
    const changeShowAuth = () => {
      setShowAuth(!showAuth);
  }
    const changeShowFilters = () => {
        setShowFilters(!showFilters);
    }
    const changeAddReviewValue = () => {

        if(userLoaded){
            setShowCreateReview(!showCreateReview);
        }else{
            changeShowAuth()
        }

    }

    const changeUserScore = (value) => {
        setUserScore(value)
    }



    const handleSendInfoReview = async () => {
        if (isNaN(userScore)) {
            setScoreIsMissing(true)
            setSendInfoReview(false)
        } else {
            const titleReview = document.getElementById('titleReview');
            const contentReview = document.getElementById('contentReview');

            const reviewData = {
                title: titleReview.value,
                content: contentReview.value
            }

            await uploadReview(user.id, dataGame.game.id, reviewData, user.accessToken)
            changeAddReviewValue()
        }

    }

    useEffect(() => {
        if (!isNaN(userScore)) {
            setSendInfoReview(true)
        }
    }, [userScore])


    useEffect(() => {
    }, [userScore, scoreIsMissing])



    //Update the state of the filters
    const onfilterChange = (event, filter) => {
        handleFilterChange(filter, event.target.value);
    };

    const filtersCount = (filters) => {
        const enabledFiltersCount = Object.values(filters).filter(value => value !== '').length;

        return enabledFiltersCount > 0;
    };

    const showAside = () => {
        if (reviews.length !== 0) {
            if (!isSmall) {
                return (
                    <div className={`${style.filtersSpacing} `}>
                        <div className={`${style.description} `}>
                            <p className={`${style.title} `}>Filtrar</p>

                            <img src="../../../../../../assets/global/filterIcon.svg" alt="" height={10} />

                        </div>
                        <SelectFilterDefault onfilterChange={onfilterChange} nameOptions={{ recent: 'Recientes', general: 'General' }} names={{ nameSelect: 'date', titleFilter: 'Fecha' }} filters={filters} />
                        <SelectFilterDefault onfilterChange={onfilterChange} nameOptions={{ positive: "Positivas", negative: "Negativas" }} names={{ nameSelect: 'gameScore', titleFilter: 'Valoración' }} filters={filters} />

                        <select className={`${style.select} ${style.activeOption}`} onChange={(event) => handleOrderChange(event.target.value)} name="" id="" value={order}>
                            <option className={`${style.option} `} value="ascendantScore" >Valoraciones de mayor a menor</option>
                            <option className={`${style.option} `} value="descendantScore">Valoraciones de menor a mayor</option>
                            <option className={`${style.option} `} value="moreUseful">Críticas más útiles</option>
                        </select>

                        {
                            filtersCount(filters) &&
                            <button className={`${generalize.buttonStyle_active} ${style.cleanButton}`} onClick={handleResetFilters}>
                                <img src="../../../../../../assets/global/cleanIcon.svg" alt="" height={15} width={15} />
                            </button>

                        }
                    </div>)
            } else {
                return (
                    <button className={`${style.description} ${generalize.buttonStyle_active} ${style.isSmallDescription}`} onClick={changeShowFilters}>
                        <p className={`${style.title} `}>Filtrar</p>

                        <img src="../../../../../../assets/global/filterIcon.svg" alt="" height={10} />

                    </button>
                )
            }

        }


    }

    return (
        <>
            <div className={`${style.filters} `}>

                <button className={`${style.alertButton} ${generalize.buttonStyle_active}`} onClick={changeAddReviewValue}>
                    <img src="../../../../../../assets/global/doReviewIcon.svg" alt="" width={13} />
                    Realizar crítica
                </button>

                {
                    showAside()
                }
            </div>
            <hr className={`${style.hr} `} />

            {
                (showFilters && isSmall) &&
                <div className={`${style.modalAside} `}>
                    <button className={`${style.closeButtonAside} `} onClick={changeShowFilters}></button>
                    <div className={`${style.filterContainer} `}>
                        <button className={`${style.closeButtonContainer} `} onClick={changeShowFilters}>
                            <img src="../../../../../../assets/global/cleanIcon.svg" alt=""  height={18}/>
                        </button>
                        <h2 className={`${style.h2} `}>Filtros</h2>
                        <label className={`${style.label} `}>Fecha</label>
                        <SelectFilterDefault onfilterChange={onfilterChange} nameOptions={{ recent: 'Recientes', general: 'General' }} names={{ nameSelect: 'date', titleFilter: 'Fecha' }} filters={filters} />
                        <label className={`${style.label} `}>Valoración</label>
                        <SelectFilterDefault onfilterChange={onfilterChange} nameOptions={{ positive: "Positivas", negative: "Negativas" }} names={{ nameSelect: 'gameScore', titleFilter: 'Valoración' }} filters={filters} />
                        <label className={`${style.label} `}>Orden</label>
                        <select className={`${style.select} ${style.activeOption}`} onChange={(event) => handleOrderChange(event.target.value)} name="" id="" value={order}>
                            <option className={`${style.option} `} value="ascendantScore" >Valoraciones de mayor a menor</option>
                            <option className={`${style.option} `} value="descendantScore">Valoraciones de menor a mayor</option>
                            <option className={`${style.option} `} value="moreUseful">Críticas más útiles</option>
                        </select>

                        {
                            filtersCount(filters) &&
                            <button className={`${generalize.buttonStyle_active} ${style.cleanButton}`} onClick={handleResetFilters}>
                                <img src="../../../../../../assets/global/cleanIcon.svg" alt="" height={15} width={15} />
                            </button>

                        }
                    </div>
                </div>
            }


            {

                (showCreateReview) &&
 
                <div className={`${style.modalContainer} `}>
                    <button className={`${style.modalBackground} ${generalize.buttonStyle}`} onClick={changeAddReviewValue} ></button>
                    <div className={`${style.modal}`} >

                        <div className={`${style.modalInfo} `}>
                            <div className={`${style.titleContainer} `}>
                                <h2 className={`${style.logo}`}>Realizar una critica</h2>
                                <button className={`${style.closeButton} `} onClick={changeAddReviewValue}>
                                    <img src="../../../assets/global/cleanIcon.svg" height={16} width={16} alt="" />
                                </button>
                            </div>
                            <div className={`${style.gameInfo} `}>
                                <div className={`${style.userScoreReviewContainer} `}>
                                    <UserScoreReview userData={dataGame.userScore} dataGame={dataGame} changeUserScore={changeUserScore} />

                                </div>
                                <div className={`${style.reviewContent} `}>
                                    <label>Título de la crítica</label>
                                    <input id="titleReview" className={`${style.inputText} `} type="text" />
                                    {(scoreIsMissing && !sendInfoReview) && <div>Debes puntuar el juego para realizar una critica</div>}
                                    <label>Contenido de la crítica</label>
                                    <textarea id="contentReview" className={`${style.inputText} ${style.inputContent}`}></textarea>
                                    <div className={`${style.buttonSection} `}>
                                        <button onClick={changeAddReviewValue} className={`${generalize.buttonStyle_active} ${style.button}`}>Cancelar</button>
                                        <button onClick={handleSendInfoReview} className={`${generalize.buttonStyle_active} ${style.button}`}>Enviar</button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {showAuth && <Authentication onClickAuth={changeShowAuth} />}



        </>
    )
}
