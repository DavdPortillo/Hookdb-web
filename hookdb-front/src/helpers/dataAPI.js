const API_BASE_URL = "http://158.179.219.214:31490";

/*|||||||||||||||||||||||||||||||||||*/
/*-----------AUTHENTICATION----------*/
/*|||||||||||||||||||||||||||||||||||*/

export const loginRequest = async (email, password) => {
    const url = `${API_BASE_URL}/login`;
    const body = { email, password };
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(body),
    };

    return await makeRequest(url, requestOptions);
};

export const signupRequest = async (body) => {
    const url = `${API_BASE_URL}/user`;

    const requestOptions = {
        method: "POST",
        body: body
    };
    return await makeRequest(url, requestOptions);
};

export const authenticateUser = async (token) => {
    const url = `${API_BASE_URL}/login/authenticate`;
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    };
    const error = "Fallo al autenticar al usuario con el token";

    return await makeRequest(url, requestOptions, error);
};



/*|||||||||||||||||||||||||||||||||||*/
/*---------------.USER---------------*/
/*|||||||||||||||||||||||||||||||||||*/
 
export const updateUSerByUser = async (idUser, body, token) =>{
    const url = `${API_BASE_URL}/user/${idUser}`;

    const requestOptions = {
        method: "PUT",
        headers: {
            Authorization: "Bearer " + token,
        },
        body: body
    };
    const error = "Fallo al editar la información del usuario";

    return await makeRequest(url, requestOptions, error);
}


/*|||||||||||||||||||||||||||||||||||*/
/*---------------GAMES---------------*/
/*|||||||||||||||||||||||||||||||||||*/

export const getTopFivePopularGames = async (language) => {
    const url = `${API_BASE_URL}/game/top-5-popular/language/${language}`; 
    const requestOptions = {
        headers: {
            "Content-type": "application/json",
        },
    };
    const error =
        "Fallo al obtener la información del top 5 proximos juegos populares";

    return await makeRequest(url, requestOptions, error);
};

export const getMostRecentGames = async (language) => {
    const url = `${API_BASE_URL}/game/topByDate/language/${language}`;
    const requestOptions = {
        headers: {
            "Content-type": "application/json",
        },
    };
    const error =
        "Fallo al obtener la información de los juegos más proximos recientes";

    return await makeRequest(url, requestOptions, error);
};




/*|||||||||||||||||||||||||||||||||||*/
/*---------------LISTS---------------*/
/*|||||||||||||||||||||||||||||||||||*/

export const getListByUser = async (idUser, token) => {
    const url = `${API_BASE_URL}/gameslist/user/${idUser}/lists`;
    const requestOptions = {
        headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + token,
        },
    };
    const error =
        "Se ha producido un error al hacer la petición de obtención de las listas del usuario";

    return await makeRequest(url, requestOptions, error);
};

export const getGamesFromListById = async (idUser, idList, token) => {
    const url = `${API_BASE_URL}/gameslist/userId/${idUser}/list/${idList}/games`;
    const requestOptions = {
        headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + token,
        },
    };
    const error = "No se ha podido obtener los juegos de la lista";

    return await makeRequest(url, requestOptions, error);
};

export const changeNameListById = async (idUser, idList, newName, token) => {
    const url = `${API_BASE_URL}/gameslist/userId/${idUser}/listId/${idList}`;

    const requestOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "text/plain",
            Authorization: "Bearer " + token,
        },
        body: newName,
    };
    const error = "No se ha podido cambiar el nombre de la lista";

    return await makeRequestText(url, requestOptions, error);
};

export const deleteListById = async (idUser, idList, token) => {
    const url = `${API_BASE_URL}/gameslist/userId/${idUser}/listId/${idList}`;
    const requestOptions = {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + token,
        },
    };
    const error = "No se ha podido eliminar la lista";

    return await makeRequestDelete(url, requestOptions, error);
};

export const createListbyUserId = async (idUser, nameList, token) => {
    const url = `${API_BASE_URL}/gameslist/user/${idUser}`;
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ name: nameList }),
    };
    const error = "No se pudo crear la lista nueva";

    return await makeRequest(url, requestOptions, error);
};

export const addGameToList = async (idUser, idList, idGame, token) => {
    const url = `${API_BASE_URL}/gameslist/list/${idList}/user/${idUser}/game/${idGame}`;
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: "Bearer " + token,
        },
    };
    const error = "No se pudo añadir el juego a la lista";

    return await makeRequest(url, requestOptions, error);
};

export const deleteGameFromList = async (idUser, idList, idGame, token) => {
    const url = `${API_BASE_URL}/gameslist/userId/${idUser}/listId/${idList}/game/${idGame}`;
    const requestOptions = {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + token,
        },
    };
    const error = "No se pudo eliminar el juego a la lista";

    await makeRequestDelete(url, requestOptions, error);
};

