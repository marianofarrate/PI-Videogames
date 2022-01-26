import axios from 'axios';

export function getVideogames() {
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/videogames", {
            });
            return dispatch({
                type: 'GET_VIDEOGAMES',
                payload: json.data
            });
        } catch (error) {
            console.log(error);
        }

    }
}
export function getNameVideogames(name) {
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/videogames?name=" + name);
            return dispatch({
                type: 'GET_NAME_VIDEOGAMES',
                payload: json.data
            })
        } catch (error) {
            alert("Sorry, this videogame does not exist, please check the name again");
        }
    }
}



export function getGenres() {
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/genres", {
            });
            return dispatch({
                type: "GET_GENRES",
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function getDetails(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/videogame/" + id)
            return dispatch({
                type: "GET_DETAILS",
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function postVideogame(payload) {
    return async function (dispatch) {
        const data = await axios.post("http://localhost:3001/videogame", payload);
        return data;
    }
}


export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function sortGamesByRating(rating) {
    return {
        type: 'SORT_BY_RATING',
        rating
    }
}
export function filterGamesByRating(payload) {
    return {
        type: 'FILTER_BY_RATING',
        payload
    }
}

export function filterCreatedGames(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

export function filterGamesByGenre(payload) {
    return {
        type: 'FILTER_BY_GENRE',
        payload
    }
}

export function resetDetail(payload){
    return {
        type: 'RESET_DETAIL',
        // payload
    }
}