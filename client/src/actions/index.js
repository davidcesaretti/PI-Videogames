import axios from 'axios';
export const GET_VIDEOGAMES = 'GET_VIDEOGAMES'
export const GET_DETAIL = 'GET_DETAIL'
export const CREATE_VIDEOGAME = 'CREATE_VIDEOGAME'
export const GET_GENRES = 'GET_GENRES'

export function getVideogames (orderBy, order, name, filter) {
    return async function (dispatch) {
        try {
        if (orderBy === 'default') orderBy = 'id'
        if (name) {
            const gamesNamed = await axios.get(`http://localhost:3001/videogames?game=${name}&orderBy=${orderBy}&order=${order}`)
            console.log(gamesNamed.data)
            /* if (filter !== 'default'){
                const filtrados = gamesNamed.data.filter((e) => {
                    e === 
                })
            } */
            dispatch ({
                type: GET_VIDEOGAMES,
                payload: gamesNamed.data
            })
        } else {
            const games = await axios.get(`http://localhost:3001/videogames?orderBy=${orderBy}&order=${order}`)
            console.log('hola')
            dispatch ({
                type: GET_VIDEOGAMES,
                payload: games.data
            })
        }
    } catch (error) {
        console.log(error)
    }
    }
}

export function getGenres() {
    return async function(dispatch) {
        try {
            const genres = await axios.get(`http://localhost:3001/genres`)
            dispatch({
                type: GET_GENRES,
                payload: genres.data
            })
        } catch(error) {
            console.log(error)
        }
    }
}

export function getDetail (id) {
    return async function (dispatch) {
        try {
            const gameDetail = await axios.get(`http://localhost:3001/videogames/${id}`)
            console.log(gameDetail.data.name + ' asdas')
            dispatch({
                type: GET_DETAIL,
                payload: gameDetail.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function createGame (game) {
        return async function () {
        try{
            await axios.post("http://localhost:3001/videogames/post", game)
        } catch (error) {
            console.log(error)
        }
    }
}