export const getListAndIfGameIsInList = async (idUser, idGame, token) => {
    const url = `${API_BASE_URL}/gameslist/user/${idUser}/game/${idGame}/lists`;
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    };
    const error = "No se pudo obtener las listas del juego";

    return await makeRequest(url, requestOptions, error);
};

/*|||||||||||||||||||||||||||||||||||*/
/*---------------GAMES---------------*/
/*|||||||||||||||||||||||||||||||||||*/

export const searchGameReduced = async (searchText, language) => {
    const url = `${API_BASE_URL}/game/search-five-suggestions/${searchText}/language/${language}`; 
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const error = "No se ha podido obtener los resultados de la búsqueda";

    return await makeRequest(url, requestOptions, error);
};

export const getGameData = async (idGame, language) => {
    const url = `${API_BASE_URL}/game/${idGame}/language/${language}`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        },
    };
    const error = "Fallo al obtener la información del juego";

    return await makeRequest(url, requestOptions, error);
};

export const getGeneralScoreGame = async (idGame) => {
    const url = `${API_BASE_URL}/game/average-score/${idGame}`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        },
    };
    const error = "Fallo al obtener la nota general del juego";

    return await makeRequest(url, requestOptions, error);
};

export const getRecentScoreGame = async (idGame) => {
    const url = `${API_BASE_URL}/game/average-score-last-100/id-game/${idGame}`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        },
    };
    const error = "Fallo al obtener la nota reciente del juego";

    return await makeRequest(url, requestOptions, error);
};

export const getIfGameIsFollowed = async (idUser, idGame, token) => {
    const url = `${API_BASE_URL}/follow-game/userId/${idUser}/game/${idGame}`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "plain/text",
            Authorization: "Bearer " + token,
        },
    };
    const error = "Fallo al obtener si el usuario sigue o no el juego";

    return await makeRequest(url, requestOptions, error);
};

export const setIfFollowOrIgnore = async (idUser, idGame, action, token) => {
    const url = `${API_BASE_URL}/follow-game/user/${idUser}/game/${idGame}/followOrIgnore/${action}`;
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-type": "plain/text",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al obtener al seguir o ignorar un juego";

    await makeRequest(url, requestOptions, error);
};

export const getUserScore = async (idUser, idGame, token) => {
    const url = `${API_BASE_URL}/game-score/user/${idUser}/game/${idGame}`;

    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al obtener la puntuación del usuario para el juego";

    return await makeRequest(url, requestOptions, error);
};

export const setUserScore = async (idUser, idGame, score, token) => {
    const url = `${API_BASE_URL}/game-score/user/${idUser}/game/${idGame}/score/${score}`;
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al establecer la nota del usuario al juego";

    await makeRequest(url, requestOptions, error);
};

export const getReviewsFromGame = async (idGame) => {
    const url = `${API_BASE_URL}/review/game/${idGame}`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        },
    };
    const error = "Fallo al obtener las criticas del juego";

    return await makeRequest(url, requestOptions, error);
};

export const getVotesByIdReview = async (idReview) => {
    const url = `${API_BASE_URL}/review/${idReview}/votes`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        },
    };
    const error = "Fallo al obtener los votos de una review";

    return await makeRequest(url, requestOptions, error);
};

export const deleteVoteFromGame = async (idUser, idGame, token) => {
    const url = `${API_BASE_URL}/game-score/user/${idUser}/game/${idGame}`;
    const requestOptions = {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al eliminar la nota del juego";

    await makeRequest(url, requestOptions, error);
};

export const uploadReview = async (idUser, idGame, reviewInfo, token) => {
    const url = `${API_BASE_URL}/review/gameId/${idGame}/userId/${idUser}`;

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reviewInfo),
    };
    const error = "Fallo al subir la crítica del juego";

    await makeRequest(url, requestOptions, error);
};

/*|||||||||||||||||||||||||||||||||||*/
/*---------------ADMIN---------------*/
/*|||||||||||||||||||||||||||||||||||*/

export const searchUserByUsername = async (username, token) => {
    const url = `${API_BASE_URL}/user/username/${username}`;

    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al buscar un usuario por nombre de usuario";

    return await makeRequest(url, requestOptions, error);
};

export const searchUserById = async (id, token) => {
    const url = `${API_BASE_URL}/user/${id}`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al buscar un usuario por id de usuario";

    return await makeRequest(url, requestOptions, error);
};

export const searchUserByEmail = async (email, token) => {
    const url = `${API_BASE_URL}/user/username/${email}`;

    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al buscar un usuario por email de usuario";

    return await makeRequest(url, requestOptions, error);
};

/*  export const searchGameByName = async (gameName, token) =>{
    const url = `${API_BASE_URL}/game/all/${email}`;

    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al buscar un juego por su nombre";

    return await makeRequest(url, requestOptions, error);
} */

export const getAllUsers = async (token, page = 0) =>{
    const url = `${API_BASE_URL}/user/admin/all?page=${page}`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al obtener todos los usuarios";

    return await makeRequest(url, requestOptions, error);
}

