const { Router } = require('express');
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
require('dotenv').config();
const { API_KEY } = process.env;
const { Videogame, Genre } = require('../db')

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//para mis 120 jueguitos
const getInfoApi = async () => {
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
            platforms: v.platforms === null ? 'No se encuentran plataformas disponibles para este juego' : v.platforms.map(v => v.platform.name),
            genres: v.genres.map(v => v.name),
            img: v.background_image

        };
    });
    return apiInfo;
};

const getName = async (name) => {
    try {
        const apiReq = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
        const apiInfo = await apiReq.data.results.map(v => {

            return {
                id: v.id,
                name: v.name,
                released: v.released,
                rating: v.rating,
                platforms: v.platforms === null ? 'There are no platforms available for this game' : v.platforms.map(v => v.platform.name),
                genres: v.genres.map(v => v.name),
                img: v.background_image,
                

            };
        });
        return apiInfo.slice(0, 16);
    } catch (error) {
        return 'No results'
    }

};


const getDbInfo = async () => {
    return await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ['name'], 
            through: {
                attributes: []
            }
        }
    })
};

const getAllGames = async () => {
    const apiInfo = await getInfoApi();
    const dbInfo = await getDbInfo();
    const auxArr = await dbInfo.map(el => {
        return {
            id: el.dataValues.id,
            name: el.dataValues.name,
            description: el.dataValues.description,
            released: el.dataValues.released,
            img: el.dataValues.image,
            rating: el.dataValues.rating,
            genres: el.dataValues.genres?.map(el => el.name),
            platforms: el.dataValues.platforms,
            createdInDb: el.dataValues.createdInDb
        }
    })
    const allInfo = apiInfo.concat(auxArr);
    return allInfo;
};

const getNamedGames = async (name) => {
    const apiSearch = await getName(name);
    const dbInfo = await getDbInfo();
    const auxArr = await dbInfo.map(el => {
        return {
            id: el.dataValues.id,
            name: el.dataValues.name,
            description: el.dataValues.description,
            released: el.dataValues.released,
            img: el.dataValues.image,
            rating: el.dataValues.rating,
            genres: el.dataValues.genres?.map(el => el.name),
            platforms: el.dataValues.platforms,
            createdInDb: el.dataValues.createdInDb
        }
    })
    const allInfo = apiSearch.concat(auxArr);
    return allInfo;
}



//es para el Id
const getId = async (id) => {
    try {
        const apiUrl = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);

    const apiInfo = [{
        id: apiUrl.data.id,
        name: apiUrl.data.name,
        released: apiUrl.data.released,
        description: apiUrl.data.description,
        rating: apiUrl.data.rating,
        img: apiUrl.data.background_image,
        platforms: apiUrl.data.platforms.length === 0 ? 'There are no platforms available for this game' : apiUrl.data.platforms.map(p => p.platform.name),
        genres: apiUrl.data.genres.map(v => v.name)

    }]
    return apiInfo;
    } catch (error) {
        return []
    }

}
const getGameById = async (id) => {

    const apiSearch = await getId(id);

    const dbInfo = await getDbInfo();

    const auxArr = await dbInfo.map(el => {
        return {
            id: el.dataValues.id,
            name: el.dataValues.name,
            description: el.dataValues.description,
            released: el.dataValues.released,
            img: el.dataValues.image,
            rating: el.dataValues.rating,
            genres: el.dataValues.genres?.map(el => el.name),
            platforms: el.dataValues.platforms,
            createdInDb: el.dataValues.createdInDb
        }
    })
    const allInfo = apiSearch.concat(auxArr);
    // console.log(allInfo);
    return allInfo;
}


router.get('/videogames', async (req, res) => {
    try {
        const { name } = req.query;
        let allGames = await getAllGames();
        let gameByName = await getNamedGames(name);
        if (name) {

            let gameName = await gameByName.filter(v => v.name.toLowerCase().includes(name.toLowerCase()))
            if (gameName.length >= 1) return res.status(200).send(gameName);
            res.status(404).send('The videogame does not exist, please check the name entered');
        } else {
              //en el caso que no haya un req.query
            return res.status(200).send(allGames);
        }
    } catch (error) {
        return res.status(404).send('The videogame does not exist, please check the name entered');
    }
})

router.get('/videogame/:id', async (req, res) => {

    try {
        const id = req.params.id;
        // console.log(id);
        const gameId = await getGameById(id);
        // console.log('gameidddd',gameId);
        let gameById =  gameId.filter(v => v.id == id)
        if (gameById.length > 0) return res.status(200).send(gameById);
        res.status(404).send('The videogame has not been found');
    } catch (error) {
        res.status(404).send('The videogame has not been found');
    }


})

router.get('/genres', async (req, res) => {
    const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    const genres = await genresApi.data.results.map(g => { return [g.name] });
    const eachGenre = genres.map(g => {

        for (let i = 0; i < genres.length; i++)  return g[i];

    });
     //console.log(eachGenre);
    eachGenre.forEach(videogame => {
         //console.log(eachGenre, ' eachgenre');
        Genre.findOrCreate({
            where: { name: videogame }
        })
    })

    const allGenres = await Genre.findAll();
    res.send(allGenres);

})

router.post('/videogame', async (req, res) => {
    let {
        name,
        description,
        released,
        rating,
        platforms,
        image,
        createdInDb,
        genres

    } = req.body;

    let createdVGame = await Videogame.create({
        name,
        description,
        released,
        rating,
        image,
        platforms,
        createdInDb
    });



    let genreDb = await Genre.findAll({ where: { name: genres } }); 
    createdVGame.addGenre(genreDb);
   res.status(200).send('Videogame created successfully!');
})



module.exports = router, getInfoApi;