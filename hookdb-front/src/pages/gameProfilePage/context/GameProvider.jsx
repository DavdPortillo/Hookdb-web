
import { GameContext } from "./GameContext"
import { useState } from 'react';

export const GameProvider = ({ children }) => {

    const [dataGame, setDataGame] = useState({})

    //BACKEND
    const datas = {
        id: 1,
        released: { isReleased: false, date: '27-Noviembre-2024' },
        cover: '../../../assets/weHappyFew.jpg',
        trailer: { url: '../../../assets/weHappyFew.webm', duration: 148, subtitle: true },
        duration: { story: 611, complete: 1391 },
        userData: { score: 7 },
        pricesTab: [
            { id: 1, image: '../../../assets/global/vendor/instantGaming.webp', vendor: 'Instant gaming', region: 'EUR', platform: 'Steam', imagePlatform: '../../../assets/global/platform/steamIcon.svg', edition: 'Standard', productType: 'Cdkeys', price: 39.99, link: '' },
            { id: 2, image: '../../../assets/global/vendor/enebaIcon.svg', vendor: 'Eneba', region: 'Global', platform: 'Epic games', imagePlatform: '../../../assets/global/platform/epicIcon.svg', edition: 'Enhanced', productType: 'Cdkeys', price: 15.72, link: '' }
        ],
        criticsTab: [
            {
                id: 1,
                user: { image: '../../../assets/imageProfile.jpg', username: 'DavidPortillo7', rates: 1290, reviews: 183, verifiedPurchase: true },
                reviewInfo: { title: 'Juego cerca de la excelencia, pero ya está', useFul: { yes: 120, no: 2 }, rate: 8, date: '7 de Octubre de 2023', content: 'Es un juego que ha capturado mi atención con su narrativa única y su mundo surrealista. Ambientado en una distopía retrofuturista, el juego nos sumerge en la ficticia ciudad de Wellington Wells, donde la sociedad está envuelta en una extraña droga llamada Joy. <(&)> La estética visual y sonora es excepcional, creando una atmósfera inmersiva que te sumerge en este mundo oscuro y perturbador. La historia, llena de giros inesperados, explora temas profundos como la conformidad, la alienación y la realidad distorsionada. Los personajes complejos y memorables agregan profundidad a la trama, llevándonos a través de una montaña rusa emocional mientras descubrimos los secretos ocultos de Wellington Wells.' },
                language: 'Español',
                rating: 'Positivo',
                date: 'Recientes',
                isUseful: 'positive'
            },
            {
                id: 2,
                user: { image: '', username: 'DavidPortillo7', rates: 1290, reviews: 183, verifiedPurchase: true },
                reviewInfo: { title: 'Juego cerca de la excelencia, pero ya está', useFul: { yes: 828, no: 1829 }, rate: 2, date: '7 de Octubre de 2023', content: 'Es un juego que ha capturado mi atención con su narrativa única y su mundo surrealista. Ambientado en una distopía retrofuturista, el juego nos sumerge en la ficticia ciudad de Wellington Wells, donde la sociedad está envuelta en una extraña droga llamada Joy. La estética visual y sonora es excepcional, creando una atmósfera inmersiva que te sumerge en este mundo oscuro y perturbador.<br>La historia, llena de giros inesperados, explora temas profundos como la conformidad, la alienación y la realidad distorsionada. Los personajes complejos y memorables agregan profundidad a la trama, llevándonos a través de una montaña rusa emocional mientras descubrimos los secretos ocultos de Wellington Wells.' },
                language: 'Inglés',
                rating: 'Positivo',
                date: 'Recientes',
                isUseful: 'negative'
            },
            {
                id: 3,
                user: { image: '', username: 'DavidPortillo7', rates: 1290, reviews: 183, verifiedPurchase: true },
                reviewInfo: { title: 'Juego cerca de la excelencia, pero ya está', useFul: { yes: 480, no: 182 }, rate: 7, date: '7 de Octubre de 2023', content: 'Es un juego que ha capturado mi atención con su narrativa única y su mundo surrealista. Ambientado en una distopía retrofuturista, el juego nos sumerge en la ficticia ciudad de Wellington Wells, donde la sociedad está envuelta en una extraña droga llamada Joy. La estética visual y sonora es excepcional, creando una atmósfera inmersiva que te sumerge en este mundo oscuro y perturbador.<br>La historia, llena de giros inesperados, explora temas profundos como la conformidad, la alienación y la realidad distorsionada. Los personajes complejos y memorables agregan profundidad a la trama, llevándonos a través de una montaña rusa emocional mientras descubrimos los secretos ocultos de Wellington Wells.' },
                language: 'Inglés',
                rating: 'Positivo',
                date: 'Recientes',
                isUseful: '',
            }
        ],
        generalTab: {
            sinopsis: 'We Happy few es un juego de acción y aventura ambientado en una Inglaterra alternativa de los años 60, en la que encontrarás una sociedad retrofuturística dominada por el consumo de antidepresivos. Escóndete, lucha y encuentra una manera de salir de este mundo delirante obsesionado con la Joy.',
            requirements:
            {
                minimum: [
                    { name: 'Sistema', result: 'Windows 10 de 64 bits' },
                    { name: 'Procesador', result: 'Intel Core i5-6600K 3.50GHz o AMD Ryzen 5 1600 3.2 GHZ' },
                    { name: 'Memoria', result: '8 GB de RAM' },
                    { name: 'Gráficos', result: 'NVIDIA GeForce GTX 1050 Ti 4GB o AMD Radeon RX 570 4GB' },
                    { name: 'DirectX', result: 'Versión 12' },
                    { name: 'Red', result: 'Conexión de banda ancha a internet' },
                    { name: 'Almacenamiento', result: '10 GB de espacio disponible' },
                ]
            },
            recomended: [
                { name: 'Sistema', result: 'Windows 10 de 64 bits' },
                { name: 'Procesador', result: 'Intel Core i5-6600K 3.50GHz o AMD Ryzen 5 1600 3.2 GHZ' },
                { name: 'Memoria', result: '8 GB de RAM' },
                { name: 'Gráficos', result: 'NVIDIA GeForce GTX 1050 Ti 4GB o AMD Radeon RX 570 4GB' },
                { name: 'DirectX', result: 'Versión 12' },
                { name: 'Red', result: 'Conexión de banda ancha a internet' },
                { name: 'Almacenamiento', result: '10 GB de espacio disponible' },
            ],
            features: [
                { key: 'singlePlayer', name: 'Un jugador', url: '../../../assets/global/singleplayer.webp', heigth: 16.25, width: 15, exist: true },
                { key: 'multiplayer', name: 'Multijugador', url: '../../../assets/global/multiplayer.webp', heigth: 16.2, width: 25.5, exist: true },
                { key: 'pve', name: 'Jugador vs Entorno', url: '../../../assets/global/playerVsEnviroment.webp', heigth: 16.2, width: 28.6, exist: true },
                { key: 'coopOnline', name: 'Coop. online', url: '../../../assets/global/coopOnline.webp', heigth: 24.5, width: 22.6, exist: true, amount: 8 },
                { key: 'pvp', name: 'Jugador vs jugador', url: '../../../assets/global/playerVsPlayer.webp', heigth: 20, width: 20, exist: true },
                { key: 'coopLan', name: 'Coop. LAN', url: '../../../assets/global/coopLAN.webp', heigth: 23.25, width: 26.4, exist: true, amount: 4 },
            ],
            saga: [
                { type: 'prequel', information: {} },
                { type: 'interquel', information: { name: 'We happy few', release: 2019 } },
                { type: 'sequel', information: { name: 'We happy few 2', release: 2020 } }
            ]
        }
    };

 
  // Cambiar el valor de dataGame después de establecer el estado inicial
  const changeDataGame = (data) => {
    setDataGame(data);
};

// Asignar el valor de datas al contexto
datas.tabs = { precios: datas.pricesTab.length, criticas: datas.criticsTab.length, dlcs: 2, noticias: 7 };

return (
    <GameContext.Provider value={{ changeDataGame, dataGame, datas }}>
        {children}
    </GameContext.Provider>
);
};

