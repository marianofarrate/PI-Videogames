const initialState = {
    videogames: [],
    intocado: [],
    filteredGenres: [],
    allVideogames: [],
    ratingVideogames: [],
    genres: [],
    detail: [],
    

}


function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_VIDEOGAMES': 
        return {
            ...state,
            videogames: action.payload,
            intocado: action.payload,
            allVideogames: action.payload,
            ratingVideogames: action.payload,
            filteredGenres: action.payload,

        }

        case 'GET_NAME_VIDEOGAMES': 
        return{
            ...state,
            videogames: action.payload,
            allVideogames: action.payload,
            intocado: action.payload,
        }
        case 'GET_DETAILS': 
        return{
            ...state,
            detail: action.payload,
            
        }

        //------------------------------------------FIN DEL GET_VIDEOGAMES---------------------------------------------------------//
        case 'POST_VIDEOGAME': return{
            ...state,
            
        }
        case 'GET_GENRES': return{
            ...state,
            genres: action.payload,
        }
        case 'SORT_BY_RATING':
            
            const ratingSorted = action.rating === 'btw' ?
            state.videogames.sort(function (a, b) {
                if (a.rating > b.rating) {
                    return -1;
                }
                if (a.rating < b.rating) {
                    return 1;
                }
                return 0;
            }) : state.videogames.sort(function (a, b) {
                if (a.rating > b.rating) {
                    return 1;
                }
                if (a.rating < b.rating) {
                    return -1;
                }
                return 0;
            }) 
            return {
                ...state,
                videogames: ratingSorted
            }
        case 'FILTER_BY_RATING':
            const ratingFiltered = state.ratingVideogames?.filter(vg => Math.floor(vg.rating) === parseInt(action.payload, 10))
            return {
                ...state,
                videogames: action.payload === 'all' ? state.ratingVideogames : ratingFiltered
            }
        //------------------------------------------FIN DEL FILTER_BY_RATING---------------------------------------------------------//


        case 'FILTER_CREATED':
            const fija = state.intocado;
            const createdFilter = action.payload === 'created' ? fija.filter(vg => vg.createdInDb) : fija.filter(vg => !vg.createdInDb)
            return {
                ...state,
                videogames: action.payload === 'All' ? state.allVideogames : createdFilter
            }
        //------------------------------------------FIN DEL FILTER_CREATED---------------------------------------------------------//
        

        case 'ORDER_BY_NAME':
            const sortedArray = action.payload === 'asc' ?
                state.videogames.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                }) :
                state.videogames.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                videogames: sortedArray
            }
        //------------------------------------------FIN DEL ORDER_BY_NAME---------------------------------------------------------//

        case 'FILTER_BY_GENRE':
            const fija2 = state.filteredGenres
            const filterVideogames =  fija2.filter(vg => vg.genres.includes(action.payload));
            return {
                ...state,
                videogames: action.payload === 'All' ? state.filteredGenres : filterVideogames 
            }

        case 'RESET_DETAIL': 
        return{
            ...state,
            detail: []
        }

        default: return state;
    }
}

export default rootReducer;