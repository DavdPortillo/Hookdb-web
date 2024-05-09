import style from './css/dlcs.module.css';
import { Dlc } from './components/Dlc.jsx';

export const DlcsTab = ({dataGame}) => {
  
  return (
    <section className={`${(dataGame.game.dlcs.length !== 0) ? style.dlcs : style.noDlcs} `}>
        {(dataGame.game.dlcs.length !== 0) ? dataGame.game.dlcs.map(dlc => (<Dlc key={dlc.id} dlcData={dlc}/>)) : <h1>Este juego no tiene dlcs</h1>

  }
    </section>
  )
}
