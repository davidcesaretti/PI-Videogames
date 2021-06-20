const { Videogame, Genre, VideoGenre } = require('../db');
const axios = require('axios');
const {BASE_URL, GENRES_URL, API_KEY} = process.env

const getVideogames = async () => {
    let apiArray = []
    let url = `${BASE_URL}${API_KEY}`
    try{
        for (let i = 0; i < 5; i++){
            let apiVideogames = await axios.get(url);
            apiArray = apiArray.concat(apiVideogames.data.results)
            url = apiVideogames.data.next
        }
    for (let i = 0; i < apiArray.length; i++){
        await Videogame.findOrCreate({
            where: {
                name: apiArray[i].name,
                api: apiArray[i].id,
                genre: apiArray[i].genres.map((e) => {return e.name}),
                image: apiArray[i].background_image,
                release_date: apiArray[i].released,
                rating: apiArray[i].rating,
                platforms: apiArray[i].platforms.map((e) => {return e.platform.name})
            }
        })
    }
    console.log('Games loaded')
} catch (error) {
            console.log(error + ' asd')
        }
}

const getGenre = async () => {
    try{
        const apiGenres =  await axios.get(`${GENRES_URL}${API_KEY}`)
        for (let i = 0; i < apiGenres.data.results.length; i++){
            await Genre.findOrCreate({
                where: {
                    name: apiGenres.data.results[i].name,
                }
            })
        }
        console.log('Genres loaded')
    } catch (error) {
        console.log(error)
    }
}

    module.exports = {
        getVideogames,
        getGenre,
    }