export const getUserInfo = async (idUser, token) =>{
    const url = `${API_BASE_URL}/user/mainInfo/${idUser}`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al obtener la información del usuario";

    return await makeRequest(url, requestOptions, error);
}

export const updateUserData = async (idUser, body, token) =>{
    const url = `${API_BASE_URL}/user/${idUser}`;
    const requestOptions = {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: body
    };
    const error = "Fallo al subir la información del usuario";

    return await makeRequest(url, requestOptions, error);
}

export const deleteUserData = async (idUser, token) =>{
    const url = `${API_BASE_URL}/user/${idUser}`;
    const requestOptions = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    
    };
    const error = "Fallo al borrar la información del usuario";

    await makeRequest(url, requestOptions, error);
}

export const searchGame = async (searchText, language) =>{
    const url = `${API_BASE_URL}/game/name/${searchText}/language/${language}`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",

        },
    
    };
    const error = "Fallo al obtener los resultados de la búsqueda";

    return await makeRequest(url, requestOptions, error);
}

//___________________________________________
//___________________________________________
//___________________________________________
//___________________________________________
//___________________________________________
//___________________________________________
//___________________________________________
//___________________________________________
//___________________________________________
//___________________________________________
//___________________________________________
//___________________________________________
//___________________________________________
//___________________________________________
export const getLastNews = async (language) => {
    const url = `${API_BASE_URL}/news/all/language/${language}`;
    const requestOptions = {
        headers: {
            "Content-type": "application/json",
        },
    };

    return await makeRequest(url, requestOptions);
};

export const getNewsFromFollowedGames = async (idUser, token, language) => {
    const url = `${API_BASE_URL}/news/user/${idUser}/language/${language}/followedGames`;
    const requestOptions = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,

        },
    };
    const error = "Fallo al obtener las noticias de los juegos seguidos";

    return await makeRequest(url, requestOptions, error);
};

export const getFollowedGames = async (idUser, token) => {
    const url = `${API_BASE_URL}/follow-game/userId/${idUser}/followedGames`;
    const requestOptions = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,

        },
    };
    const error = "Fallo al obtener los juegos seguidos";

    return await makeRequest(url, requestOptions, error);
};


export const getIgnoredGames = async (idUser, token) => {
    const url = `${API_BASE_URL}/follow-game/userId/${idUser}/ignoredGames`;
    const requestOptions = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,

        },
    };
    const error = "Fallo al obtener los juegos ignorados";

    return await makeRequest(url, requestOptions, error);
};

export const getPersonalizedNews = async (idUser, token, language) => {
    const url = `${API_BASE_URL}/news/user/${idUser}/language/${language}/exceptUnfollowedGames`;
    const requestOptions = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,

        },
    };

    return await makeRequest(url, requestOptions);
};

export const findNewsByName = async (name, token) => {
    const url = `${API_BASE_URL}/news/search-admin/${name}`;

    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al buscar la noticia";

    return await makeRequest(url, requestOptions, error);
};

export const getAllNewsAdmin = async (token) => {
    const url = `${API_BASE_URL}/news/getAllNews`;
    const requestOptions = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,

        },
    };

    return await makeRequest(url, requestOptions);
};




export const deleteNewsById = async (idNews, token) => {
    const url = `${API_BASE_URL}/news/${idNews}`;

    const requestOptions = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    
    };
    const error = "Fallo al eliminar la noticia";


    return await makeRequest(url, requestOptions, error);
};

export const getNewsById = async (idNews, token) => {
    const url = `${API_BASE_URL}/news/${idNews}`;

    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    
    };
    const error = "Fallo al obtener la informacion de la noticia";


    return await makeRequest(url, requestOptions, error);
};

export const editNewsInfo = async (idNews, token, body, language) => {
    const url = `${API_BASE_URL}/news/${idNews}?translationId=${language}`;

    const requestOptions = {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: body
    
    };
    const error = "Fallo al editar la informaction de la noticia";


    return await makeRequest(url, requestOptions, error);
};

export const addComment = async (idUser, token, body, idNews) => {

    const url = `${API_BASE_URL}/news-comment/newsId/${idNews}/userId/${idUser}`; 
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: body })
    
    };
    const error = "Fallo al publicar el comentario";


    return await makeRequest(url, requestOptions, error);
};

export const createNews = async (idUser, token, body, language) => {

    const url = `${API_BASE_URL}/news/author/${idUser}/language/${language}`; 
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: body
    
    };
    const error = "Fallo al publicar la noticia";


    return await makeRequest(url, requestOptions, error);
};

export const createGame = async (token, body, language) => {

    const url = `${API_BASE_URL}/game/language/${language}`;
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: body
    
    };
    const error = "Fallo al publicar el juego";


    return await makeRequest(url, requestOptions, error);
};

export const getNewsInfoPublic = async (idNews) => {

    const url = `${API_BASE_URL}/news/${idNews}`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        },
 
    
    };
    const error = "Fallo al obtener la información de la noticia";


    return await makeRequest(url, requestOptions, error);
};

