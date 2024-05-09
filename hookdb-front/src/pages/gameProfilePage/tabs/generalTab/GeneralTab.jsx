
import { Aside, Requirements, Sinopsis } from './components/';


export const GeneralTab = ({dataGame}) => {
    const {recommendedSystemRequirement, minimumSystemRequirement} = dataGame.game;

    return (
        <>
            <Sinopsis sinopsis={dataGame.game.sinopsis} />
            <Requirements recommendRequirements={recommendedSystemRequirement} minimumRequirement={minimumSystemRequirement}/>
             <Aside dataGame={dataGame} />
         </>
    )
}
