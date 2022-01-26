require ('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');

const getInfoApi = async () => {
    try {
    const apiUrl1 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=40`);
    const apiUrl2 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2&page_size=40`);
    const apiUrl3 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3&page_size=40`);
    const ultraApi = apiUrl1.data.results.concat(apiUrl2.data.results, apiUrl3.data.results);

    const apiInfo = ultraApi.map(v => {

        return {
            id: v.id,
            name: v.name,
            released: v.released,
            rating: v.rating,
            platform: v.platforms === null ? 'No hay plataformas disponibles para este videojuego' : v.platforms.map(v => v.platform.name),
            genres: v.genres.map(v => v.name),
            img: v.background_image

        };
    });
    return apiInfo;
    } catch (error) {
        next(error);
    }
    
};

module.exports = getInfoApi;