export const getNewsComments = async (idNews) => {

    const url = `${API_BASE_URL}/news-comment/newsId/${idNews}`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        },
 
    
    };
    const error = "Fallo al obtener los comentarios de la noticia";


    return await makeRequest(url, requestOptions, error);
};



export const getUserInformation = async (id, token) => {
    const url = `${API_BASE_URL}/user/mainInfo/${id}`;
    const requestOptions = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al obtener la información del perfil del usuario";

    return await makeRequest(url, requestOptions, error);
};

const makeRequestDelete = async (url, options, errorMessage) => {
    try {
        const response = await fetch(url, options);
        return response;
    } catch (error) {
        throw new Error(`${errorMessage} - Código de error: ${error}`);
    }
};

const makeRequest = async (url, options, errorMessage) => {
    try {
        const response = await fetch(url, options);
        return await handleResponse(response);
    } catch (error) {
        throw new Error(`${errorMessage} - Código de error: ${error}`);
    }
};

const handleResponse = async (response) => {
    if (!response.ok) {
        throw new Error(response.status);
        
    } else {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        } else {
            return await response.text();
        }
    }
};
const makeRequestText = async (url, options, errorMessage) => {
    try {
        const response = await fetch(url, options);
        return await handleResponseText(response);
    } catch (error) {
        throw new Error(`${errorMessage} - Código de error: ${error}`);
    }
};

const handleResponseText = async (response) => {
    if (!response.ok) {
        throw new Error(response.status);
    }
};


/*|||||||||||||||||||||||||||||||||||*/
/*---------------PLATFORM---------------*/
/*|||||||||||||||||||||||||||||||||||*/


export const getPlatforms = async (token) => {
    const url = `${API_BASE_URL}/platform`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al obtener las plataformas";

    return await makeRequest(url, requestOptions, error);
};


export const editPlatformById = async (idPlatform, newName, token) => {
    const url = `${API_BASE_URL}/platform/${idPlatform}`;

    const requestOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "text/plain",
            Authorization: `Bearer ${token}`,
        },
        body: newName,
    };
    const error = "Fallo al editar la plataforma";

    return await makeRequestText(url, requestOptions, error);
};

export const getPlatformById = async (idPlatform, token) => {
    const url = `${API_BASE_URL}/platform/${idPlatform}`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al obtener la plataforma";

    return await makeRequest(url, requestOptions, error);
};

export const deletePlatformById = async (idPlatform, token) => {
    const url = `${API_BASE_URL}/platform/${idPlatform}`;
    const requestOptions = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al eliminar la plataforma";

    return await makeRequestDelete(url, requestOptions, error);
};



export const createPlatform = async (token, name) => {
    const url = `${API_BASE_URL}/platform`;

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: name }),
    };
    const error = "Fallo al crear la plataforma";

    return await makeRequest(url, requestOptions, error);
};


export const findPlatformByName = async (name, token) => {
    const url = `${API_BASE_URL}/platform/name/${name}`;

    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al buscar la plataforma";

    return await makeRequest(url, requestOptions, error);
};


/*|||||||||||||||||||||||||||||||||||*/
/*---------------GENRE---------------*/
/*|||||||||||||||||||||||||||||||||||*/

export const getGenres = async (token) => {
    const url = `${API_BASE_URL}/genre`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al obtener los géneros";

    return await makeRequest(url, requestOptions, error);
};

export const editGenreById = async (idGenre, newName, token) => {
    const url = `${API_BASE_URL}/genre/${idGenre}`;

    const requestOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "text/plain",
            Authorization: `Bearer ${token}`,
        },
        body: newName,
    };
    const error = "Fallo al editar el género";

    return await makeRequestText(url, requestOptions, error);
};

export const getGenreById = async (idGenre, token) => {
    const url = `${API_BASE_URL}/genre/${idGenre}`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al obtener el género";

    return await makeRequest(url, requestOptions, error);
};

export const deleteGenreById = async (idGenre, token) => {
    const url = `${API_BASE_URL}/genre/${idGenre}`;
    const requestOptions = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al eliminar el género";

    return await makeRequestDelete(url, requestOptions, error);
};

export const createGenre = async (token, name) => {
    const url = `${API_BASE_URL}/genre`;

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: name }),
    };
    const error = "Fallo al crear el género";

    return await makeRequest(url, requestOptions, error);
};

export const findGenreByName = async (name, token) => {
    const url = `${API_BASE_URL}/genre/name/${name}`;

    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al buscar el género";

    return await makeRequest(url, requestOptions, error);
};


/*|||||||||||||||||||||||||||||||||||*/
/*---------------LANGUAGE---------------*/
/*|||||||||||||||||||||||||||||||||||*/


export const getLanguages = async (token) => {
    const url = `${API_BASE_URL}/language`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al obtener los idiomas";

    return await makeRequest(url, requestOptions, error);
};

