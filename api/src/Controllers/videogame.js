const { Videogame, Genre, VideoGenre } = require('../db');
const axios = require('axios');
const {Op} = require('sequelize');
const db = require('../db');
const {BASE_URL, API_KEY} = process.env

/* const request = async () => {
    const api = await axios.get(`${BASE_URL}${API_KEY}`);
    return api.data
} */

const getVideogames = async (req, res) => {
    const game = req.query.game;
    if (game) {
        try {
            game.toLowerCase()
            console.log(game)
            let videogames = await Videogame.findAll({
                where: {
                    name: {
                        [Op.like]: '%'+game+'%'
                    }
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'api']
                },
                limit: 15,
                offset: req.query.page,
                order: [[req.query.orderBy, req.query.order]]
            })
            return res.send(videogames)
        } catch (error) {
            console.log(error)
        }
    } else {
        try{
            let videogames = await Videogame.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'api']
                },
                limit: 15,
                offset: req.query.page,
                order: [[req.query.orderBy, req.query.order]]
            })
            return res.send(videogames)
        } catch (error) {
            console.log(error)
        }
    }
}

const getById = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    const dbGame = await Videogame.findByPk(id)
    if (dbGame.mine) {
        res.send(dbGame) 
    } else {
        const api = dbGame.api
        const apiGame = await axios.get(`${BASE_URL}/${api}${API_KEY}`)
        apiGame.data.id = id
        res.send(apiGame.data)
    }
}

const postVideogame = async (req, res) => {
    const { name, rating, platforms, image } = req.body;
    console.log(req.body)
    try{
        let dbGame = await Videogame.findOrCreate({
            where: {
                name: name,
                image: image,
                rating: rating,
                platforms: platforms, 
                mine: true,
            }
        })
        /* await dbGame.setGenres(genreId) */
        return res.json(dbGame)
    } catch (error){
        console.log(error)
    }
}

module.exports = {
    getVideogames,
    getById,
    postVideogame
}