const { Videogame, Genre, VideoGenre } = require('../db');
const axios = require('axios');
const {Op} = require('sequelize');
const {BASE_URL, API_KEY} = process.env


const getVideogames = async (req, res) => {
    const game = req.query.game;
    if (game) {
        try {
            game.toLowerCase()
            console.log(game)
            let videogames = await Videogame.findAll({
                where: {
                    name: {
                        [Op.like]: '%'+game+'%'.toLocaleLowerCase()
                    }
                },
                include: {
                    model: Genre,
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'api']
                },
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
                include: {
                    model: Genre,
                },
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
    const dbGame = await Videogame.findOne({
        where: {
            id: id
        },
        include: {
            model: Genre,
        },
    })
    if (dbGame.mine) {
        res.send(dbGame)
    } else {
        const api = dbGame.api
        const apiGame = await axios.get(`${BASE_URL}/${api}${API_KEY}`)
        apiGame.data.id = id
        res.send(apiGame.data)
    }
}

const getGenres = async (req, res) => {
    try{
        const genres = await Genre.findAll()
        res.send(genres)
    } catch (error) {
        console.log(error)
}
}

const postVideogame = async (req, res) => {
    console.log("BODY EN BACK", req.body);
    const { name, rating, platforms, description, image, genres, release_date } = req.body;
    try{
        console.log(release_date)
        let dbGame = await Videogame.create({
                name: name,
                description: description,
                image: image,
                rating: rating,
                platforms: platforms,
                release_date: release_date,
                mine: true,
        })
        await dbGame.setGenres(genres)
        return res.json(dbGame)
    } catch (error){
        console.log(error)
    }
}

module.exports = {
    getVideogames,
    getById,
    postVideogame,
    getGenres
}