export const editLanguageById = async (idLanguage, newName, token) => {
    const url = `${API_BASE_URL}/language/${idLanguage}`;

    const requestOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "text/plain",
            Authorization: `Bearer ${token}`,
        },
        body: newName,
    };
    const error = "Fallo al editar el idioma";

    return await makeRequestText(url, requestOptions, error);
};

export const getLanguageById = async (idLanguage, token) => {
    const url = `${API_BASE_URL}/language/${idLanguage}`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al obtener el idioma";

    return await makeRequest(url, requestOptions, error);
};

export const deleteLanguageById = async (idLanguage, token) => {
    const url = `${API_BASE_URL}/language/${idLanguage}`;
    const requestOptions = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al eliminar el idioma";

    return await makeRequestDelete(url, requestOptions, error);
};

export const createLanguage = async (token, name) => {
    const url = `${API_BASE_URL}/language`;

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: name }),
    };
    const error = "Fallo al crear el idioma";

    return await makeRequest(url, requestOptions, error);
};

export const findLanguageByName = async (name, token) => {
    const url = `${API_BASE_URL}/language/name/${name}`;

    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al buscar el idioma";

    return await makeRequest(url, requestOptions, error);
};


/*|||||||||||||||||||||||||||||||||||*/
/*---------------DEVELOPER---------------*/
/*|||||||||||||||||||||||||||||||||||*/


export const getDevelopers = async (token) => {
    const url = `${API_BASE_URL}/developer`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al obtener los desarrolladores";

    return await makeRequest(url, requestOptions, error);
};

export const editDeveloperById = async (idDeveloper, newName, token) => {
    const url = `${API_BASE_URL}/developer/${idDeveloper}`;

    const requestOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "text/plain",
            Authorization: `Bearer ${token}`,
        },
        body: newName,
    };
    const error = "Fallo al editar el desarrollador";

    return await makeRequestText(url, requestOptions, error);
};

export const getDeveloperById = async (idDeveloper, token) => {
    const url = `${API_BASE_URL}/developer/${idDeveloper}`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al obtener el desarrollador";

    return await makeRequest(url, requestOptions, error);
};

export const deleteDeveloperById = async (idDeveloper, token) => {
    const url = `${API_BASE_URL}/developer/${idDeveloper}`;
    const requestOptions = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al eliminar el desarrollador";

    return await makeRequestDelete(url, requestOptions, error);
};

export const createDeveloper = async (token, name) => {
    const url = `${API_BASE_URL}/developer`;

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: name }),
    };
    const error = "Fallo al crear el desarrollador";

    return await makeRequest(url, requestOptions, error);
};

export const findDeveloperByName = async (name, token) => {
    const url = `${API_BASE_URL}/developer/name/${name}`;

    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al buscar el desarrollador";

    return await makeRequest(url, requestOptions, error);
};


/*|||||||||||||||||||||||||||||||||||*/
/*---------------DISTRIBUTOR---------------*/
/*|||||||||||||||||||||||||||||||||||*/

export const getDistributors = async (token) => {
    const url = `${API_BASE_URL}/distributor`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al obtener los distribuidores";

    return await makeRequest(url, requestOptions, error);
};

export const editDistributorById = async (idDistributor, newName, token) => {
    const url = `${API_BASE_URL}/distributor/${idDistributor}`;

    const requestOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "text/plain",
            Authorization: `Bearer ${token}`,
        },
        body: newName,
    };
    const error = "Fallo al editar el distribuidor";

    return await makeRequestText(url, requestOptions, error);
};

export const getDistributorById = async (idDistributor, token) => {
    const url = `${API_BASE_URL}/distributor/${idDistributor}`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al obtener el distribuidor";

    return await makeRequest(url, requestOptions, error);
};

export const deleteDistributorById = async (idDistributor, token) => {
    const url = `${API_BASE_URL}/distributor/${idDistributor}`;
    const requestOptions = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al eliminar el distribuidor";

    return await makeRequestDelete(url, requestOptions, error);
};

export const createDistributor = async (token, name) => {
    const url = `${API_BASE_URL}/distributor`;

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: name }),
    };
    const error = "Fallo al crear el distribuidor";

    return await makeRequest(url, requestOptions, error);
};

export const findDistributorByName = async (name, token) => {
    const url = `${API_BASE_URL}/distributor/name/${name}`;

    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al buscar el distribuidor";

    return await makeRequest(url, requestOptions, error);
};

/*|||||||||||||||||||||||||||||||||||*/
/*---------------FEATURE---------------*/
/*|||||||||||||||||||||||||||||||||||*/

export const getFeatures = async (token) => {
    const url = `${API_BASE_URL}/feature`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al obtener las features";

    return await makeRequest(url, requestOptions, error);
};

export const createFeature = async (token, body) => {
    const url = `${API_BASE_URL}/feature`;

    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: body,
    };
    const error = "Fallo al crear la feature";

    return await makeRequest(url, requestOptions, error);
};

export const deleteFeatureById = async (idFeature, token) => {
    const url = `${API_BASE_URL}/feature/${idFeature}`;
    const requestOptions = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al eliminar la feature";

    await makeRequestDelete(url, requestOptions, error);
};

