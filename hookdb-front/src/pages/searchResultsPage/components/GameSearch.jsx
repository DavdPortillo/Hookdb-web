import { Link } from 'react-router-dom';
import style from '../css/gameSearch.module.css';
import { urlBeautify } from '../../../helpers/composeText';
import { useContext, useRef, useState } from 'react';
import { UserContext } from '../../../context/UserContext';
import { useCloseTool } from '../../../hooks/useCloseTool';
import { Lists } from '../../../tooltips/List/Lists';
import { Authentication } from '../../../modals/components';

export const GameSearch = ({ result }) => {

  const { userLoaded } = useContext(UserContext);
  const menuRef = useRef(null);
  const { showMenu, handleClickShow } = useCloseTool(menuRef);
  const [showAuth, setShowAuth] = useState(false);

  const changeShowAuth = () => {
      setShowAuth(!showAuth);
  }
  const isAuthenticate = () => {
    if (userLoaded) {
      handleClickShow();
    } else {
      changeShowAuth();
    }
  }

  return (
    <>
      <article className={`${style.gameSearch} `}>
        <section className={`${style.mainInformation} `}>
          <div className={`${style.imageContainer} `}>
            <img className={`${style.gameImage} `} src={result.cover} alt={result.alt} />
          </div>
          <div className={`${style.gameDescription} `}>
            <div>
              <h3 className={`${style.h3} `}>
                <Link to={`/games/${result.id}/${urlBeautify(result.title)}`}>{result.title}</Link>
              </h3>
              <p className={`${style.p} `}>{(new Date(result.date).getFullYear())} - {result.developer}</p>
            </div>
            <div>
              <button className={`${style.addContainerButton} `} onClick={isAuthenticate}>
                <img src="../../../../assets/global/addIcon.svg" alt="" height={18} width={18} />
              </button>
              {showMenu && userLoaded && <div ref={menuRef}><Lists idGame={result.id} handleClickShow={handleClickShow} /></div>}
            </div>

          </div>

        </section>
        <section className={`${style.secondaryInformationContainer} `}>
          <p className={`${style.secondaryInformation}`}>Juego base</p>
          <p className={`${style.secondaryInformation}`}>39.99€</p>
          <div className={`${style.secondaryInformation} `}>
            <div className={`${style.ratingContainer} `}>
              <p className={`${style.rate} `}>{(isNaN(result.score)) ? result.score : '-'}</p>
            </div>
          </div>
        </section>

      </article>
      <hr className={`${style.hr} `} />
      {showAuth && <Authentication onClickAuth={changeShowAuth} />}

    </>
  )
}