export const findFeatureByName = async (name, token) => {
    const url = `${API_BASE_URL}/feature/name/${name}`;

    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al buscar la feature";

    return await makeRequest(url, requestOptions, error);
};

export const getFeatureById = async (idFeature, token) => {
    const url = `${API_BASE_URL}/feature/${idFeature}`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al obtener la feature";

    return await makeRequest(url, requestOptions, error);
};

/*|||||||||||||||||||||||||||||||||||*/
/*---------PRODUCT-PLATFORM----------*/
/*|||||||||||||||||||||||||||||||||||*/

export const getProductPlatform = async (token) => {
    const url = `${API_BASE_URL}/platform-product`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al obtener todas las plataformas del producto";

    return await makeRequest(url, requestOptions, error);
};

export const findProductPlatformByName = async (name, token) => {
    const url = `${API_BASE_URL}/platform-product/name/${name}`;

    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al buscar la plataforma del producto";

    return await makeRequest(url, requestOptions, error);
};

export const getProductPlatformById = async (idProductPlatform, token) => {
    const url = `${API_BASE_URL}/platform-product/${idProductPlatform}`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al obtener la plataforma del producto";

    return await makeRequest(url, requestOptions, error);
};

export const deleteProductPlatformById = async (idProductPlatform, token) => {
    const url = `${API_BASE_URL}/platform-product/${idProductPlatform}`;
    const requestOptions = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al eliminar la plataforma del producto";

    await makeRequestDelete(url, requestOptions, error);
};

export const createProductPlatform = async (token, body) => {
    const url = `${API_BASE_URL}/platform-product`;
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: body,
    };
    const error = "Fallo al crear la plataforma del producto";

    await makeRequest(url, requestOptions, error);
};

export const editProductPlatformById = async (idProductPlatform, body, token) => {
    const url = `${API_BASE_URL}/platform-product/${idProductPlatform}`;
    const requestOptions = {
        method: "PUT", 
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: body,
    };
    const error = "Fallo al editar la plataforma del producto";

    await makeRequest(url, requestOptions, error);
};


/*|||||||||||||||||||||||||||||||||||*/
/*---------VENDOR-PRODUCT----------*/
/*|||||||||||||||||||||||||||||||||||*/


export const getProductVendor = async (token) => {
    const url = `${API_BASE_URL}/vendor-product`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al obtener todos los vendedores del producto";

    return await makeRequest(url, requestOptions, error);
};

export const findProductVendorByName = async (name, token) => {
    const url = `${API_BASE_URL}/vendor-product/name/${name}`;

    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al buscar el vendedor del producto";

    return await makeRequest(url, requestOptions, error);
};

export const deleteProductVendorById = async (idProductVendor, token) => {
    const url = `${API_BASE_URL}/vendor-product/${idProductVendor}`;
    const requestOptions = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al eliminar el vendedor del producto";

    await makeRequestDelete(url, requestOptions, error);
};

export const createProductVendor = async (token, body) => {
    const url = `${API_BASE_URL}/vendor-product`;
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: body,
    };
    const error = "Fallo al crear el vendedor del producto";

    await makeRequest(url, requestOptions, error);
};

export const editProductVendorById = async (idProductVendor, body, token) => {
    const url = `${API_BASE_URL}/vendor-product/${idProductVendor}`;
    const requestOptions = {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: body,
    };
    const error = "Fallo al editar el vendedor del producto";

    await makeRequest(url, requestOptions, error);
};

export const getProductVendorById = async (idProductVendor, token) => {
    const url = `${API_BASE_URL}/vendor-product/${idProductVendor}`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al obtener el vendedor del producto";

    return await makeRequest(url, requestOptions, error);
};


/*|||||||||||||||||||||||||||||||||||*/
/*------------KEY-PRODUCT-----------*/
/*|||||||||||||||||||||||||||||||||||*/

export const findProductKeyByName = async (name, token) => {
    const url = `${API_BASE_URL}/keys-product/name/${name}`;

    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al buscar la key del producto";

    return await makeRequest(url, requestOptions, error);
};

export const getProductKey = async (token) => {
    const url = `${API_BASE_URL}/keys-product`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al obtener todos las key del producto";

    return await makeRequest(url, requestOptions, error);
};

export const deleteProductkeyById = async (idProductKey, token) => {
    const url = `${API_BASE_URL}/keys-product/${idProductKey}`;
    const requestOptions = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al eliminar la key del producto";

    await makeRequestDelete(url, requestOptions, error);
};


export const createKey = async (token, name) => {
    const url = `${API_BASE_URL}/keys-product`;

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: name }),
    };
    const error = "Fallo al crear la key";

    return await makeRequest(url, requestOptions, error);
};

export const getProductKeyById = async (idProductKey, token) => {
    const url = `${API_BASE_URL}/keys-product/${idProductKey}`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al obtener la key del producto";

    return await makeRequest(url, requestOptions, error);
};

export const editProductKeyById = async (idProductKey, body, token) => {
    const url = `${API_BASE_URL}/keys-product/${idProductKey}`;
    const requestOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "text/plain",
            Authorization: `Bearer ${token}`,
        },
        body: body,
    };
    const error = "Fallo al editar la key del producto";

    await makeRequest(url, requestOptions, error);
};

/*|||||||||||||||||||||||||||||||||||*/
/*-----------REGION-PRODUCT----------*/
/*|||||||||||||||||||||||||||||||||||*/

export const findProductRegionByName = async (name, token) => {
    const url = `${API_BASE_URL}/region-product/name/${name}`;

    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al buscar la region del producto";

    return await makeRequest(url, requestOptions, error);
};

export const getProductRegion = async (token) => {
    const url = `${API_BASE_URL}/region-product`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al obtener todos las regiones del producto";

    return await makeRequest(url, requestOptions, error);
};

export const deleteProductRegionById = async (idProductRegion, token) => {
    const url = `${API_BASE_URL}/region-product/${idProductRegion}`;
    const requestOptions = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al eliminar la región del producto";

    await makeRequestDelete(url, requestOptions, error);
};


export const createRegion = async (token, name) => {
    const url = `${API_BASE_URL}/region-product`;

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: name }),
    };
    const error = "Fallo al crear la región";

    return await makeRequest(url, requestOptions, error);
};

export const getProductRegionById = async (idProductRegion, token) => {
    const url = `${API_BASE_URL}/region-product/${idProductRegion}`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al obtener la región del producto";

    return await makeRequest(url, requestOptions, error);
};

export const editProductRegionById = async (idProductRegion, body, token) => {
    const url = `${API_BASE_URL}/region-product/${idProductRegion}`;
    const requestOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "text/plain",
            Authorization: `Bearer ${token}`,
        },
        body: body,
    };
    const error = "Fallo al editar la región del producto";

    await makeRequest(url, requestOptions, error);
};


/*|||||||||||||||||||||||||||||||||||*/
/*-----------EDITION-PRODUCT----------*/
/*|||||||||||||||||||||||||||||||||||*/

export const findProductEditionByName = async (name, token) => {
    const url = `${API_BASE_URL}/edition-product/name/${name}`;

    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al buscar la edición del producto";

    return await makeRequest(url, requestOptions, error);
};

export const getProductEdition = async (token) => {
    const url = `${API_BASE_URL}/edition-product`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al obtener todos las ediciones del producto";

    return await makeRequest(url, requestOptions, error);
};

export const deleteProductEditionById = async (idEditionRegion, token) => {
    const url = `${API_BASE_URL}/edition-product/${idEditionRegion}`;
    const requestOptions = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al eliminar la edición del producto";

    await makeRequestDelete(url, requestOptions, error);
};


export const createEdition = async (token, name) => {
    const url = `${API_BASE_URL}/edition-product`;

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: name }),
    };
    const error = "Fallo al crear la edición";

    return await makeRequest(url, requestOptions, error);
};

export const getProductEditionById = async (idProductEdition, token) => {
    const url = `${API_BASE_URL}/edition-product/${idProductEdition}`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al obtener la edición del producto";

    return await makeRequest(url, requestOptions, error);
};

export const editProductEditionById = async (idProductEdition, body, token) => {
    const url = `${API_BASE_URL}/edition-product/${idProductEdition}`;
    const requestOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "text/plain",
            Authorization: `Bearer ${token}`,
        },
        body: body,
    };
    const error = "Fallo al editar la edición del producto";

    await makeRequest(url, requestOptions, error);
};


/*|||||||||||||||||||||||||||||||||||*/
/*----------------DLC---------------*/
/*|||||||||||||||||||||||||||||||||||*/

export const findDLCByName = async (name, token) => {
    const url = `${API_BASE_URL}/dlc/name/${name}`;

    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al buscar el DLC";

    return await makeRequest(url, requestOptions, error);
};

export const createDlc = async (token, body) => {
    const url = `${API_BASE_URL}/dlc`;
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: body,
    };
    const error = "Fallo al crear el Dlc";

    await makeRequest(url, requestOptions, error);
};


export const getDlc = async (token) => {
    const url = `${API_BASE_URL}/dlc`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al obtener todos los Dlcs";

    return await makeRequest(url, requestOptions, error);
};

export const deleteDlcById = async (idDlc, token) => {
    const url = `${API_BASE_URL}/dlc/${idDlc}`;
    const requestOptions = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al eliminar el dlc";

    await makeRequestDelete(url, requestOptions, error);
};


export const getDlcById = async (idDlc, token) => {
    const url = `${API_BASE_URL}/dlc/${idDlc}`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al obtener la información del Dlc";

    return await makeRequest(url, requestOptions, error);
};

export const editDlcById = async (idDlc, body, token) => {
    const url = `${API_BASE_URL}/dlc/${idDlc}`;
    const requestOptions = {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: body,
    };
    const error = "Fallo al editar el dlc";

    await makeRequest(url, requestOptions, error);
};


/*|||||||||||||||||||||||||||||||||||*/
/*---------------GAME---------------*/
/*|||||||||||||||||||||||||||||||||||*/

export const getGames = async (token) => {
    const url = `${API_BASE_URL}/game/all`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al obtener todos los juegos";

    return await makeRequest(url, requestOptions, error);
};

export const findGameByName = async (name, token) => {
    const url = `${API_BASE_URL}/game/search/${name}`;

    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al buscar el juego";

    return await makeRequest(url, requestOptions, error);
};

export const deletGameById = async (idGame, token) => {
    const url = `${API_BASE_URL}/game/${idGame}`;
    const requestOptions = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al eliminar el juego";

    await makeRequestDelete(url, requestOptions, error);
};

export const getGameById = async (idGame, token, language) => {
    const url = `${API_BASE_URL}/game/${idGame}/language/${language}`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al obtener la información del juego";

    return await makeRequest(url, requestOptions, error);
};

export const editGameById = async (idGame, body, token) => {
    const url = `${API_BASE_URL}/game/${idGame}/language/2`;
    const requestOptions = {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: body,
    };
    const error = "Fallo al editar el juego";

    await makeRequest(url, requestOptions, error);
};


/*|||||||||||||||||||||||||||||||||||*/
/*----------FOLLOWING-GAME----------*/
/*|||||||||||||||||||||||||||||||||||*/


export const getAllPopularGames = async (language) => {
    const url = `${API_BASE_URL}/game/popular/language/${language}`; 

    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const error = "Fallo al obtener los próximos juegos populares";

    return await makeRequest(url, requestOptions, error);
};

export const getAllRecentGames = async (language) => {
    const url = `${API_BASE_URL}/game/topByDateAll/language/${language}`;

    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const error = "Fallo al obtener los próximos juegos populares";

    return await makeRequest(url, requestOptions, error);
};


/*|||||||||||||||||||||||||||||||||||*/
/*---------NUMBER-OF-PLAYERS--------*/
/*|||||||||||||||||||||||||||||||||||*/

export const getNumberPlayers = async (token) => {
    const url = `${API_BASE_URL}/number-player`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al obtener el número de jugadores";

    return await makeRequest(url, requestOptions, error);
};

export const createNumberPlayers = async (token, name) => {
    const url = `${API_BASE_URL}/number-player`;

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ numberPlayers: name }),
    };
    const error = "Fallo al crear el número de jugadores";

    return await makeRequest(url, requestOptions, error);
};

export const deleteNumberPlayersById = async (idNumberPlayers, token) => {
    const url = `${API_BASE_URL}/number-player/${idNumberPlayers}`;
    const requestOptions = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al eliminar el número de jugadores";

    await makeRequestDelete(url, requestOptions, error);
};

export const findNumberPlayersByName = async (name, token) => {
    const url = `${API_BASE_URL}/number-player/number-player/${name}`;

    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al buscar el número de jugadores";

    return await makeRequest(url, requestOptions, error);
};

export const getNumberPlayersById = async (idNumberPlayers, token) => {
    const url = `${API_BASE_URL}/number-player/${idNumberPlayers}`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al obtener el número de jugadores";

    return await makeRequest(url, requestOptions, error);
};

export const editNumberPlayersById = async (id, body, token) => {
    const url = `${API_BASE_URL}/number-player/${id}`;
    const requestOptions = {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
    };
    const error = "Fallo al editar el número de jugadores";

    await makeRequest(url, requestOptions, error);
};



/*|||||||||||||||||||||||||||||||||||*/
/*------------REVIEW-VOTE-----------*/
/*|||||||||||||||||||||||||||||||||||*/

export const getReviewVotes = async (userId, gameId, token) => {
    const url = `${API_BASE_URL}/review-vote/user-vote/user/${userId}/game/${gameId}`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al obtener los votos del usuario";

    return await makeRequest(url, requestOptions, error);
};
export const getUserReviews = async (userId, token) => {
    const url = `${API_BASE_URL}/review/user/${userId}`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al obtener las reviews del usuario";

    return await makeRequest(url, requestOptions, error);
};




export const setReviewVote = async (userId, reviewId, token, vote) => {
    const url = `${API_BASE_URL}/review-vote/user/${userId}/review/${reviewId}/vote/${vote}`;

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ numberPlayers: name }),
    };
    const error = "Fallo al puntuar la crítica";

    return await makeRequest(url, requestOptions, error);
};


export const removeVoteReview = async (userId, reviewId, token) => {
    const url = `${API_BASE_URL}/review-vote/user/${userId}/review/${reviewId}`;
    const requestOptions = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al eliminar el voto de la review";

    await makeRequestDelete(url, requestOptions, error);
};

export const getUserScores = async (userId, token) => {
    const url = `${API_BASE_URL}/game-score/user/${userId}/games-scores`;

    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const error = "Fallo al obtener las votaciones del usuario";

    return await makeRequest(url, requestOptions, error);
};
